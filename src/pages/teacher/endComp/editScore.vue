<template>
  <div>
    <mt-header  fixed title="修改分数" style="line-height: 20px;background-color: #409eff">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <mt-field label="分数" placeholder="请输入分数" type="number" v-model="Score"></mt-field>
    <mt-field label="注释" placeholder="请输入注释" type="textarea" v-model="tips"></mt-field>
    <el-divider></el-divider>
    <el-button type="primary" style="width: 45%" @click="upDate" >提交</el-button>
    <el-divider></el-divider>
  </div>
</template>

<script>
    export default {
        name: "editScore",
      data(){
          return{
            Score:'',
            tips:'',
          }
      },

      methods:{
          upDate(){
             if(!this.Score || !this.tips ){
            this.$message.error('请填写完整的信息(不能为空)');
            return;
          }
            const params=new URLSearchParams()
             params.append('Score',this.Score)
            params.append('tips',this.tips)
            params.append('CompListId',this.$route.params.CompListId)
            this.$axios.post("teacher/Changecomplist",params).then((res)=>{
              if(res.data.result==='success')
                this.$router.replace({name:"perRank",params:{CompId:this.$route.params.CompId}})
            }).catch((err)=>{

            })
          },
          back(){
            console.log(this.$store.state.compInfo.compId)
            this.$router.replace({name:'perRank',params:{CompId:this.$route.params.CompId}})
          }
      }
    }
</script>

<style scoped>

</style>
