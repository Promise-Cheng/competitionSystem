<template>
  <div>
    <mt-header title="详情信息" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-form >
      <el-form-item label="团队名称：" style="text-align: left">
        {{teamName}}
      </el-form-item>
      <el-form-item label="团队介绍:" prop="desc" style="text-align: left">
        <el-input type="textarea" :value="teamIntro"></el-input>
      </el-form-item>
      <el-form-item label="团队成员:" prop="desc" style=" text-align: center">
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
    <el-button v-if="isQueue" @click="IsPass('1')" type="primary" style="width: 30%">通过</el-button>
    <el-button v-if="isQueue" @click="IsPass('0')" type="primary" style="width: 30%">拒绝</el-button>
    <el-button @click="back" type="primary" style="width: 30%">返回</el-button>


  </div>
</template>

<script>
    export default {
        name: "manageTeamDetail",
      data(){
        return{
          details:{},
          teamName:'',
          teamIntro:'',
          isQueue:true
        }
      },
      mounted() {
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
          back(){
            this.$router.replace({name:'manageTeam',params:{CompId:this.$store.state.compInfo.compId,manage:'1',
             CompStateName:this.$store.state.compInfo.CompStateName}})
          },
          IsPass(is){
            const params=new URLSearchParams()
            params.append('teamCompId',this.$route.params.teamCompId)
            if(is==='1'){
              params.append('passState','Pass')
            }
            else{
              params.append('passState','reject')
            }
            this.$axios.post('/teacher/Passteam',params).then((res)=>{
              if(res.data.result==='success')
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
               this.$router.replace({name:'manageTeam',params:{CompId:this.$store.state.compInfo.compId,manage:'1',
             CompStateName:this.$store.state.compInfo.CompStateName}})
            }).catch((err)=>{
              console.log(err)
            })
          }
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
