# notion2md

notion2md is a github action workflow to conver Notion Database to Markdown file automatically. feel free to use it on your blog or anywhere you want.

## Screenshots
![demo](http://t-qiniu.linkroutes.com/uPic/sIoZKY.png)
notion database

![demo](http://t-qiniu.linkroutes.com/uPic/ewMMvu.png)
markdown file

## Requirements
### 1. create a notion database
you can simply duplicate this [demo db](https://thinkrchan.notion.site/10ae95237d4b8023add0d42c858d464f?v=fffe95237d4b8162bc57000ce467f9df) as a template

### 2. get notion token and database id
- go to https://www.notion.so/profile/integrations to get notion token
- db id like : 【10ae95237d4b8023add0d42c858d464f】 in [demo db](https://thinkrchan.notion.site/10ae95237d4b8023add0d42c858d464f?v=fffe95237d4b8162bc57000ce467f9df) url

### 3. fork this repo & create github tokens
- click to fork [this repo](https://github.com/thinkerchan/notion2md/fork)
- github token: Settings -> Secrets and variables -> Actions -> New repository secret
- fill your NOTION_DATABASE_ID and NOTION_TOKEN according to the values that you get from your notion

## Local try
> create .env file like below once you have cloned the repo on your local machine

```txt
# .env file on the root directory
NOTION_TOKEN=your_token
NOTION_DATABASE_ID=your_db_id
```

```js
// set CONFIG as below in `.github/workflows/notion2md.js` if you want
const CONFIG ={  //default values
  days: 7,
  dir:'./posts',
  filename:'weekly news'
}
```

```bash
 # then run the dev command
 npm i
 npm run dev
```

## How to collect
- install [save-to-notion](https://chromewebstore.google.com/detail/save-to-notion/ldmmifpegigmeammaeckplhnjbbpccmm) to your browser
- then select the notion database you created
- fill the form and click save

![demo](https://camo.githubusercontent.com/21883de28cdf349b9652c7347df752687eb436819c3db7572a9d8f7ca881e84b/68747470733a2f2f742d71696e69752e6c696e6b726f757465732e636f6d2f755069632f4a3051475a685f7251454e4c342e706e67)

## Cases
- [Weekly](https://post.testdog.cn)