<template>
  <div class="articleBox fx-f1">
    <a-spin :spinning="spinning" size="large">
      <a-button type="primary" @click="startSpider">启动网络爬虫</a-button>
      <div style="margin-top:40px;font-size:18px;">{{done}}</div>
    </a-spin>
  </div>
</template>
<script>
export default {
  name: "spider",
  data() {
    return {
      done: "",
      spinning: false
    };
  },

  methods: {
    //爬虫
    startSpider() {
      let apiUrl = "/startSpider2";
      this.spinning != this.spinning;
      this.$axios
        .post(apiUrl)
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.done = data.message;
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "新增文章列表接口错误",
            type: "warning"
          });
        });
    }
  },

  mounted() {}
};
</script>
