<template>
	<div class="articleBox fx-f1">
     cart

	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:"cart",
  data () {
    return {
      cartList:[],
      multipleSelection:[],
      productids:[],
      currentPage:1,
      pageSize:5,
      cartList2:[],
      rowKeys:this.$ut.uuid()
    }
  },

  computed:{
    ...mapState(
          ['user']
     ),


  },


  methods:{


  },

  mounted(){},
  created(){

  }

}
</script>
