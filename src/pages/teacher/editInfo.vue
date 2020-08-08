<template>
  <div>
    <mt-header title="我的信息" fixed style="line-height: 20px">

      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      <div slot="right">
        <el-button icon="el-icon-edit" style="color: white;font-size: 20px" type="text"  @click="edit"></el-button>
      </div>
    </mt-header>


    <el-divider></el-divider>
    <el-form label-width="80px">
      <el-form-item label="教师ID:" >
        <el-input v-model="teaId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名: ">
        <el-input v-model="teaName" :disabled="!isShow"></el-input>
      </el-form-item>
      <el-form-item label=" 竞赛类型 :" >
        <el-input v-model="CompTypeName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="联系方式:">
        <el-input v-model="phoneNum" :disabled="!isShow"></el-input>
      </el-form-item>
      <el-form-item label="教师密码: ">
        <el-input v-model="password" :disabled="!isShow"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="update"
               type="primary" style="width: 40%" round icon="el-icon-back" v-show="isShow">修改</el-button>
    <el-button @click="back"
               type="primary" style="width: 40%" round icon="el-icon-back">返回</el-button>
  </div>
</template>

<script>
    export default {
        name: "editInfo",
      data(){
        return{
          teaId:'',
          teaName:'',
          phoneNum:'',
          password:'',
          isShow:false,
          CompTypeName:'',
          compTypes:[]
        }
      },
      computed:{
      },
      mounted() {

        const formLabelAlign =this.$store.state.user.info
        this.teaName=formLabelAlign.teaName
        this.teaId=formLabelAlign.teaId
        this.phoneNum=formLabelAlign.phoneNum
        this.password=formLabelAlign.password
        this.$axios.get('/teacher/CompTypes').then((res)=>{
          this.compTypes=res.data.data
          for(const index in this.compTypes){
            if(this.$store.state.user.info.CompTypeid===this.compTypes[index].CompTypeid){
              this.CompTypeName=this.compTypes[index].CompName
              break;
            }
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        edit(){
          this.isShow=!this.isShow;
        },
        update(){
           if(!this.teaName || !this.password ||  !this.phoneNum){
            this.$message.error('请填写完整的信息');
            return;
        }
        if(this.$store.state.user.info.phoneNum==this.phoneNum&&
          this.$store.state.user.info.teaName==this.teaName &&
          this.$store.state.user.info.password==this.password){
            this.$message.error('未做任何修改，');
                return;
          }
          const params= new URLSearchParams()
          params.append('phoneNum',this.phoneNum)
          params.append('teaName',this.teaName)
          params.append('password',this.password)
          this.$store.state.user.info.phoneNum=this.phoneNum
          this.$store.state.user.info.teaName=this.teaName
          this.$store.state.user.info.password=this.password
          this.$axios.post('/teacher/manageInfo',params).then((res)=>{
            if(res.data.result==='success')
              this.$message({
              message: '修改成功',
              type: 'success'
             });
            this.$router.push('/teacher/myself');
          }).catch((err)=>{
            console.log(err)
          })
        },
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
  }</style>
