//公共方法
//环境切换
// process.env.NODE_ENV == 'production'
// process.env.NODE_ENV == 'debug'
// process.env.NODE_ENV == 'development'
const dev = process.env.NODE_ENV != 'production' ? true : false
const utils = {
    dev:dev,
    api:dev ? "/proxyApi/api" : "/api",
    srcUrl:dev ? "/proxyApi/static/resources/images/" : "/static/resources/images/",
    //深拷贝
    clone(object){
      return JSON.parse(JSON.stringify(object))
    },

    htmlDecode(text) {
      let temp = document.createElement("div")
      temp.innerHTML = text
      let output = temp.innerText || temp.textContent
      temp = null
      return output
    },

    formatData(obj){
      if(typeof(obj) === "object"){
          if(Object.prototype.toString.call(obj) ==="[object Object]" ){
            for(let key of Object.keys(obj)){
              if(typeof(obj[key]) === 'object'){
                this.formatData(obj[key])
              }else if(typeof(obj[key]) === 'string'){
                  obj[key] = this.htmlDecode(obj[key])
              }
            }
          }else if(Object.prototype.toString.call(obj) ==="[object Array]"){
            obj.forEach((item,index)=>{
              if(typeof(item) === 'object'){
                this.formatData(item)
              }else if(typeof(obj[index]) === 'string'){
                  obj[index] = this.htmlDecode(item)
              }
            })
          }
      }
      return obj
    },

    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
    },

    // 数组排重
    getFilterArray (array) {
        let res = [];
        let json = {};
        for (let i = 0; i < array.length; i++){
            let _self = array[i];
            if(!json[_self]){
                res.push(_self);
                json[_self] = 1;
            }
        }
        return res;
    },

    //对象数组逆序
    arrayReverse(proArr){
      let arr = []
      let length = proArr.length
      for(let i=length - 1; i>=0; i--){
        arr.push(proArr[i])
      }
      return arr
    },

    //并集
    union(arr1,arr2){
        let a = new Set(arr1)
        let b =new Set(arr2)
        return [...new Set([...a,...b])]
    },

    //交集
    intersect(arr1,arr2){
        let a = new Set(arr1)
        let b =new Set(arr2)
        return [...new Set([...a].filter(x=>b.has(x)))]
    },

    //差集
    diff(arr1,arr2){
        let a = new Set(arr1)
        let b =new Set(arr2)
        return [...new Set([...a].filter(x=>!b.has(x)))]
    },

    //二进制流下载
    //type为下载文件的类型
    blobDownloadFn(res,type){
      var disp =res.request.getResponseHeader('Content-Disposition')
      var fileName = ""
      if (disp && disp.search('attachment') != -1) {
        var index = disp.indexOf("")
        var lastlndex = disp.lastlndexOf("")
        fileName = disp.substring(index + 1, lastlndex)
      }
      var eleLink = document.createElement('a')
      eleLink.download = fileName
      eleLink.style.display = 'none'
      //字符内容转变成blob地址
      if(!!type){
        var blob = new Blob([res.data], { type: "application/"+type})
      }else{
        var blob = new Blob([res.data])
      }
      eleLink.href =URLcreateObjectURL(blob)
      //触发点击
      document.body.appendChild(eleLink)
      if(!!window.ActiveXObject || "ActiveXObject" in window){
        window.navigator.msSaveOrOpenBlob(blob,eleLink.download)
      }else {
        eleLink.click()
      }
      //然后移除
      document.body.removeChild(eleLink)
    },

}

export default utils;
