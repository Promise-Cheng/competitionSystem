<template>
  <div>
    <mt-header title="详情信息" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
      <el-form >
        <el-form-item label="团队名称：" style="text-align: left">
          {{teamName}}
        </el-form-item>
        <el-form-item label="团队介绍:" prop="desc" style="text-align: left">
          <el-input type="textarea" :value="teamIntro"></el-input>
        </el-form-item>
        <el-form-item v-if="isQueue==='1'|| isQueue==='0'" label="团队成员:" prop="desc" style=" text-align: center">
          <el-table  style="width: 100%; text-align: center"
                     max-height="500"
                     max-width="100%"
                     :data='details.members' >
            <el-table-column
              prop="stuName"
              label="学生姓名"
              width="">
            </el-table-column>
            <el-table-column
              prop="stuNum"
              label="学生学号"
              width="">
            </el-table-column>
          </el-table>
          </el-form-item>
        </el-form>
    <el-divider></el-divider>
      <el-button v-if="isQueue==='1'" @click="checkStudent" type="primary" style="width: 40%">审批申请者</el-button>
      <el-button v-if="isQueue==='0'" @click="quit" type="primary" style="width: 40%">退出团队</el-button>
      <el-button v-if="isQueue==='-1'" @click="quit" type="primary" style="width: 40%">取消申请</el-button>
      <el-button @click="back" type="primary" style="width: 40%">返回</el-button>


  </div>
</template>

<script>
    export default {
        name: "myTeamDetail",
      data(){
        return{
          details:{},
          teamName:'',
          teamIntro:'',
          isQueue:'0'
        }
      },
      mounted() {
          if(this.$route.params.Role==='队长')
            this.isQueue='1';
          else if(this.$route.params.Passtatus==='已申请')
          {
            this.isQueue='-1';
          }
        this.$axios.get('/users/manage/detail',{params:{teamId:this.$route.params.teamId}})
          .then((res)=>{
            if(res.data){
              this.details=res.data
              this.teamName=this.details.teamInfo.teamName
              this.teamIntro=this.details.teamInfo.teamIntro
            }

          }).catch((err)=>{
          console.log(err)
        })
      },
      methods:{
        checkStudent(){
          this.$router.replace({name:'teamApplyment',params:{teamId:this.$route.params.teamId,}})
        },
          quit(){
            this.$messagebox.confirm('此操作将退出该团队, 是否继续?').then(action => {
              const params=new URLSearchParams()
              params.append('stuId',this.$store.state.user.user)
              params.append('teamId',this.$route.params.teamId)
              this.$axios.post('/users/quit_team',params).then(
                (res)=>{
                  if(res.data.result==='success') {
                    this.$message({
                      type: 'success',
                      message: '成功退出!'
                    });
                    this.$router.push('/team/myTeam')
                  }
                  else if(res.data.result==='isLeader'){
                    this.$message({
                      type: 'info',
                      message: '队长不能退出团队'
                    })
                  }
                }
              ).catch((err)=>{
                console.log(err)
              })
            }).catch(()=>{
                this.$message({
                       type: 'info',
                       message: '已取消'
                     });
            });
            // this.$confirm('此操作将退出该团队, 是否继续?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   customClass: 'message-logout'
            // }).then(() => {
            //   console.log('1111')
            //   const params=new URLSearchParams()
            //   params.append('stuId',this.$store.state.user.user)
            //   params.append('teamId',this.$route.params.teamId)
            //   this.$axios.post('/users/quit_team',params).then(
            //     (res)=>{
            //       if(res.data.result==='success') {
            //         this.$message({
            //           type: 'success',
            //           message: '成功退出!'
            //         });
            //         this.$router.push('/team/myTeam')
            //       }
            //     else if(res.data.result==='isLeader'){
            //         this.$message({
            //           type: 'info',
            //           message: '队长不能退出团队'
            //         })
            //       }
            //     }
            //   ).catch((err)=>{
            //     console.log(err)
            //   })
            // }).catch(() => {
            //   this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            //   });
            // });
        },
        back(){
          this.$router.back(-1)
        }
      }
    }
</script>

<style scoped>
  .nav{
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
