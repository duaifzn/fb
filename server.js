const fbCrawler = require('./controller/fbCrawler.js');
const schedule = require('node-schedule');
const config = require('./config/config.js');
const targetUrls = config.targetUrls;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

schedule.scheduleJob('*/1 * * * *', async () =>{
  console.log('RUN schedule!!!!!!!!!');
  for (let i = 0; i < targetUrls.length; i++){
    fbCrawler(targetUrls[i])
    await timeout(config.delay);
  };
});
