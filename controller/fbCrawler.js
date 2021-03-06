
const Comment = require('../classes/comment.js');
const FanPage = require('../classes/fanPage.js');
const Post = require('../classes/post.js');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { compareGrowValue, dataTofacebookDb } = require('../services/fbService');
const { unitChangeNumber } = require('../helpers/unitChangeNumber.js')
const config = require('../config/config');

//fb登入帳密
const email = config.email;
const password = config.password;
//主頁個人照 tag
const profileImageTag = 'div[class="l9j0dhe7 dp1hu0rb cbu4d94t j83agx80"] > div:nth-child(1)'
//簡介 tag
const aboutTag = 'div[class="j83agx80 l9j0dhe7 k4urcfbm"]';
                                     
const aboutContentTag = 'span[class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb hrzyx87i jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m"]'
//貼文 tag
const aPostTag = 'div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]';
//貼文 title tag
const titleTag = 'div[class="ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a"]';
//貼文 hot tag
const hotTag = 'span[class="gpro0wi8 cwj9ozl2 bzsjyuwj ja2t1vim"]';
//貼文 like tag
const firstHotTag = 'span[class="np69z8it et4y5ytx j7g94pet b74d5cxt qw6c0r16 kb8x4rkr ed597pkb omcyoz59 goun2846 ccm00jje s44p3ltw mk2mc5f4 qxh1up0x qtyiw8t4 tpcyxxvw k0bpgpbk hm271qws rl04r1d5 l9j0dhe7 ov9facns kavbgo14"] div'
//貼文 bigHeart tag
const secondHotTag = 'span[class="np69z8it et4y5ytx j7g94pet b74d5cxt qw6c0r16 kb8x4rkr ed597pkb omcyoz59 goun2846 ccm00jje s44p3ltw mk2mc5f4 qxh1up0x qtyiw8t4 tpcyxxvw k0bpgpbk hm271qws rl04r1d5 l9j0dhe7 ov9facns tkr6xdv7"] div'
//貼文 lol tag
const thirdHotTag = 'span[class="np69z8it et4y5ytx j7g94pet b74d5cxt qw6c0r16 kb8x4rkr ed597pkb omcyoz59 goun2846 ccm00jje s44p3ltw mk2mc5f4 qxh1up0x qtyiw8t4 tpcyxxvw k0bpgpbk hm271qws rl04r1d5 l9j0dhe7 ov9facns du4w35lb"] div'
//留言分享 Tag
const postNews = 'span[class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb hrzyx87i jq4qci2q a3bd9o3v knj5qynh m9osqain"]';
//1貼文內留言
const aCommentTag = 'div[class="tw6a2znq sj5x9vvc d1544ag0 cxgpxx05"]';
//1貼文1留言 
const commentNameTag = 'div[class="nc684nl6"]';
const commentContextTag = 'div[class="ecm0bbzt e5nlhep0 a8c37x1j"]';  
  

module.exports = async (url) => {
  //windows
  const browser = await puppeteer.launch({ headless: false });
  //linux
  //const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  
  await page.goto('https://zh-tw.facebook.com/');
  await page.waitForSelector('#email')
  await page.type('#email', email,{delay: 100})
  await page.waitForSelector('#pass')
  await page.type('#pass', password,{delay: 100})
  await page.click('button[name="login"]')
  await page.waitForTimeout(10000)
  
  await page.goto(url);
  await page.waitForTimeout(10000)
  await page.mouse.click(100, 100)
  await page.waitForTimeout(10000)

  for (let times = 0; times < 6; times++) {
    await page.mouse.wheel({ deltaY: 1000 })
    await page.waitForTimeout(10000)
  }

  
  
  //更多留言按鈕
  await page.evaluate(() => {
    let buttons = document.querySelectorAll('div[class="oajrlxb2 bp9cbjyn g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 pq6dq46d mg4g778l btwxx1t3 g5gj957u p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys p8fzw8mz qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh gpro0wi8 m9osqain buofh1pr"]')
    buttons.forEach(b =>{b.click()})
  })
  await page.waitForTimeout(10000)

  const html = await page.content()
  const $ = cheerio.load(html)
  let fanPage = new FanPage()
  fanPage.url = url
  let $7 = cheerio.load($(profileImageTag).html())
  //背景圖
  $7('img').each((i, elem) =>{
    if($7(elem).attr('src').includes('960x960')) fanPage.backgroundImageUrl = $7(elem).attr('src');
  });
  //大頭照
  $7('image').each((i, elem) =>{
    if($7(elem).attr('href')) fanPage.profileImageUrl = $7(elem).attr('href');
  });
  let $6 = cheerio.load($(aboutTag).first().html())
  $6(aboutContentTag)
    .each((i, elem) => {
      if ($6(elem).text().includes('追蹤')) fanPage.follower = unitChangeNumber($6(elem).text())
      if ($6(elem).text().includes('讚')) fanPage.like = unitChangeNumber($6(elem).text())
    })

  let data = []
  //所有貼文             
  $(aPostTag).each((i, elem) => {
    let post = new Post()
    const $2 = cheerio.load($(elem).html())
    post.title = $2(titleTag).text()
    post.hot = $2(hotTag).text() || 'null'
    post.firstHot = $2(firstHotTag).attr('aria-label') || 'null'
    post.secondHot = $2(secondHotTag).attr('aria-label') || 'null'
    post.thirdHot = $2(thirdHotTag).attr('aria-label') || 'null'
    post.firstHotAnalysis();
    post.secondHotAnalysis();
    post.thirdHotAnalysis();
    $2(postNews).each((i, elem) => {
      let context =  $2(elem).text()
      if (context.includes('則留言')) {
        post.commentValue = unitChangeNumber(context)
      }
      if (context.includes('分享')) {
        post.shareValue = unitChangeNumber(context)
      }
    })
    //1貼文所有留言
    $2(aCommentTag).each((i, elem) => {
      let comment = new Comment()
      const $3 = cheerio.load($2(elem).html())
      $3(commentNameTag)
        .each((i, elem) => {
            comment.name = $3(commentNameTag).text()
            comment.context = $3(commentContextTag).text()
            post.comments.push(comment)
      })
    })

    if (post.title !== "null") {
      data.push(post)
    }
    
  })

  
  fanPage.posts.push(...data)
  //顯示抓取的資料
  //console.log(fanPage)
  // data.forEach(d => {
  //   if (d.comments) {
  //     d.comments.forEach(m => {
  //       console.log(m)
  //     })
  //   }
  // })
  
  
  await browser.close();
  //比較讚 追蹤等成長值
  let newFanPage = await compareGrowValue(fanPage)
  //寫入DB
  await dataTofacebookDb(newFanPage);
}
