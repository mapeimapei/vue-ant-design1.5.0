<template>
	<div class="state-lcol fx-f1">
      ordersDetails
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:"ordersDetails",
  data () {
    return {
      orderid:this.$route.query.orderid,
      orderList:[],
      status:null,
      amount:0
	  }
  },

  computed:{
    ...mapState(
          ['user']
     ),
  },

  filters:{
    statusFliter(val){
      if(val == 0){
        return "未支付"
      }else if(val == 1){
        return "已完成"
      }else if(val == 2){
        return "已取消"
      }
    }
  },

  methods:{

  },

  mounted(){},

  created(){
   
  }

}
</script>
