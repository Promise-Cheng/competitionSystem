<template>
    <div>
      <mt-header  fixed title="添加成绩" style="line-height: 20px;background-color: #409eff">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-divider></el-divider>
      <mt-field label="团队名称" placeholder="请输入团队名称" v-model="teamName"></mt-field>
      <mt-field label="团队ID(可不填)" placeholder="请输入团队ID" type="number"  v-model="teamId"></mt-field>
      <mt-field label="团队成员" placeholder="请输入团队成员"  v-model="teamMembersName"></mt-field>
      <mt-field label="分数" placeholder="请输入分数" type="number" v-model="Score"></mt-field>
      <mt-field label="注释" placeholder="请输入注释" type="textarea" v-model="tips"></mt-field>
      <el-divider></el-divider>
      <el-button type="primary" style="width: 45%" @click="upDate" >提交</el-button>
      <el-divider></el-divider>
    </div>
</template>

<script>
    export default {
        name: "addComplist",
      data(){
          return{
            teamName:'',
            teamId:'',
            teamMembersName:'',
            Score:'',
            tips:'',
          }
      },
      methods:{
         upDate(){
           if(!this.teamName ||  !this.Score||  !this.teamMembersName){
            this.$message.error('请填写完整的信息(可不填团队id和注释)');
            return;
          }
           const params=new URLSearchParams()
           params.append('teamName',this.teamName)
           params.append('teamId',this.teamId)
           params.append('teamMembersName',this.teamMembersName)
           params.append('Score',this.Score)
           params.append('tips',this.tips)
           params.append('CompId',this.$route.params.CompId)
           this.$axios.post("/teacher/addComplist",params).then((res)=>{
             if(res.data.result==='success')
               this.$router.replace({name:"perRank",params:{CompId:this.$route.params.CompId}})
           }).catch((err)=>{

           })
         },
        back(){
           this.$router.replace({name:"perRank",params:{CompId:this.$route.params.CompId}})
        }
      }
    }
</script>

<style scoped>

</style>
