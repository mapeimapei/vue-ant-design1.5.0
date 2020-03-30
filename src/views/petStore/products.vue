<template>
	<div class="articleBox fx-f1">
    products
	</div>
</template>
<script>


import { mapState } from 'vuex'
export default {
  name:"products",
  data () {
    return {
      productList:[],
      currentPage:1,
      pageSize:5,
    }
  },

  computed:{
    ...mapState(
          ['user']
     ),

    


  },

  methods:{

  },

  mounted(){

  },

  created(){
 
  },

}
</script>

<style scoped>

</style>
