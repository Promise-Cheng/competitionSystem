<template>
  <div>
    <mt-header title="题目详情" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
      <el-form style="text-align: left" label-position="left" inline class="demo-table-expand">
        <el-form-item label="题目介绍：">
          {{details.questionIntro}}
        </el-form-item>
        <br/>
        <el-form-item label="文件名称：" prop="desc">
          {{details.fileName}}
        </el-form-item>
        <el-form-item label="文件描述：">
          <el-input type="textarea" :value="details.fileDesc"></el-input>
        </el-form-item>
        <br/>
      </el-form>
      <el-divider></el-divider>
      <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
      <el-divider></el-divider>

  </div>
</template>

<script>
    export default {
        name: "compSubjectDetail",
        data(){
          return {
            details:{},
          }
        },
        mounted() {
          this.$axios.get('users/showTopic/detail',{params:{questionId:this.$route.params.questionId}}).then((res)=>{
            this.details=res.data.data
          })
        },
        methods:{
          back(){
            this.$router.push({name:'compSubject',params:{CompId:this.$route.params.CompId, CompState: this.$route.params.CompState}})
          }
        }
    }
</script>

<style scoped>

</style>
