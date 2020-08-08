<template>
  <div>
    <mt-header title="详情信息" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <el-form >
      <el-form-item label="团队名称：" style="text-align: left">
        {{teamName}}
      </el-form-item>
      <el-form-item label="团队介绍:" prop="desc" style="text-align: left">
        <el-input type="textarea" :value="teamIntro"></el-input>
      </el-form-item>
      <el-form-item label="团队成员:" prop="desc" style=" text-align: center">
        <el-table  style="width: 100%; text-align: center"
                   max-height="500"
                   max-width="100%"
                   :data='details.members' >
          <el-table-column
            prop="stuName"
            label="学生姓名"
            width="">
          </el-table-column>
          <el-table-column
            prop="stuNum"
            label="学生学号"
            width="">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>

<script>
  export default {
    name: "teamDetail",
    data(){
      return{
        details:{},
        teamName:'',
        teamIntro:'',
        isQueue:'0'
      }
    },
    mounted() {
      this.$axios.get('/users/manage/detail',{params:{teamId:this.$route.params.teamId}})
        .then((res)=>{
          if(res.data){
            this.details=res.data
            this.teamName=this.details.teamInfo.teamName
            this.teamIntro=this.details.teamInfo.teamIntro
          }
        }).catch((err)=>{
        console.log(err)
      })
    },
    methods:{
      back(){
        this.$router.replace('/teacher/checkTeam');
      }
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
  }
</style>
