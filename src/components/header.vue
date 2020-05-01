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
      let _this = this
      this.$confirm({
        title: '提示',
        content: '确定登出, 是否继续?',
        okText: '确定',
        cancelText: '取消',
        type: 'warning',
        onOk() {
          _this.setUser(null)
          _this.setToken(null)
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          if(_this.$ut.dev){
            _this.$router.push("/login")
          }else{
            window.location.href="/"
          }
        },
        onCancel() {
        },
      });
    },

    changeMenuFn(type){
      this.$emit("changemenu",type)
    },


  },
  mounted(){}
}
</script>

<style scoped>

</style>
