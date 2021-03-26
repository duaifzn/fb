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
          profileImageUrl: fanPage.profileImageUrl,
          backgroundImageUrl: fanPage.backgroundImageUrl,     
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
        profileImageUrl: fanPage.profileImageUrl,
        backgroundImageUrl: fanPage.backgroundImageUrl,  
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
      fanPage.likeGrowValue = String(parseInt(fanPage.like) - parseInt(oldData.like))
      fanPage.commentGrowValue = String(parseInt(fanPage.commentValue) - parseInt(oldData.commentValue))
      fanPage.shareGrowValue = String(parseInt(fanPage.shareValue) - parseInt(oldData.shareValue))
      fanPage.posts.map(newPost => {
        oldData.posts.forEach(oldPost => {
          if (oldPost.title === newPost.title){
            newPost.likeGrowValue = String(parseInt(newPost.like) - parseInt(oldPost.like))
            newPost.commentGrowValue = String(parseInt(newPost.commentValue) - parseInt(oldPost.commentValue))
            newPost.shareGrowValue = String(parseInt(newPost.shareValue) - parseInt(oldPost.shareValue))
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
