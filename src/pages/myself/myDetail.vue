<template>
  <div>
    <mt-header title="我的信息" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      <div class="grid-content bg-purple-dark" slot="right">
        <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="color: white">
               <mt-button icon="more" slot="right"></mt-button>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改信息</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </mt-header>

    <el-divider></el-divider>
    <el-form label-width="80px" style="float: left">
      <el-form-item label="手机:">
        <el-input v-model="phone" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="邮箱: ">
        <el-input v-model="email":disabled="isEdit"> </el-input>
      </el-form-item>
      <el-form-item label=" QQ :">
        <el-input v-model="QQ":disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="stuName":disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="班级: ">
        <el-input v-model="class_":disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="学号:">
        <el-input v-model="stuNum":disabled="isEdit"></el-input>
      </el-form-item>
    </el-form>
    <div class="grid-content bg-purple-dark" v-if="!isEdit" style="line-height: 6">
      <el-button @click="register" type="primary" style="width: 40% " round
                 v-loading.fullscreen.lock="Loading">提交</el-button>
      <el-button @click="back" type="primary" style="width: 40% " round
                 v-loading.fullscreen.lock="Loading">返回</el-button>
    </div>
  </div>

</template>

<script>
    export default {
        name: "myDetail",
      data(){
          return{
            formLabelAlign:{},
            stuNum: '',
            stuName: '',
            class_: '',
            QQ: '',
            email: '',
            phone: '',
            isEdit: true,
            Loading:false
          }
      },
      mounted() {

        this.stuNum =this.$store.state.user.info.stuNum
        this.stuName =this.$store.state.user.info.stuName
        this.class_ =this.$store.state.user.info.class
        this.QQ =this.$store.state.user.info.QQ
        this.email =this.$store.state.user.info.email
        this.phone =this.$store.state.user.info.phoneNum
        if(this.$route.params.isEdit){
          this.isEdit=false;
        }
      },
      methods:{
          back(){
            this.$router.back(-1)
          },
        handleCommand(command) {
          switch (command) {
            case 'b': this.$router.push({name:'editPassword'}); break;
            case 'a': this.isEdit=!this.isEdit;
            }
          },
        register(){
          //判断是否有空值。
          if(!this.stuName  ||  !this.class_ ||  !this.QQ ||  !this.email ||  !this.phone || !this.stuNum){
              this.$message.error('请填写完整的信息');
              return;
          }
          if(this.$store.state.user.info.stuNum == this.stuNum &&
                this.$store.state.user.info.stuName  == this.stuName &&
                this.$store.state.user.info.password  == this.password &&
                this.$store.state.user.info.class  ==this.class_ &&
                this.$store.state.user.info.QQ   == this.QQ &&
                this.$store.state.user.info.email == this.email &&
                this.$store.state.user.info.phoneNum==this.phone){
                this.$message.error('未做任何修改，');
                return;
                }

          const params = new URLSearchParams();
          params.append('stuName', this.stuName);
          params.append('class', this.class_);
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
                this.$store.state.user.info.stuNum = this.stuNum
                this.$store.state.user.info.stuName  = this.stuName
                this.$store.state.user.info.password  = this.password
                this.$store.state.user.info.class  =this.class_
                this.$store.state.user.info.QQ   = this.QQ
                this.$store.state.user.info.email = this.email
                this.$store.state.user.info.phoneNum =this.phone
                this.$router.push('/myself');
              }
            })
            .catch( (err)=> {
              this.Loading = false;
              this.$message.error(""+err);
            })
        },
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
    background-color:#545c64;
    text-color:#ffd04b
  }
</style>
