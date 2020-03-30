<template>
	<div class="loginBox">
		<div class="pt60">
			<div class="tx">欢迎登录</div>
		</div>
  </div>
</template>

<script>
import { mapState,mapGetters,mapActions ,mapMutations } from 'vuex'
export default {
  name: 'login',
  components: {},
  data(){
      return {

      }
  },
  computed:{
    ...mapState(
          ['user','token']
     ),
  },
  watch:{},
  methods:{
    //mutation 的辅助方法
    ...mapMutations(['setUser','setToken']),

  },

  mounted(){

  },

  created(){

  },

  beforDestroy(){

  }
}
</script>
