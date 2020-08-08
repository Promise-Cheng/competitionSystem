<template>
    <div>
      <mt-header title="详情信息" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>

      <el-divider></el-divider>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item >
          竞赛名称:{{ details.compName }}
        </el-form-item>
        <br/>
        <el-form-item >
          竞赛类型:{{ details.CompName }}
        </el-form-item>
        <br/>
        <el-form-item >
          开始时间:{{ details.startTime}}
        </el-form-item>
        <br/>
        <el-form-item >
          结束时间:{{ details.endTime}}
        </el-form-item>
        <br/>
        <el-form-item >
          人数限制:{{ details.personNum }}
        </el-form-item>
        <br/>
        <el-form-item >
          指导老师:{{details.teacher }}
        </el-form-item>
        <br/>
        <el-form-item >
          竞赛描述:{{ details.compIntro}}
        </el-form-item>
        <br/>
      </el-form>
      <div v-if="!isSignUp">
        <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
      </div>
      <div v-else>
        <el-button @click="signUp" type="primary" style="width: 40%">报名</el-button>
        <el-button @click="back" type="primary" style="width: 40%">返回</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
      data(){
          return{
            details:[]
        }
      },
      computed:{
        isSignUp(){
          return this.$route.params.compStateName==="开始报名"
        }
      },
      mounted(){
         this.$axios.get('/Competitions/detail',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
             this.details=res.data.data
        }).catch((err)=>{
           console.log(err);
        })
      },
      methods:{
        signUp(){
          if(this.details.personNum===1){
            const params=new URLSearchParams()
            params.append('CompId',this.$route.params.CompId)
            this.$messagebox.confirm('该竞赛为个人竞赛，是否直接报名？','提示').then(()=>{
              this.$axios.post('users/PapplyToComp',params).then(
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
            }).catch(()=>{

            })
          }
          else
            this.$router.replace({name:'signUp',params:{CompId:this.$route.params.CompId,
                personNum:this.details.personNum,compStateName:this.$route.params.compStateName}})
        },
        back(){
          if(this.$route.params.isHome==='1'){
            this.$router.back(-1)
            return;
          }
          let select='';
          if(this.isSignUp){
            select='start'
          }
          else if(this.$route.params.compStateName==='截至报名'||this.$route.params.compStateName==='开始竞赛'){
            select='ing'
          }
          else{
            select='end'
          }
          this.$router.replace({name:'start',params:{selected:select}})
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
