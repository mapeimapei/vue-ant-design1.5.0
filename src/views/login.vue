<template>
  <div class="loginBox">
    <a-spin class="pt60" :spinning="spinning" size="large">
      <div class="tx">欢迎登录</div>
      <a-form-model
        ref="loginForm"
        :model="loginData"
        :rules="rules"
        label-width="70px"
        class="loginData"
      >
        <a-form-model-item has-feedback label="账号" prop="account">
          <a-input v-model="loginData.account" type="text" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="输入密码" prop="passwd">
          <a-input
            v-model="loginData.passwd"
            @keyup.enter.native="submitForm"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="resetForm">重 置</a-button>
          <a-button
            type="primary"
            style="margin-left: 10px"
            class="spin-content"
            @click="submitForm"
            v-model="spinning"
          >登 录</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "login",
  components: {},
  data() {
    return {
      spinning: false,
      delayTime: 2500,
      loginData: {
        account: "",
        passwd: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入正确的账号或名称", trigger: "blur" }
        ],
        passwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["user", "token"])
  },
  watch: {},
  methods: {
    //mutation 的辅助方法
    ...mapMutations(["setUser", "setToken"]),

    loginFn() {
      this.spinning = !this.spinning;
      let obj = { ...this.loginData };
      let apiUrl = "/login";
      this.$axios.post(apiUrl, JSON.stringify(obj)).then(data => {
          this.spinning = !this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.setUser(data.result);
            this.setToken(data.result.token);
            localStorage.setItem("user", JSON.stringify(data.result));
            localStorage.setItem("token", data.result.token);
            let redirect = decodeURIComponent(
              this.$route.query.redirect || "/blog/post"
            );
            this.$router.push({
              path: redirect
            });
            this.$notification.success({
              message: "登录成功。"
            });
          } else {
            this.$notification.warning({
              message: "账号或密码错误。"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification.error({
            message: "登录接口报错。"
          });
        });
    },

    submitForm() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          //alert('submit!');
          this.loginFn();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["loginForm"].resetFields();
    }
  },

  mounted() {},

  created() {},

  beforDestroy() {}
};
</script>
