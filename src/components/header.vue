<template>
	<header class="fx fx-aic fx-srk header">
		<div class="logo">后台管理</div>
		<nav class="fx-f1">
			<ul class="fx fx-aic">
        <li><a href="/">网站首页</a></li>
				<li><router-link to="/blog">博客</router-link></li>
				<li><router-link to="/petStore">宠物商店</router-link></li>
			</ul>
		</nav>
		<div class="personalCenter" v-if="user">
      <a href="javascript:">{{user.name}}</a>
      <a class="t12" href="javascript:" @click="logout">登出</a>
		</div>
	</header>
</template>
<script>
import { mapState,mapGetters,mapActions ,mapMutations } from 'vuex'
export default {
  name: 'cHeader',
  props:[],
  data(){
    return{}
  },
  computed:{
    ...mapState(
          ['user','token']
     ),
  },
  watch:{},
  methods:{
    ...mapMutations(['setUser','setToken']),
    //登出
    logout(){
      console.log("登出")
    },


  },
  mounted(){}
}
</script>

<style scoped>

</style>
