// commonjs mode, you can also use `import` for module mode
const { Client } = require('@notionhq/client');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv')

if (!process.env.GITHUB_ACTIONS) {
  dotEnv.config();
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const CONFIG ={
  days: 7,
  dir:'./posts',
  filename:'每周见闻'
}

const curTime = moment(Date.now());
const today = curTime.format('YYYY-MM-DD');
const startDay = moment(curTime).subtract(CONFIG.days, 'days').format('YYYY-MM-DD')
function formatStr(str) {
  if (!!str && str.trim()) {
    str = str.replace(/[&<>'"]/g, '')
    const url = str.replace(
      /([^\n\r\t\s]*?)((http|https):\/\/[\w\-]+\.[\w\-]+(\/[\w\-]+)*\b([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\\+#])?)/g,
      function(a, b, c) {
        return (b +'<' +c +'>')
      }
    )
    return url
  }
  return str
}

async function main() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'date',
            date: {
              on_or_after: startDay
            }
          },
          {
            property: 'date',
            date: {
              before: today
            }
          }
        ],
        sorts: [
          {
            property: "date",
            direction: "ascending"
          }
        ],
      }
    });

    if(!response.results.length){
      console.log('no data')
      return
    }

    let mid = (`${startDay}_${today}`).replace(/-/g,'')
    let mdHead = `---\ndate: ${today.replace(/-/g,'/')}\ntoc: true\n---\n\n`
    let mdContent = ''
    let secData = {}
    let mdImg = ''
    function setMdImg(img,txt){
      let desc = txt ? `<small>${txt}</small>\n\n` : ''
      return `<img src="${img}" width="800" />\n\n${desc}`
    }

    let index = 0;
    for (const page of response.results) {

      const cover = page.cover?.external?.url || page.cover?.file.url

      const props = page.properties
      const title = props.title?.title[0].plain_text
      const content = props.desc?.rich_text[0]?.plain_text || ''
      const img = props.img?.files[0]?.file?.url || props.img?.files[0]?.external?.url || ''
      const imgDesc = props.imgDesc?.rich_text[0]?.plain_text || ''

      // const _content = content?.replace(/\s+/g, '').replace(/\n/g, '');
      const _content = content
      const targetStr = formatStr(_content)
      const tag = (props.tags.multi_select && props.tags.multi_select[0]?.name) || props.tags.select?.name // support multi-select and single select
      const oneImg = cover ? `![](${cover})`:''

      if (tag) {
        if (!secData[tag]) {
          secData[tag] = []
          secData[tag].index = 0
        }
        let idx = secData[tag].index++ // hack
        const oneMsg =`**${idx+1}、${title.trim()}**\n\n${targetStr}\n\n${oneImg}\n\n`
        secData[tag].push(oneMsg)
      }

      if (img) {
        mdImg = setMdImg(img,imgDesc)
      }

      index+=1;
    }

    Object.keys(secData).map(key=>{
      mdContent+=`## ${key}\n${secData[key].join('')}`
    })

    const existingFiles = fs.readdirSync(CONFIG.dir).filter(file => !file.startsWith('.')) // ignore hidden files
    const existingFile = existingFiles.find(file => file.includes(mid));

    let filePath = ''
    if (existingFile) {
      filePath = path.join(CONFIG.dir, existingFile);
    } else {
      const fileCount = existingFiles.length + 1;
      const fileName = `${(fileCount < 10 ? '0' + fileCount : fileCount) + '-' + (CONFIG.filename || today)}-${mid}.md`;
      filePath = path.join(CONFIG.dir, fileName);
    }

    const fileContent = `${mdHead + mdImg + mdContent}`;
    fs.writeFileSync(filePath, fileContent);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main()