<template>
  <div>
    <mt-header title="新建团队" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <br/>
    <br/>

    <mt-field label="团队名称" placeholder="请输入团队名" v-model="teamName"></mt-field>
    <mt-field label="团队介绍" placeholder="自我介绍" v-model="teamIntro" type="textarea" rows="4"></mt-field>
      <el-row class="el-row">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="line-height: 6">
            <el-button @click="register" type="primary" style="width: 40% " round
                       v-loading.fullscreen.lock="Loading">提交</el-button>
            <el-button @click="back" type="primary" style="width: 40% " round
                       v-loading.fullscreen.lock="Loading">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "newTeam",
      data(){
        return{
          Loading:false,
          teamIntro:'',
          teamName:''
        }
      },
      methods:{
        register(){
          if( !this.teamName||!this.teamIntro){
              this.$message.error('请填写完整的信息');
              return;
          }
          const params = new URLSearchParams();
          params.append('teamName', this.teamName);
          params.append('teamIntro', this.teamIntro);
          this.Loading = true;
          this.$axios.post('/users/create_team',params)
            .then((res)=>{
              if(res.data.result==='success'){
                this.Loading = false;
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
                this.$router.push('/team/myTeam');
              }
              if(res.data.result==='exist'){
                this.Loading = false;
                this.$message.error('该团队名已存在');
              }
            })
            .catch( (err)=> {
              this.Loading = false;
              this.$message.error(""+err);
            })
        },
        back(){
          this.$router.back(-1);
        }
      }
    }
</script>

<style scoped>
  .el-main{
    border: aqua 2px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
</style>
