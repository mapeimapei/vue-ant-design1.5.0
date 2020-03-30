<template>
		<div>addSingle</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:"addSingle",
  data () {
    return {
        postId:this.$route.query.id || "",
    }
  },

  computed:{
    ...mapState(
          ['user']
     )
  },

  methods:{

  },

  mounted(){


  },

	created(){

	}

}
</script>
