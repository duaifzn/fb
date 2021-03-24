const mongoose = require('mongoose');
const facebookSchema = require('../models/facebook.js');

//連接 rt fb
const db_facebook = mongoose.createConnection('mongodb://0.0.0.0:27018/facebook', {
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
  dataTofacebookDb: async fanPage => {
    let oldData = await facebook.findOne({ url: fanPage.url });
    if (!oldData) {
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
      await facebook.replaceOne({ _id: oldData._id }, {
        url: fanPage.url,
        like: fanPage.like,
        likeGrowValue: fanPage.likeGrowValue,
        follower: fanPage.follower,
        followerGrowValue: fanPage.followerGrowValue,
        posts: fanPage.posts,
      },(err, result) =>{
        if(err) console.log(err)
        if(result) console.log('replace data!!')
      });
    }
    
  },
  compareGrowValue: async fanPage => {
    let oldData = await facebook.findOne({ url: fanPage.url });
    if (oldData) {
      fanPage.likeGrowValue = fanPage.like - oldData.like
      fanPage.commentGrowValue = fanPage.commentValue - oldData.commentValue
      fanPage.shareGrowValue = fanPage.shareValue - oldData.shareValue
      fanPage.posts.map(newPost => {
        oldData.posts.forEach(oldPost => {
          if (oldPost.title === newPost.title){
            newPost.likeGrowValue = newPost.like - oldPost.like
            newPost.commentGrowValue = newPost.commentValue - oldPost.commentValue
            newPost.shareGrowValue = newPost.shareValue - oldPost.shareValue
          }
        })
        return newPost
      })
    }
    return fanPage
    
  },
  getDbData: async () => {
    return await facebook.find({}).limit(20);
  },
};
