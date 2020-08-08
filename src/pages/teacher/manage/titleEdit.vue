<template>
  <div>
    <mt-header title="竞赛题目查看" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <el-table
      style="width: 100%"
      max-height="500"
      max-width="100%"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
       || data.date.toLowerCase().includes(search.toLowerCase())
        || data.address.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="questionNum"
        label="题号"
        width="50%">
      </el-table-column>
      <el-table-column
        prop="questionID"
        label="题目ID"
        width="">
      </el-table-column>
      <el-table-column
        prop="questionName"
        label="题目"
        width="">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="CompStateName"-->
<!--        label="附加文件"-->
<!--        width="80%">-->
<!--      </el-table-column>-->
<!--      <el-table-column fixed="right"  width="50%">-->
<!--        <template slot="header" slot-scope="scope">-->
<!--          详情-->
<!--        </template>-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="getDetail(scope)" icon="el-icon-info">详情</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column fixed="right"  width="50%">-->
<!--        <template slot="header" slot-scope="scope">-->
<!--          修改-->
<!--        </template>-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="getDetail(scope)" icon="el-icon-info">修改</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column fixed="right"  width="50%">-->
<!--        <template slot="header" slot-scope="scope">-->
<!--          删除-->
<!--        </template>-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="getDetail(scope)" icon="el-icon-info">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-divider></el-divider>
    <div>请到网页版对题目进行相关操作</div>
  </div>
</template>

<script>
  export default {
    name: "titleEdit",
    data(){
      return{
        tableData:[],
        search:''
      }
    },
    mounted(){
      this.$axios.get('/teacher/Topics',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
        this.tableData=res.data.data
      })
    },
    methods:{
      back(){
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped>
  .nav{
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:20px; /* 距离窗口顶部距离 */
    left:10px; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
