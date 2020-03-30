<template>
	<div class="articleBox fx-f1">
    orders
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:"orders",
  data () {
    return {
       orderList:[],
       currentPage:1,
       pageSize:5,
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

  mounted(){
  },
  created(){
    

  }


}
</script>
