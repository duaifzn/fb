const mongoose = require('mongoose');
const facebookSchema = require('../models/facebook.js');

//連接 rt fb
const db_facebook = mongoose.createConnection('mongodb://localhost:27018/facebook', {
  auth: { authSource: 'admin' },
  user: 'eagle',
  pass: 'eagle-eye',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
db_facebook.on('error', () => {
  console.log('connect error!');
});
db_facebook.once('open', () => {
  console.log('fb mongodb connect!');
});

let facebook = db_facebook.model('facebook', facebookSchema);

module.exports = {
  fbTofacebookDb: async fanPage => {
    let temp = await facebook.findOne({ url: fanPage.url });
    if(!temp){
      facebook.create(
        {
          url: fanPage.url,
          like: fanPage.like,
          follower: fanPage.follower,
          posts: fanPage.posts,
        },
        (err, data) => {
          if (err) console.log(err);
        }
      )
    }
    else {
      temp.overwrite({
        url: fanPage.url,
        like: fanPage.like,
        follower: fanPage.follower,
        posts: fanPage.posts,
      })
      await temp.save();
    }
    
  },
};
