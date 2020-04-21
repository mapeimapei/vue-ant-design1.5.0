<template>
  <div class="articleBox fx-f1">
    <a-spin :spinning="spinning" size="large">
      <a-table bordered :dataSource="productList" :pagination="pagination">
        <a-table-column title="图片" width="48px">
          <template slot-scope="text,record">
            <div class="productIcon">
              <img :src="$ut.srcUrl + record.image" />
            </div>
          </template>
        </a-table-column>
        <a-table-column title="名称" data-index="cname" key="cname" />
        <a-table-column title="分类" data-index="category" key="category" />
        <a-table-column title="单价(￥)" data-index="listprice" key="listprice" />
        <a-table-column title="描述" data-index="descn" key="descn" />
        <a-table-column title="数量">
          <template slot-scope="text,record">
            <a-input-number :min="1" v-model="record.quantity" />
          </template>
        </a-table-column>
        <a-table-column title="操作" key="operation">
          <template slot-scope="text, record">
            <a href="javascript:;" @click="createOrders(record)">直接购买 ——</a>
            <a href="javascript:;" @click="addCartFn(record)">加入购物车</a>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "products",
  data() {
    return {
      pagination: {
        pageSize: 8
      },
      productList: [],
      spinning: false
    };
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    //生成订单
    createOrders(value) {
      // console.log("createOrders",value)
      let apiUrl = "/addOrder";
      this.spinning != this.spinning;
      let obj = {
        productList: [value],
        user_id: this.user.id
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning != this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.$router.push({
              path: "/petStore/ordersDetails",
              query: { orderid: data.result.orderid }
            });
          } else {
            this.$notification.warning({
              message: "生成订单失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification.error({
            message: "生成订单接口报错。",
            type: "warning"
          });
        });
    },

    //加入购物车
    addCartFn(value) {
      let apiUrl = "/addCart";
      this.spinning != this.spinning;
      let obj = {
        productid: value.productid,
        quantity: value.quantity,
        user_id: this.user.id
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning != this.spinning;
          if (!!data && data.resultCode === "20000") {
            // this.productList = data.result
            this.getProducts();
            this.$notification.success({
              message: "加入购物车",
              type: "success"
            });
          } else {
            this.$notification.warning({
              message: "加入购物车失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification.error({
            message: "加入购物车接口报错。",
            type: "warning"
          });
        });
    },

    //获取商品列表
    getProducts() {
      let apiUrl = "/getProducts";
      this.spinning != this.spinning;
      this.$axios
        .get(apiUrl)
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            data.result.forEach((item, index) => {
              item.key = index;
              item.quantity = 1;
            });
            this.productList = data.result;
          } else {
            this.$notify({
              message: "获取商品列表失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "获取商品列表接口失败",
            type: "warning"
          });
        });
    }
  },

  mounted() {},

  created() {
    this.getProducts();
  }
};
</script>

<style scoped>
</style>
