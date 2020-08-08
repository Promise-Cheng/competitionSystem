<template>
  <div>
    <mt-header title="审批申请者" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <el-table ref="topicTable"
              style="width: 100%"
              max-height="500"
              max-width="100%"
              :data="tableData.filter(data => !search || data.compName.toLowerCase().includes(search.toLowerCase())
       || data.CompId.toLowerCase().includes(search.toLowerCase())
        || data.CompStateName.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="stuName"
        label="申请者名称"
        width="100%">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机"
        width="50%">
      </el-table-column>
      <el-table-column width="150%">
        <template slot="header" slot-scope="scope">
          审批
        </template>
        <template slot-scope="scope">
          <!--          <el-button type="text" @click="toogleExpand(scope)">查看详情</el-button>-->
          <el-button @click="getDetail(scope,'1') " icon="el-icon-check" size="mini"></el-button>
          <el-button @click="getDetail(scope,'0') " icon="el-icon-close" size="mini"></el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    export default {
      name: "teamApplyment",
      data(){
        return{
          search:'',
          tableData:[],
        }
      },
      mounted() {
        this.$axios.get('/users/teamApplyment',{params:{teamId:this.$route.params.teamId}}).then((res)=>{
          this.tableData=res.data.data
          console.log(1)
        }).catch((err)=>{
          console.log(err);
        })
      },
      methods:{
        back(){
          this.$router.replace({name:'myTeamDetail',params:{teamId:this.$route.params.teamId,Role:'队长',Passtatus:''}})
        },
        getData(){
          this.$axios.get('/users/teamApplyment',{params:{teamId:this.$route.params.teamId}}).then((res)=>{
            this.tableData=res.data.data
          }).catch((err)=>{
            console.log(err);
          })
        },
        getDetail(scope,index){
          const params=new URLSearchParams()
          params.append('teamId',this.$route.params.teamId)
          params.append('stuId',this.tableData[scope.$index].stuId)
          if(index==='1')
          params.append('passState','Pass')
          else{
            params.append('passState','reject')
          }
          this.$axios.post('/users/manageApply',params).then((res)=>{
            console.log(res)
            if(res.data.result==='success'){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              
              this.getData()
            }
            else if(res.data.result==='null'){
                this.$message.error('该成员已取消申请!');
                this.getData()
              }
          }).catch((err)=>{
            console.log(err)
          })
          
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
