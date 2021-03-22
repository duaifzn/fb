class Post{
  constructor() {
    this.title = "null";
    this.hot = "null";
    this.firstHot = "null";
    this.secondHot = "null";
    this.thirdHot = "null";
    this.like = 'null';
    this.likeGrowValue = '0';
    this.bigHeart = 'null';
    this.care = 'null';
    this.lol = 'null';
    this.wow = 'null';
    this.cry = 'null';
    this.angry = 'null';
    this.commentValue = "null";
    this.commentGrowValue = '0';
    this.shareValue = "null";
    this.shareGrowValue = '0';
    this.comments = [];
  }
  firstHotAnalysis() {
    if (this.firstHot.includes('讚')) {
      this.like = this.unitChangeNumber(this.firstHot)
    }
    else if (this.firstHot.includes('大心')) {
      this.bigHeart = this.unitChangeNumber(this.firstHot)
    }
    else if (this.firstHot.includes('加油')) {
      this.care = this.unitChangeNumber(this.firstHot)
    }
    else if (this.firstHot.includes('哈')) {
      this.lol = this.unitChangeNumber(this.firstHot)
    }
    else if (this.firstHot.includes('哇')) {
      this.wow = this.unitChangeNumber(this.firstHot)
    }
    else if (this.firstHot.includes('嗚')) {
      this.cry = this.unitChangeNumber(this.firstHot)
    }
    else if (this.firstHot.includes('怒')) {
      this.angry = this.unitChangeNumber(this.firstHot)
    }
  }
  secondHotAnalysis() {
    if (this.secondHot.includes('讚')) {
      this.like = this.unitChangeNumber(this.secondHot)
    }
    else if (this.secondHot.includes('大心')) {
      this.bigHeart = this.unitChangeNumber(this.secondHot)
    }
    else if (this.secondHot.includes('加油')) {
      this.care = this.unitChangeNumber(this.secondHot)
    }
    else if (this.secondHot.includes('哈')) {
      this.lol = this.unitChangeNumber(this.secondHot)
    }
    else if (this.secondHot.includes('哇')) {
      this.wow = this.unitChangeNumber(this.secondHot)
    }
    else if (this.secondHot.includes('嗚')) {
      this.cry = this.unitChangeNumber(this.secondHot)
    }
    else if (this.secondHot.includes('怒')) {
      this.angry = this.unitChangeNumber(this.secondHot)
    }
  }
  thirdHotAnalysis() {
    if (this.thirdHot.includes('讚')) {
      this.like = this.unitChangeNumber(this.thirdHot)
    }
    else if (this.thirdHot.includes('大心')) {
      this.bigHeart = this.unitChangeNumber(this.thirdHot)
    }
    else if (this.thirdHot.includes('加油')) {
      this.care = this.unitChangeNumber(this.thirdHot)
    }
    else if (this.thirdHot.includes('哈')) {
      this.lol = this.unitChangeNumber(this.thirdHot)
    }
    else if (this.thirdHot.includes('哇')) {
      this.wow = this.unitChangeNumber(this.thirdHot)
    }
    else if (this.thirdHot.includes('嗚')) {
      this.cry = this.unitChangeNumber(this.thirdHot)
    }
    else if (this.thirdHot.includes('怒')) {
      this.angry = this.unitChangeNumber(this.thirdHot)
    }
  }
  unitChangeNumber(str) {
  let unit = 1
  if (str.includes('千萬')) {
    unit = 10000000
  }
  else if (str.includes('百萬')) {
    unit = 1000000
  }
  else if (str.includes('十萬')) {
    unit = 100000
  }
  else if (str.includes('萬')) {
    unit = 10000
  }
  return String(parseFloat(str.replace(/[^0-9\.]/ig,""))*unit)
}
};

module.exports = Post