<template>
  <div>
    <el-input
    placeholder="请输入搜索内容"
    prefix-icon="el-icon-search"
    v-model="search" style="width: 70%"></el-input>
    <el-button icon="el-icon-search" @click="ToSearch" style="width: 20%"></el-button>
    <div class="grid-content bg-purple-dark">
      <el-radio v-model="radio" label="1">团队查找</el-radio>
      <el-radio v-model="radio" label="2">竞赛查找</el-radio>
    </div>
  </div>

</template>

<script>
    export default {
        name: "search",
      data(){
        return{
          radio:'1',
          search:''
        }
      },
      methods:{
        ToSearch(){
          if(this.radio==='1'){
            this.$router.push({name:'teamSearch',params:{search:this.search}});
          }
          else{
            this.$router.push({name:'compSearch',params:{search:this.search}});
          }
        }
      }

    }
</script>

<style scoped>

</style>
