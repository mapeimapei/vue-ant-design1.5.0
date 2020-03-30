<template>
    <ul>
      <li v-for="(item,index) in menu" :key ="'menu'+index">
          <router-link :to="item.path">{{item.name}}</router-link>
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
                "name":"文章列表",
                "path":"posts",
              },
              {
                "name":"添加&编辑文章",
                "path":"addSingle",
              },
              {
                "name":"网络爬虫",
                "path":"spider",
              },
            ]
    }
  },
  computed:{},
  watch:{},
  methods:{
  },
  mounted(){}
}
</script>

<style scoped>

</style>
