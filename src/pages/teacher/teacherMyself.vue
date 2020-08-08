<template>
    <div>
      <mt-header  fixed title="我的相关信息" style="line-height: 20px;background-color: #F56C6C">
      </mt-header>
      <div>
        <div style="float: left" @click="myDetail">
          <el-button type="text" >
            <el-avatar :size="80" > {{formLabelAlign.teaName}}</el-avatar>
          </el-button>

        </div>
        <br/>
        <div style="text-align: left" @click="myDetail">
            竞赛类型：{{formLabelAlign.CompName}}
        </div>
        <br/>
        <div style="text-align: left" @click="myDetail">
          教师ID:{{formLabelAlign.teaId}}
        </div>
        <br/>
        <el-divider></el-divider>
        <div style="text-align: center">
          <span>版本号:{{version}}</span>
          <br>
          <span>联系我们:</span>
          <br>
          <span>QQ:{{QQ}}</span>
          <br>
          <span>wechat:{{wechat}}</span>
          <br>
          <br>
          <span>介绍:{{introduce}}</span>
        </div>
      <el-divider></el-divider>
    </div>
      <el-button @click="login"
                 type="primary" style="width: 60%" round icon="el-icon-close">退出登录</el-button>
<!--      <el-button @click="register"-->
<!--                 type="primary" style="width: 40%" round icon="el-icon-edit">修改信息</el-button>-->
      <el-divider></el-divider>
    <Footer/>
    </div>
</template>

<script>
  import Footer from './teacherTabbar'
  import {mapState} from 'vuex'
    export default {
        name: "teacherMyself",
        components:{Footer},
      data () {
        return {
          formLabelAlign:{},
          version:'1.2',
          introduce:'初次开发系统，bug会有许多，如遇未知错误，请联系我们进行反馈，我们将尽快修复或优化相关细节，感谢您的支持',
          QQ:'12345678',
          wechat:'12345678'
        }
      },
      mounted(){
          this.formLabelAlign=this.$store.state.user.info
      },
      computed: {
        ...mapState(['user'])
      },
      methods:{
        login(){
          if(this.button1==='登录')
            this.$router.push('/login');
          else{
            this.$store.state.user={};
            sessionStorage.clear()
            // this.button1="登录"
            // this.button2='注册'
            // this.isShow=false
            this.$router.push('/login_tea');
          }
        },
        register(){
          if(this.button1==='登录')
            this.$router.push('/register_tea');
          else{

            this.$router.push({name:'editInfo',params:{isEdit:'1'}});
          }
        },
        myDetail() {
          this.$router.push('/teacher/editInfo')
        },
        pubComp(){
          this.$router.push('/teacher/pubComp')
        }
      }
    }
</script>

<style scoped>
  .nav{
    background-color:#545c64;
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
