<template>
    <div>
      <mt-header title="选择团队" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-divider></el-divider>
      <span>竞赛人数限制：{{this.$route.params.personNum}}</span>
      <el-divider></el-divider>
      <el-table
        max-height="350"
        max-width="100%"
        :data="tableData.filter(data => !search|| data.teamName.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="teamId"
          label="团队ID"
          width="70%">
        </el-table-column>
        <el-table-column
          prop="teamName"
          label="团队名称"
          width="80%">
        </el-table-column>
        <el-table-column
          prop="sum"
          label="团队人数"
          width="80%">
        </el-table-column>
        <el-table-column  width="100%">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="SignUp(scope)" size="mini">报名</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
      data(){
          return{
            search:'',
            tableData:[]
          }
      },
      mounted() {
          this.$axios.get('/users/myteams')
            .then((res)=>{
              if(res.data.data){
                this.tableData=res.data.data
              }

            else{
                this.$message('您不是任何团队队长，不能报名，请联系团队队长报名竞赛');
              }
          })
      },
      methods:{
          SignUp(scope){
            let tableData=this.tableData.filter(data => !this.search
              || data.teamName.toLowerCase().includes(this.search.toLowerCase()))
            const params=new URLSearchParams();
            params.append('teamId',tableData[scope.$index].teamId)
            params.append('CompId',this.$route.params.CompId)
            this.$axios.post('users/myteams/applyToComp',params).then(
              (res)=>{
                if(res.data.result==='success'){
                  this.$message({
                    message: '报名成功',
                    type: 'success'
                  });
                  this.$router.push('/competition/start')
                }
                else if(res.data.result==='exist'){
                  this.$message.error('该队伍已报名该竞赛');
                }
                else{
                  this.$message.error('人数超过限制');
                }
              }
            ).catch((err)=>{
              console.log(err)
            })
          },
        back(){
          this.$router.replace({name:'detail',params:{CompId:this.$route.params.CompId
              ,compStateName:this.$route.params.CompStateName}})
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
