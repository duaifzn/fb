module.exports={
    //單位轉數字 ex: 1萬＝> 10000
    unitChangeNumber:(str) =>{
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
      },
}