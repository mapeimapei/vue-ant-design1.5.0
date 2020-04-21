<template>
  <div class="articleBox fx-f1">
    <a-spin :spinning="spinning" size="large">
      <div style="margin-bottom: 16px">
        <a-button type="primary" :disabled="!selectedRowKeys.length" @click="makeOrderFn">提交订单</a-button>
        <a-button @click="deletSelected()" type="primary" :disabled="!selectedRowKeys.length">删除选中的商品</a-button>
        <span style="margin-left: 8px">
          <a-button type="primary" :disabled="!cartList.length" @click="clearFn">清空购物车</a-button>
        </span>
      </div>
      <a-table
        bordered
        :dataSource="cartList"
        :pagination="pagination"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <a-table-column title="图片" width="48px">
          <template slot-scope="text,record">
            <div class="productIcon">
              <img :src="$ut.srcUrl + record.image" />
            </div>
          </template>
        </a-table-column>
        <a-table-column title="名称" data-index="cname" key="cname" />
        <a-table-column title="分类" data-index="category" key="category" />
        <a-table-column title="描述" data-index="descn" key="descn" />
        <a-table-column title="单价(￥)" data-index="listprice" key="listprice" />
        <a-table-column title="数量">
          <template slot-scope="text,record">
            <a-input-number :min="1" v-model="record.quantity" />
          </template>
        </a-table-column>
        <a-table-column title="总价">
          <template slot-scope="text,record">{{record.listprice*record.quantity}}</template>
        </a-table-column>
        <a-table-column title="操作" key="operation">
          <template slot-scope="text, record">
            <a-popconfirm
              title="此操作将永久删除该记录, 是否继续?"
              okText="确认"
              cancelText="取消"
              @confirm="confirmDeleteFn(record.productid)"
              @cancel="cancel"
            >
              <a href="#">删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      cartList: [],
      productids: [],
      rowKeys: this.$ut.uuid(),
      spinning: false,
      pagination: {
        pageSize: 5
      },
      selectedRowKeys: [],
      ModalText: "此操作将永久删除该记录, 是否继续?",
      productList:[],
    };
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    //点击删除选中弹框
    deletSelected() {
      let _this = this
      this.$confirm({
        title: "此操作将永久删除该记录, 是否继续?",
        content: h => <div style="color:red;">删除之后不能返回</div>,
        okText: "确认",
        okType: "primary",
        cancelText: "取消",
        onOk() {
          // console.log("OK");
          _this.deletFn();   //调用选中删除接口
        },
        onCancel() {
          // console.log("Cancel");
        },
        class: "test"
      });
    },

    //复选框
    onSelectChange(keys, rows) {
      // console.log(keys,rows)
      this.selectedRowKeys = keys;
      this.productids = [];
      rows.forEach(item => {
        this.productids.push(item.productid);
        this.productList.push(item)
      });
    },

    //生成订单
    makeOrderFn() {
      // console.log()
      let apiUrl = "/addOrder";
      this.spinning != this.spinning;
      let obj = {
        user_id: this.user.id,
        productList: [...this.productList]
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.$notification.success({
              message: "订单生成成功。"
            });
            this.$router.push({
              path: "ordersDetails",
              query: { orderid: data.result.orderid }
            });
          } else {
            this.$notification.warning({
              message: "订单生成失败。"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification.warning({
            message: "订单生成接口报错。"
          });
        });
    },

    //清空
    clearFn() {
      let apiUrl = "/deleteCart";
      this.spinning != this.spinning;
      let obj = {
        productids: [],
        user_id: this.user.id
      };
      this.cartList.forEach(item => {
        obj.productids.push(item.productid);
      });
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.cartList = [];
            this.getCartList();
            this.$notification.success({
              message: "删除成功。"
            });
          } else {
            this.$notification.warning({
              message: "删除订单列表失败。"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification.warning({
            message: "删除订单列表接口报错。"
          });
        });
    },

    //选中删除
    deletFn() {
      let apiUrl = "/deleteCart";
      this.spinning != this.spinning;
      let obj = {
        productids: [...this.productids],
        user_id: this.user.id
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.selectedRowKeys = [];
            this.getCartList();
            this.$notification.success({
              message: "删除成功。"
            });
          } else {
            this.$notification.warning({
              message: "删除订单列表失败。"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification.warning({
            message: "删除订单列表接口报错。"
          });
        });
    },

    //每行后面的删除
    confirmDeleteFn(value) {
      let apiUrl = "/deleteCart";
      this.spinning != this.spinning;
      let obj = {
        productids: [value],
        user_id: this.user.id
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.getCartList();
            this.$notification.success({
              message: "删除成功。"
            });
          } else {
            this.$notification({
              message: "删除订单列表失败。",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notification({
            message: "删除订单列表接口报错。",
            type: "warning"
          });
        });
    },
    cancel(){
    },

    //获取购物车列表
    getCartList() {
      let apiUrl = "/getCartList/" + this.user.id;
      this.spinning != this.spinning;
      this.$axios
        .get(apiUrl)
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            data.result.forEach((item, index) => {
              item.key = index;
            });
            this.cartList = data.result;
          } else {
            this.$notify({
              message: "获取购物车列表失败。",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "获取购物车列表接口报错。",
            type: "warning"
          });
        });
    }
  },

  mounted() {},
  created() {
    this.getCartList();
  }
};
</script>
