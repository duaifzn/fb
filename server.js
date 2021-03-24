const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { getDbData } = require('./services/fbService.js')

const fbCrawler = require('./controller/fbCrawler.js');
const schedule = require('node-schedule');
const config = require('./config/config.js');
const targetUrls = config.targetUrls;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



app.get('/', async (req, res) => {
  res.send(await getDbData());
})

app.listen(port, () => {
  console.log(`fb crawler server running on port ${port}`);
  //先跑第一次fbCrawler
  (async () =>{
    for (let i = 0; i < targetUrls.length; i++){
      fbCrawler(targetUrls[i])
      await timeout(config.delay);
    };
  })();
  //跑排程
  schedule.scheduleJob('*/10 * * * *', async () =>{
    console.log('RUN schedule!!!!!!!!!');
    for (let i = 0; i < targetUrls.length; i++){
      fbCrawler(targetUrls[i])
      await timeout(config.delay);
    };
  });
})
