<template>
  <div class="state-lcol fx-f1">
    <a-spin :spinning="spinning" size="large">
      <div class="state-txt fx">
        <div class="fx-f1">
          <div class="state-top">订单号：{{orderid}}</div>
          <h3 class="state-txt ftx-02">{{status|statusFliter}}</h3>
        </div>

        <div class="dl fx-f1">
          <div class="dt">
            <h4>收货人信息</h4>
          </div>
          <div class="dd">
            <div class="item">
              <span class="label">收货人：</span>
              <div class="info-rcol">{{this.user.name}}</div>
            </div>
            <div class="item">
              <span class="label">地址：</span>
              <div class="info-rcol">{{this.user.address}}</div>
            </div>
            <div class="item">
              <span class="label">手机号码：</span>
              <div class="info-rcol">{{this.user.tel}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt20" style="background:#fff;">
        <a-table bordered :dataSource="orderList">
          <a-table-column title="商品名称" data-index="cname" key="cname" />
          <a-table-column title="商品编号" data-index="productid" key="productid" />
          <a-table-column title="价格" data-index="listprice" key="listprice" />
          <a-table-column title="数量" key="quantity" data-index="quantity" />
          <a-table-column title="总价(￥)" key="amount" data-index="amount" />
          <a-table-column title="操作" key="operation">
            <template slot-scope="text, record">
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
      </div>

      <div class="goods-total clx">
        <ul>
          <li>
            <span class="label">付款方式：</span>
            <span class="txt">在线支付</span>
          </li>
          <li class="hide">
            <span class="label">付款时间：</span>
            <span class="txt"></span>
          </li>
          <li>
            <span class="label">商品总额：</span>
            <span class="txt">¥{{amount}}</span>
          </li>
          <li class="ftx-01">
            <span class="label">应付总额：</span>
            <span class="txt count">¥{{amount}}</span>
          </li>

          <li class="btn">
            <a-button type="danger">确认支付</a-button>
          </li>
        </ul>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ordersDetails",
  data() {
    return {
      orderid: this.$route.query.orderid,
      orderList: [],
      status: null,
      amount: 0,
      spinning: false,
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
            this.getOrdersDetailsId();
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

    //获取订单详情列表
    getOrdersDetailsId() {
      let apiUrl = "/getOrdersDetailsById";
      this.spinning != this.spinning;
      let obj = {
        orderid: this.orderid,
        user_id: this.user.id
      };
      this.$axios
        .post(apiUrl, JSON.stringify(obj))
        .then(data => {
          this.spinning = this.spinning;
          if (!!data && data.resultCode === "20000") {
            data.result.orderlist.forEach((item, index) => {
              item.key = index;
            });
            this.orderList = data.result.orderlist;
            this.amount = data.result.amount;
            this.status = this.orderList.length
              ? this.orderList[0].status
              : null;
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
    this.getOrdersDetailsId();
  }
};
</script>
