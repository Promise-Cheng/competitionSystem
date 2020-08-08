<template>
  <div>
    <mt-header title="评分界面" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <div><h2>作品列表</h2></div>
    <el-divider></el-divider>
    <el-table ref="topicTable"
              style="width: 100%"
              max-height="350"
              max-width="100%"
              :data="tableData.filter(data => !search || data.teamName.toLowerCase().includes(search.toLowerCase())
       || data.teamId.toLowerCase().includes(search.toLowerCase())
        || data.PassState.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="workId"
        label="作品ID"
        width="65%">
      </el-table-column>
      <el-table-column
        prop="workName"
        label="作品名"
        width="65%">
      </el-table-column>

      <el-table-column
        prop="Score"
        label="作品成绩"
        width="80%">
      </el-table-column>
      <el-table-column  width="100%">
        <template slot="header">
          修改成绩
        </template>
        <template slot-scope="scope">
          <el-button @click="getDetail(scope)" icon="el-icon-info" type="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>

    <div><h2>总分：{{totalScore}}</h2></div>
  </div>
</template>

<script>
    export default {
        name: "score",
      data(){
        return{
          CompStateName:'',
          search:'',
          tableData:[],
          state:'',
          totalScore:0,
          Score:0,
          dialogVisible: false,

        }
      },
      mounted(){
          this.$axios.get('/teacher/getWorks',{params:{teamCompId:this.$route.params.teamCompId}}).then((res)=>{
            this.tableData=res.data.data
            this.totalScore=res.data.totalScore
          }).catch((err)=>{
            console.log(err)
          })
      },
      methods:{
        getDetail(scope){
          this.$messagebox.prompt('请输入修改后的分数').then(({ value, action }) => {
            const params=new URLSearchParams()
            if(!value){
              this.$message.error('请输入分数');
            }
            params.append('teamCompId',this.$route.params.teamCompId)
            params.append('workId',this.tableData[scope.$index].workId)
            params.append('Score',value)
            this.$axios.post('/teacher/GiveScore',params).then((res)=>{
              if(res.data.result==="success")
              {
                this.getData()
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }
            }).catch((res)=>{
              console.log(res)
            })
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        getData(){
          this.$axios.get('/teacher/getWorks',{params:{teamCompId:this.$route.params.teamCompId}}).then((res)=>{
            this.tableData=res.data.data
            this.totalScore=res.data.totalScore
          }).catch((err)=>{
            console.log(err)
          })
        },
        back(){
          console.log(this.$store.state.compInfo.compId)
          this.$router.replace({name:'makeScore',params:{CompId:this.$store.state.compInfo.compId}})
        }
      },
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
