<template>
  <div>
        <h2 style="line-height: 3 ">信息修改</h2>
      <div class="el-main">
        <el-row class="el-row">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              学号:
              <el-input
                placeholder="请输入学号"
                prefix-icon="el-icon-user"
                v-model="stuNum" style="width: 85%">
              </el-input>
              <br/>
              密码:
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
                v-model="password" style="width: 85%">
              </el-input>
              <br/>
              姓名:
              <el-input
                placeholder="请输入姓名"
                prefix-icon="el-icon-s-custom"
                v-model="stuName" style="width: 85%">
              </el-input>
              <br/>
              班级:
              <el-input
                placeholder="请输入班级"
                prefix-icon="el-icon-bank-card"
                v-model="class_" style="width: 85%">
              </el-input>
              <br/>
              QQ :
              <el-input
                placeholder="请输入QQ"
                prefix-icon="el-icon-chat-dot-round"
                v-model="QQ" style="width: 85%">
              </el-input>
              <br/>
              邮箱:
              <el-input
                placeholder="请输入邮箱"
                prefix-icon="el-icon-message"
                type="email"
                v-model="email" style="width: 85%">
              </el-input>
              <br/>
              手机:
              <el-input
                placeholder="请输入手机号"
                prefix-icon="el-icon-phone"
                type="tel"
                v-model="phone" style="width: 85%">
              </el-input>
              <br/>
            </div>
          </el-col>
        </el-row>
        <el-row class="el-row">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
            </div>
          </el-col>
        </el-row>
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
  </div>
</template>

<script>
    export default {
        name: "update",
      data(){
        return{
          stuNum: '',
          stuName: '',
          password: '',
          class_: '',
          QQ: '',
          email: '',
          phone: '',
          Loading:false
        }
      },
      mounted(){
        this.stuNum =this.$store.state.user.info.stuNum
        this.stuName =this.$store.state.user.info.stuName
        this.password =this.$store.state.user.info.password
        this.class_ =this.$store.state.user.info.class
        this.QQ =this.$store.state.user.info.QQ
        this.email =this.$store.state.user.info.email
        this.phone =this.$store.state.user.info.phoneNum
      },
      methods:{
        register(){
          
          if(!this.stuName || !this.password ||  !this.class_ ||  !this.QQ ||  !this.email ||  !this.phone || !this.stuNum){
              this.$message.error('不能修改为空值');
              return;
          }
          const params = new URLSearchParams();
          params.append('stuName', this.stuName);
          params.append('password', this.password);
          params.append('class_', this.class_);
          params.append('QQ', this.QQ);
          params.append('email', this.email);
          params.append('phoneNum', this.phone);
          params.append('stuNum', this.stuNum);
          params.append('compNum', 123);
          params.append('passwordQue', 123);
          params.append('answer', 123);
          this.Loading = true;
          this.$axios.post('/users/information',params)
            .then((res)=>{
              if(res.data.result==='success'){
                this.Loading = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$store.state.user=''
                this.$router.push('/login');
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
  .el-row{
    line-height: 1.7;
  }
</style>
