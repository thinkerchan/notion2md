# notion2md

notion2md is a github action workflow to conver Notion Database to Markdown file automatically. feel free to use it on your blog or anywhere you want.


## How to use
```bash
 // local test
 npm i -S
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