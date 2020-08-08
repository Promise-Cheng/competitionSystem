<template>
  <div>
        <h2  class="nav">欢迎注册</h2>
    <el-divider></el-divider>
    <div  class="el-main">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router>
        <el-menu-item index="/login" style="width: 50%">登录</el-menu-item>
        <el-menu-item index="/register" style="width: 50%">注册</el-menu-item>
      </el-menu>
      <el-row v-show="isStudent" class="el-row">
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
      <el-row v-show="!isStudent" class="el-row">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            学号:
            <el-input
              placeholder="请输入学工号"
              prefix-icon="el-icon-user"
              v-model="teaId" style="width: 85%">
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
              v-model="teaName" style="width: 85%">
            </el-input>
            <br/>
            手机:
            <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-phone"
              type="tel"
              v-model="phoneNum" style="width: 85%">
            </el-input>
            <br/>
            竞赛类型:
              <el-select v-model="compType"  placeholder="请选择竞赛类型" style="width: 80%">
                <el-option
                  v-for="item in compTypes"
                  :key="item.CompTypeid"
                  :label="item.CompName"
                  :value="item.CompTypeid">
                </el-option>
              </el-select>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="grid-content bg-purple-dark" style="line-height: 6">
        <el-button @click="register" type="primary" style="width: 60% " round
                   v-loading.fullscreen.lock="Loading">注册</el-button>
      </div>

      </div>

  </div>

</template>

<script>
  export default {
    data(){
      return{
        radio:'1',
        stuNum: '',
        stuName: '',
        password: '',
        class_: '',
        QQ: '',
        email: '',
        phone: '',
        teaId:'',
        teaName:'',
        phoneNum:'',
        Loading:false,
        compTypes:[],
        compType:''
      }
    },
    mounted(){


    },
    computed:{
      isStudent(){
        if(this.radio==='2'){
          this.$axios.get('/teacher/CompTypes').then((res)=>{
            this.compTypes=res.data.data
          }).catch((err)=>{
            console.log(err)
          })
        }
        return this.radio==='1'
      }
    },
    methods: {
      register() {
        //判断输入不为空。
        
        if(!this.stuName || !this.password ||  !this.class_ ||  !this.QQ ||  !this.email ||  !this.phone || !this.stuNum){
            this.$message.error('请填写完整的信息');
            return;
        }
        const params = new URLSearchParams();
        if (this.radio === '1') {
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
          this.$axios.post('/register', params)
            .then((res) => {
              if (res.data.result === 'success') {
                this.Loading = false;
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                this.$router.push('/login');
              }
              if(res.data.result === 'exist'){
                this.Loading = false;
                this.$message.error('该账户已存在');
              }

            })
            .catch((err) => {
              this.Loading = false;
              this.$message.error("" + err);
            })

        }
        else {
          this.Loading = true;
          params.append('teaId', this.teaId)
          params.append('password', this.password)
          params.append('phoneNum', this.phoneNum)
          params.append('teaName', this.teaName)
          params.append('CompTypeid',this.compType)
          this.$axios.post('/teacher/regist', params).then((res) => {
            if (res.data.result === 'success') {
              this.Loading = false;
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push('/login');
            }
            if(res.data.result === 'exist'){
              this.Loading = false;
              this.$message.error('该账户已存在');
            }

          }).catch((err) => {
            this.Loading = false;
            this.$message.error("" + err);
          })
        }
      }
    }
  }
</script>

<style>
  .el-main{
    border: aqua 2px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .nav{
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
  .el-row{
    line-height: 1.7;
  }
</style>
