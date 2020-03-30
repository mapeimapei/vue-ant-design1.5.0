<template>
	<div class="articleBox fx-f1">
		addSingle

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:"addSingle",
  data () {
    return {
      articleList: [],
			currentPage:1,
      pageSize:5,
      //articleList2:[],
    }
  },

  computed:{
    ...mapState(
          ['user']
     ),

   
  },

  filters:{

  },

  methods:{

  },

  mounted(){

  },
  created(){

  },
}
</script>
