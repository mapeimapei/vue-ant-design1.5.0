<template>
    <ul>
      <li v-for="(item,index) in menu" :key ="'menu'+index">
          <router-link :class="{'router-link-active':item.path =='orders' && !!cls }" :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
</template>
<script>
export default {
  name: 'cSidebar',
  props:[],
  data(){
    return{
      menu:[
              {
                "name":"商品中心",
                "path":"products",
              },
              {
                "name":"购物车",
                "path":"cart",
              },
              {
                "name":"订单中心",
                "path":"orders",
              }
            ],
      cls:false,
    }
  },
  computed:{
  },
  watch:{
    $route(to){
      this.cls = false
      if(to.path === "/petStore/ordersDetails"){
        this.cls = true
      }
    }
  },
  methods:{
  },
  mounted(){
    if(this.$route.path === "/petStore/ordersDetails"){
      this.cls = true
    }
  }
}
</script>

<style scoped>

</style>
