# notion2md

notion2md is a github action workflow to conver Notion Database to Markdown file automatically. feel free to use it on your blog or anywhere you want.

## Preparation
### create a notion database
you can simply use this [demo db](https://thinkrchan.notion.site/10ae95237d4b8023add0d42c858d464f?v=fffe95237d4b8162bc57000ce467f9df) as a template

### get notion token and database id
- go to https://www.notion.so/profile/integrations to get notion token
- db id like : 【10ae95237d4b8023add0d42c858d464f】 in [demo db](https://thinkrchan.notion.site/10ae95237d4b8023add0d42c858d464f?v=fffe95237d4b8162bc57000ce467f9df) url

### create github tokens
> github repo -> Settings -> Secrets and variables -> Actions -> New repository secret

fill your NOTION_DATABASE_ID and NOTION_TOKEN according to the values that you get from your notion

## How to deploy

local test
```bash
 npm i
 npm run dev
```

OR copy the whole workflow to your repository.
```js

// fill the config as below in `.github/workflows/notion2md.js`
const CONFIG ={
  days: 7,
  dir:'./DIR',
  filename:'xxx'
}
```

## How to collect data
- install [save-to-notion](https://chromewebstore.google.com/detail/save-to-notion/ldmmifpegigmeammaeckplhnjbbpccmm) to your browser
- then select the notion database you created
- fill the form and click save

![demo](https://t-qiniu.linkroutes.com/uPic/J0QGZh_rQENL4.png)