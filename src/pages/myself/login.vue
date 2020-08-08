<template>
  <div>
        <h2 style="line-height: 3 ">欢迎登录</h2>
    <el-divider></el-divider>
    <div class="el-main">

      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router>
        <el-menu-item index="/login" style="width: 50%">登录</el-menu-item>
        <el-menu-item index="/register" style="width: 50%">注册</el-menu-item>
      </el-menu>

        <el-row class="el-row">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-input
                placeholder="请输入学号"
                prefix-icon="el-icon-user"
                v-model="stuId" style="width: 85%">
              </el-input>
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
                v-model="password" style="width: 85%">
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="el-row">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-button @click="login" v-loading.fullscreen.lock="Loading"
                         type="primary" style="width: 60%" round>登录</el-button>
            </div>
          </el-col>
        </el-row>

    </div>
  </div>

</template>

<script>
    export default {
        name: "login",
      data () {
        return {
          radio: '1',
          stuId: '',
          password: '',
          activeIndex: '1',
          Loading:false
        };
      },
      methods:{
        login(){
          const params = new URLSearchParams();
          if(this.radio==='1'){
            params.append('stuNum', this.stuId);
          }
          else{
            params.append('teaId', this.stuId);       //你要传给后台的参数值 key/value
          }
          params.append('password', this.password);
          this.Loading = true;
          if(this.radio==='1'){
            this.$axios.post('/login',params).then((res) =>{
              if (res){
                if(res.data.result==='success'){
                  this.Loading = false;
                  sessionStorage.setItem('ms_username',res.data.info);
                  this.$store.state.user={user:this.stuId,info:res.data.info,password:this.password}
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  this.$router.push('/home')
                }
                else{
                  this.Loading = false;
                  this.$message.error('用户名或密码错误');
                }
              }
            }).catch( (err)=>{
              this.Loading = false;
              this.$message.error(""+err);
            })
          }
          else{
            this.$axios.post('/teacher/login',
              params
            ).then((res) =>{
              if (res){
                if(res.data.result==='success'){
                  this.Loading = false;
                  this.$store.state.user={user:this.stuId,info:res.data.data}
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  this.$router.push('/teacher/home')
                }
                else{
                  this.Loading = false;
                  this.$message.error('用户名或密码错误');
                }
              }
            }).catch( (err)=>{
              this.Loading = false;
              this.$message.error(""+err);
            })
          }

        },
      }
    }
</script>

<style>
  .el-main{
    border: aqua 2px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .el-row{
    line-height: 1.7;
  }
</style>
