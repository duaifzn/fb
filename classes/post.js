class Post{
  constructor() {
    this.title = "null";
    this.hot = "null";
    this.firstHot = "null";
    this.secondHot = "null";
    this.thirdHot = "null";
    this.like = 'null';
    this.bigHeart = 'null';
    this.care = 'null';
    this.lol = 'null';
    this.wow = 'null';
    this.cry = 'null';
    this.angry = 'null';
    this.commentValue = "null";
    this.shareValue = "null";
    this.comments = [];
  }
  firstHotAnalysis() {
    if (this.firstHot.includes('讚')) {
      this.like = this.firstHot.replace(/[^0-9]/ig,"");
    }
    else if (this.firstHot.includes('大心')) {
      this.bigHeart = this.firstHot.replace(/[^0-9]/ig,"");
    }
    else if (this.firstHot.includes('加油')) {
      this.care = this.firstHot.replace(/[^0-9]/ig,"");
    }
    else if (this.firstHot.includes('哈')) {
      this.lol = this.firstHot.replace(/[^0-9]/ig,"");
    }
    else if (this.firstHot.includes('哇')) {
      this.wow = this.firstHot.replace(/[^0-9]/ig,"");
    }
    else if (this.firstHot.includes('嗚')) {
      this.cry = this.firstHot.replace(/[^0-9]/ig,"");
    }
    else if (this.firstHot.includes('怒')) {
      this.angry = this.firstHot.replace(/[^0-9]/ig,"");
    }
  }
  secondHotAnalysis() {
    if (this.secondHot.includes('讚')) {
      this.like = this.secondHot.replace(/[^0-9]/ig,"");
    }
    else if (this.secondHot.includes('大心')) {
      this.bigHeart = this.secondHot.replace(/[^0-9]/ig,"");
    }
    else if (this.secondHot.includes('加油')) {
      this.care = this.secondHot.replace(/[^0-9]/ig,"");
    }
    else if (this.secondHot.includes('哈')) {
      this.lol = this.secondHot.replace(/[^0-9]/ig,"");
    }
    else if (this.secondHot.includes('哇')) {
      this.wow = this.secondHot.replace(/[^0-9]/ig,"");
    }
    else if (this.secondHot.includes('嗚')) {
      this.cry = this.secondHot.replace(/[^0-9]/ig,"");
    }
    else if (this.secondHot.includes('怒')) {
      this.angry = this.secondHot.replace(/[^0-9]/ig,"");
    }
  }
  thirdHotAnalysis() {
    if (this.thirdHot.includes('讚')) {
      this.like = this.thirdHot.replace(/[^0-9]/ig,"");
    }
    else if (this.thirdHot.includes('大心')) {
      this.bigHeart = this.thirdHot.replace(/[^0-9]/ig,"");
    }
    else if (this.thirdHot.includes('加油')) {
      this.care = this.thirdHot.replace(/[^0-9]/ig,"");
    }
    else if (this.thirdHot.includes('哈')) {
      this.lol = this.thirdHot.replace(/[^0-9]/ig,"");
    }
    else if (this.thirdHot.includes('哇')) {
      this.wow = this.thirdHot.replace(/[^0-9]/ig,"");
    }
    else if (this.thirdHot.includes('嗚')) {
      this.cry = this.thirdHot.replace(/[^0-9]/ig,"");
    }
    else if (this.thirdHot.includes('怒')) {
      this.angry = this.thirdHot.replace(/[^0-9]/ig,"");
    }
  }
};

module.exports = Post