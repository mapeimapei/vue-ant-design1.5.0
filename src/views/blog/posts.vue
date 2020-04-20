<template>
  <div class="articleBox fx-f1">
    <a-spin :spinning="spinning" size="large">
      <a-table bordered :dataSource="articleList" :pagination="pagination">
        <a-table-column width="50%" title="标题" data-index="name" key="name" />
        <a-table-column title="作者" data-index="user_name" key="user_name" />
        <a-table-column title="创建时间" data-index="created_at" key="created_at" />
        <a-table-column title="操作" key="operation">
          <template slot-scope="text, record, index">
            <a-popconfirm
              okText="确定"
              cancelText="取消"
              title="确认要删除吗?"
              @confirm="onDelete(record)"
              @cancel="cancelFn">
              <a href="javascript:;">删除 ——</a>
            </a-popconfirm>
            <a href="javascript:;" @click="editFn(record)">编辑</a>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      pagination: {
        pageSize: 8
      },
      spinning: false,
      articleList: [],
    };
  },

  computed:{
		...mapState(
			['user']
		),
	},

  methods: {
    //获取列表
    getPostList() {
      let apiUrl = '/getPosts';
      this.spinning != this.spinning
      this.$axios.get(apiUrl).then(data =>{
        this.spinning = this.spinning
        if(!!data && data.resultCode == "20000"){
          data.result.forEach((item, index) => {
              item.key = index;
            });
          this.articleList = data.result
        }else{
          this.$notify({
            message:'获取文章列表错误',
            type:'warning',
          })
        }
      }).catch((err)=>{
        this.spinning = this.spinning
        this.$notify({
            message:'获取文章列表接口错误',
            type:'warning',
          })
      })
    },

    //取消删除
    cancelFn(e) {
      console.log(e);
    },

    //编辑
    editFn(row, text) {
      // console.log(row, text);
      this.$router.push(
				{
					path:"/blog/addSingle",
					query:{"id":row.id}, 
				}
			)
    },
    
    //确认删除
    onDelete(row) {
      let apiUrl="/deleteSingle"
			this.spinning !=this.spinning
			let obj = {
				"user_id":this.user.id,
				"id":row.id
			}
			this.$axios.post(apiUrl,JSON.stringify(obj)).then((data)=>{
				this.spinning =this.spinning
				if(!!data && data.resultCode === "20000"){
					this.getPostList()
				}else{
					this.$notify({
					  message: '删除错误',
					  type: 'warning'
					});
				}
			}).catch((err)=>{
				this.spinning =this.spinning
				this.$notify({
				  message: '删除文章列表接口错误',
				  type: 'warning'
				});
			})
    },

  },

  mounted() {},
  created() {
    this.getPostList();
  }
};
</script>
