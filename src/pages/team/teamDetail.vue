<template>
    <div>
      <mt-header title="团队详情" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-divider></el-divider>
      <h2>
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="团队名称：">
          {{details.teamName}}
          </el-form-item>
          <br/>
          <el-form-item label="团队介绍" prop="desc">
            <el-input type="textarea" :value="details.teamIntro"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-button @click="join" type="primary" style="width: 40%">申请加入</el-button>
        <el-button @click="back" type="primary" style="width: 40%">返回</el-button>
        <el-divider></el-divider>

      </h2>
    </div>
</template>

<script>
    export default {
        name: "teamDetail",
      data(){
          return{
            details:[],
            title:''
          }
      },
      mounted() {
          this.$axios.get('/teams/show/detail',{params:{teamId:this.$route.params.teamId}})
            .then((res)=>{
              this.details=res.data.data
            }).catch((err)=>{
              console.log(err)
          })
      },
      methods:{
          join(){
            const params=new URLSearchParams()
            params.append('teamId',this.$route.params.teamId)
            this.$axios.post('/users/applyToteam',params).then((res)=>{
              if(res.data.result==='success'){
                this.$message({
                  message: '申请成功',
                  type: 'success'
                });
                this.back()
              }
              else if(res.data.result==='exist'){
                this.$message.error('您已申请过加入该团队');
                this.back()
              }

            }).catch((err)=>{
              console.log(err)
            })
          },
        back(){
          this.$router.back(-1)
        }
      }

    }
</script>

<style scoped>
  .message-logout {
    width: 60%;
  }
  .nav{
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:20px; /* 距离窗口顶部距离 */
    left:10px; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
