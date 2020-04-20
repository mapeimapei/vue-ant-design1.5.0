<template>
  <div class="articleBox fx-f1">
    <a-spin :spinning="spinning" size="large">
      <a-table bordered :dataSource="orderList" :pagination="pagination">
        <a-table-column title="订单ID" data-index="orderid" key="orderid" />
        <a-table-column title="总价(￥)" data-index="amount" key="amount" />
        <a-table-column title="订单日期" data-index="orderdate" key="orderdate" />
        <!-- <a-table-column title="状态" data-index="status" key="status" /> -->
        <a-table-column title="状态">
          <template slot-scope="text, record">{{record.status | statusFliter}}</template>
        </a-table-column>
        <a-table-column title="操作" key="operation">
          <template slot-scope="text, record, index">
            <a-button type="link" @click="gotoordersDetails(record)">查看</a-button>
            <a-button type="link" @click="deletFn(record)">删除</a-button>
            <a-modal
              title="Title"
              :visible="visible"
              @ok="handleOk(record)"
              :confirmLoading="confirmLoading"
              @cancel="handleCancel"
            >
              <p>{{ ModalText }}</p>
            </a-modal>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      orderList: [],
      spinning: false,
      pagination: {
        pageSize: 5
      },
      ModalText: "确定是否删除",
      visible: false,
      confirmLoading: false
    };
  },
  computed: {
    ...mapState(["user"])
  },

  filters: {
    statusFliter(val) {
      if (val == 0) {
        return "未支付";
      } else if (val == 1) {
        return "已完成";
      } else if (val == 2) {
        return "已取消";
      }
    }
  },

  methods: {
    //删除
    deletFn() {
      this.visible = true;
    },
    handleOk(record) {
      this.ModalText = "确定是否删除";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 100);
      let apiUrl = "/deleteOrder";
      this.spinning != this.spinning;
      let obj = {
        orderid: record.orderid,
        user_id: this.user.id
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            this.getOrderList();
            this.$notification.success({
              message: "删除成功。"
            });
          } else {
            this.$notify({
              message: "删除订单列表失败。",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "删除订单列表接口报错。",
            type: "warning"
          });
        });
    },
    handleCancel(record) {
      this.visible = false;
    },

    //查看
    gotoordersDetails(record) {
      this.$router.push({
        path: "/petStore/ordersDetails",
        query: { orderid: record.orderid }
      });
    },

    //获取订单列表
    getOrderList() {
      let apiUrl = "/getOrderList/" + this.user.id;
      this.spinning != this.spinning;
      this.$axios
        .get(apiUrl)
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            data.result.forEach((item, index) => {
              item.key = index;
            });
            this.orderList = data.result;
          } else {
            this.$notify({
              message: "获取订单列表失败。",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.spinning = this.spinning;
          this.$notify({
            message: "订单列表接口报错。",
            type: "warning"
          });
        });
    }
  },

  mounted() {},
  created() {
    this.getOrderList();
  }
};
</script>
