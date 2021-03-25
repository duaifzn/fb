const { timeout } = require('./helpers/timeout.js')
const fbCrawler = require('./controller/fbCrawler.js');
const schedule = require('node-schedule');
const config = require('./config/config.js');
const targetUrls = config.targetUrls;
//先跑第一次fbCrawler
(async () =>{
    console.log('run fbCrawler first time!!')
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