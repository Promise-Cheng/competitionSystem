
<template>
  <div>
    <mt-header title="预生成榜单" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
    <el-table
      :height="max"
      :max-height="max"
      :max-width="maxWidth"
      @row-click="edit"
      :data="tableData.slice((num-1)*pageSize,num*pageSize)"
    >
      <el-table-column
        prop="teamName"
        label="团队名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="Score"
        label="分数"
        width="50%">
      </el-table-column>
      <el-table-column
        prop="rank"
        label="排名"
        width="50%">
      </el-table-column>
      <el-table-column
        prop="teamMembersName"
        label="成员名称"
        width="">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      small
      layout="prev, pager, next"
      :pager-count="5"
      @current-change="handleCurrentChange1"
      :current-page.sync="num"
      :page-size="pageSize"
      :total="total">
    </el-pagination>

    <el-divider></el-divider>
    <el-button type="primary" style="width: 45%" @click="addTeam" icon="el-icon-plus">手动添加</el-button>
    <el-button type="primary" style="width: 45%" @click="upDate" icon="el-icon-loading">重新生成</el-button>
    </mt-loadmore>
  </div>
</template>

<script>
  export default {
    name: "perRank",
    data(){
      return{
        tableData:[],
        search:'',
        max: document.documentElement.clientHeight - 230,
        maxWidth: document.documentElement.clientWidth,
        num:1,
        pageSize:4,
        total:100,
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange1: function(currentPage){
        this.currentPage = currentPage;
      },
      edit(val){
      this.$router.replace({name:"editScore",params:{CompId:this.$route.params.CompId,CompListId:val.CompListId}})
      },
      getData(){
        this.$axios.get('/teacher/preGrade',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
          this.tableData=res.data.data
          this.total=this.tableData.length
        })
      },
      upDate(){
        const params=new URLSearchParams()
        params.append('CompId',this.$route.params.CompId)
        this.$axios.post('/teacher/resetComplist',params).then((res)=>{
          this.getData()
        })
      },
      addTeam(){
        this.$router.replace({name:"addCompList",params:{CompId:this.$route.params.CompId}})
      },
      back(){
        this.$router.replace({name:'manageTeam',params:{CompId:this.$store.state.compInfo.compId,manage:'1',
             CompStateName:this.$store.state.compInfo.CompStateName}})
      },
      loadTop(){
        setTimeout(()=>{
          this.getData();
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
    }
  }
</script>

<style scoped>
  .nav{
    line-height:20px;
    color:#ffd04b;
    background-color:#545c64;
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
