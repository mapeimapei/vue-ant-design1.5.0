<template>
<div id="wrapper" class="fx fx-fdc">
	<cHeader></cHeader>
	<div id="container" class="fx fx-f1">
    <aside class="aside fx-srk">
      <router-view name="sidebar"></router-view>
    </aside>
		<div class="container fx fx-f1 fx-srk">

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

		</div>
	</div>
</div><!--app end-->

</template>

<script>

import cHeader from '@/components/header'
export default {
  name: 'App',
  components: {
    cHeader,
  },
  data(){
    return{
      menutype:"blog"
    }
  },
  computed:{},
  watch:{},
  methods:{},

  mounted(){},
  created(){},
  beforDestroy(){}
}
</script>
