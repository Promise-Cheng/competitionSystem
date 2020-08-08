<template>
    <div>
      <mt-header :title="title" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-input
        placeholder="请输入竞赛名称"
        prefix-icon="el-icon-search"
        v-model="search" style="width: 100%"></el-input>
      <el-table
        highlight-current-row
        @row-click="handleCurrentChange"
        :max-height="max"
        :max-width="maxWidth"
        :data="tableData.filter(data => !search || data.teamName.toLowerCase().includes(search.toLowerCase())
       || data.stuName.toLowerCase().includes(search.toLowerCase())
        || data.stuNum.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="teamName"
          label="团队名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="队长名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="stuNum"
          label="队长学号"
          width="">
        </el-table-column>

      </el-table>
    </div>
</template>

<script>
    export default {
      name: "teamSearch",
      data(){
        return{
          tableData:[],
          search: '',
          title:'',
          max:document.documentElement.clientHeight-110,
          maxWidth:document.documentElement.clientWidth,
        }
      },
      mounted(){
      this.title=this.$route.params.search+"的查询结果"
        this.$axios.get('/teams/Search',{params:{content:this.$route.params.search}}).then((res)=>{
          this.tableData=res.data.data
        }).catch((err)=>{
          console.log(err);
        })
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        handleCurrentChange(val) {
          this.$router.push({name:'teamDetail',params:{teamId:val.teamId}})
        },
        Detail(index){
          let tableData=[]
          tableData= this.tableData.filter(data => !this.search || data.teamName.toLowerCase().includes(this.search.toLowerCase())
            || data.stuName.toLowerCase().includes(this.search.toLowerCase()) || data.stuNum.toLowerCase().includes(this.search.toLowerCase()))
          this.$router.push({name:'teamDetail',params:{'teamId':tableData[index].teamId}})
        },
      }
    }
</script>

<style scoped>
  .nav{
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:30px; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
   /* z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
