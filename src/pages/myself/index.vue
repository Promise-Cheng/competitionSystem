<template>
  <div>
    <mt-header  fixed title="我的相关信息" style="line-height: 30px;background-color: #F56C6C">
    </mt-header>
    <div>
      <div style="float: left" @click="myDetail">
        <el-button type="text" >
          <el-avatar :size="80" > {{formLabelAlign.stuName}}</el-avatar>
        </el-button>

      </div>
      <br/>
      <div style="text-align: left" @click="myDetail">
        班级：{{formLabelAlign.class}}
      </div>
      <br/>
      <div style="text-align: left" @click="myDetail">
        学生ID:{{formLabelAlign.stuNum}}
      </div>
      <br/>
      <el-divider></el-divider>
    </div>
<!--    <div>-->
<!--      <h3>我的竞赛信息</h3>-->
<!--          <el-button icon="el-icon-tickets" @click="myComp">{{formLabelAlign.stuName}}</el-button>-->
<!--      <el-divider></el-divider>-->
<!--    </div>-->
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
        <el-button @click="login"
                   type="primary" style="width: 60%" round icon="el-icon-close">{{button1}}</el-button>
        <el-divider></el-divider>


      <Footer1/>
  </div>

</template>

<script>
  import Footer1 from '../../components/tabbar'
  import {mapState} from 'vuex'
    export default {
        name: "index",
      components:{Footer1},
      data () {
        return {
          button1:'登录',
          button2:'注册',
          isShow:false,
          index:'1',
          search:'',
          tableData:[],
          formLabelAlign:{},
          version:'1.2',
          introduce:'初次开发系统，bug会有许多，如遇未知错误，请联系我们进行反馈，我们将尽快修复或优化相关细节，感谢您的支持',
          QQ:'12345678',
          wechat:'12345678'
        }
      },
      mounted(){
          if(!this.$store.state.user)
          {
            this.isShow=false
          }
          else{
            this.formLabelAlign=this.$store.state.user.info
            this.button1="退出登录"
            this.button2='修改信息'
            this.isShow=true
          }
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
            sessionStorage.clear();
            // this.button1="登录"
            // this.button2='注册'
            // this.isShow=false
            this.$router.push('/login');
          }
        },
        register(){
          if(this.button1==='登录')
            this.$router.push('/register');
          else{
            this.$router.push({name:'myDetail',params:{isEdit:'1'}});
          }
        },
        myDetail() {
          this.$router.push('/myself/myDetail')
        },
        myComp(){
          this.$router.push('/myself/start')
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
