export default {
    demo:{
      url:"/httpDome.json",
      desc:"接口描述",
      method:"post",
      data:{id:"123"},
      successTips:false,
      faildTips:false,
      loading:true,
      cancelToken:true,
      source:null,
    },

    addSingle:{
      url:"/addSingle",
      desc:"添加文章的接口",
      method:"post",
      data:{
        "user_name":"",
        "user_id":"",
        "name":"",
        "summary":"",
        "content":"",
      },
      successTips:true,
      faildTips:true,
      loading:true,
      cancelToken:true,
      source:null,
    },






    storeList2:{
      url:"/storeList2.json",
      desc:"一个store演示数据",
      method:"get",
      data:"?project=123",
      successTips:true,
      faildTips:false,
      loading:true,
      cancelToken:true,
      source:null,
    },


    storeList:{
      url:"/storeList.json",
      desc:"一个store演示数据",
      method:"post",
      data:{},
      successTips:true,
      faildTips:true,
      loading:true,
    },

    lookup:{
      url:"接口地址",
      desc:"接口描述",
      method:"post",
      data:{},
      successTips:false,
      loading:true,
    },

}
