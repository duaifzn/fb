const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String },
  context: { type: String },
});

const postSchema = new Schema({
  title: { type: String },
  hot: { type: String },
  firstHot: { type: String },
  secondHot: { type: String },
  thirdHot: { type: String },
  like: { type: String },
  likeGrowValue: { type: String, default: '0' },
  bigHeart: { type: String },
  care: { type: String },
  lol: { type: String },
  wow: { type: String },
  cry: { type: String },
  angry: { type: String },
  commentValue: { type: String },
  commentGrowValue: { type: String, default: '0' },
  shareValue: { type: String },
  shareGrowValue: { type: String, default: '0' },
  comments: [commentSchema],
});

const facebookSchema = new Schema({
  url: { type: String , unique: true },
  like: { type: String },
  likeGrowValue:{type: String, default: '0'},
  follower: { type: String },
  followerGrowValue: { type: String, default: '0' },
  profileImageUrl: { type: String },
  backgroundImageUrl: { type: String }, 
  posts: [postSchema],
}, { timestamps: true ,collection: 'facebook'});

module.exports = facebookSchema;

/* 
ex:

FanPage {
  url: 'https://www.facebook.com/Eunice.action',
  like: 'null',
  follower: '48 萬位追蹤者',
  posts: [
    Post {
      title: '這兩個禮拜來墾丁志向是成為門馬羅導覽員！攝影：Ming-Ying Wu車衣：XTERRA Taiwan水袋背包：Salomon Taiwan',
      hot: '864',
      firstHot: '讚：846人',
      secondHot: '大心：12人',
      thirdHot: '哈：3人',
      like: '846',
      bigHeart: '12',
      care: 'null',
      lol: '3',
      wow: 'null',
      cry: 'null',
      angry: 'null',
      commentValue: '16',
      shareValue: '6',
      comments: [ Comment { name: 'Shannon Tsao', context: '曹凱倪151賣水果欸，而且在我們家附近' } ]
    },
    Post {
      title: '門馬羅怎麼變簡單了？哈哈哈哈哈！',
      hot: '862',
      firstHot: '讚：842人',
      secondHot: '哈：13人',
      thirdHot: '大心：3人',
      like: '842',
      bigHeart: '3',
      care: 'null',
      lol: '13',
      wow: 'null',
      cry: 'null',
      angry: 'null',
      commentValue: '18',
      shareValue: '',
      comments: [ Comment { name: 'Shannon Tsao', context: '曹凱倪151賣水果欸，而且在我們家附近' } ]
    },
  ]
}
*/
