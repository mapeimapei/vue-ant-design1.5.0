<template>
  <div class="fx-f1" style="padding:1rem;">
    <a-spin :spinning="spinning" size="large">
      <a-form-model ref="addSingForm" :model="addArticle" :rules="rules" label-width="120px">
        <a-form-model-item label="文章名称" prop="name" ref="name">
          <a-input v-model="addArticle.name" type="text" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="文章摘要" prop="summary" ref="summary">
          <a-input v-model="addArticle.summary" type="text" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="正文内容" prop="content" ref="content">
          <a-input
            v-model="addArticle.content"
            type="textarea"
            autocomplete="off"
            style="min-height:200px;"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="resetForm()">重 置</a-button>
          <a-button
            type="primary"
            style="margin-left: 10px"
            class="spin-content"
            @click="submitForm"
            v-model="spinning"
          >提 交</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "addSingle",
  data() {
    return {
      postId: this.$route.query.id || "",
      spinning: false,
      rules: {
        name: [
          { required: true, message: "文章名称不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "正文内容不能为空", trigger: "blur" }
        ]
      },
      addArticle: {
        user_name: "",
        user_id: "",
        name: "",
        post_id: "",
        summary: "",
        content: ""
      }
    };
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    //新增文章
    addSingle() {
      let apiUrl = "/addSingle";
      this.spinning != this.spinning;
      let obj = {
        content: this.addArticle.content,
        name: this.addArticle.name,
        post_id: this.addArticle.post_id,
        summary: this.addArticle.summary,
        user_id: this.user.id,
        user_name: this.addArticle.user_name
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.$router.push({ path: "/blog/posts" });
          } else {
            this.$notify({
              message: "新增文章错误",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "新增文章列表接口错误",
            type: "warning"
          });
        });
    },

    //获取文章信息
    getSingle() {
      if (!this.postId) return;
      let apiUrl = "/getSingleById/" + this.postId;
      this.spinning != this.spinning;
      this.$axios
        .get(apiUrl)
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.addArticle.name = data.result.name;
            this.addArticle.summary = data.result.summary;
            this.addArticle.content = data.result.content;
          } else {
            this.$notify({
              message: "获取文章列表失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "获取文章列表接口失败",
            type: "warning"
          });
        });
    },

    submitForm(addSingForm) {
      this.$refs["addSingForm"].validate(valid => {
        if (valid) {
          this.addSingle();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(addSingForm) {
      this.$refs["addSingForm"].resetFields();
    }
  },

  mounted() {},

  created() {
    this.getSingle();
  }
};
</script>
