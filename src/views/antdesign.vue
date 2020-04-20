<template>
  <div id="wrapper" class="fx fx-fdc">
    <router-view></router-view>
  </div>
  <!--app end-->
</template>

<script>
import cHeader from "@/components/header";
export default {
  name: "App",
  components: {
    cHeader
  },
  data() {
    return {
      menutype: "blog"
    };
  },
  computed: {},
  watch: {},
  methods: {},

  mounted() {},
  created() {},
  beforDestroy() {}
};
</script>
