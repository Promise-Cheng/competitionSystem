<template>
    <div>
      <mt-header title="比赛成绩" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-divider></el-divider>
      <el-table
        style="width: 100%"
        max-height="500"
        max-width="100%"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
       || data.date.toLowerCase().includes(search.toLowerCase())
        || data.address.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="teamName"
          label="团队名称"
          width="150%">
        </el-table-column>
        <el-table-column
          prop="Score"
          label="团队分数"
          width="80%">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="团队排名"
          width="80%">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="teamMembersName"-->
<!--          label="团队成员名称"-->
<!--          width="150%">-->
<!--        </el-table-column>-->
      </el-table>
      <el-button type="primary" style="width: 100%" @click="back" icon="el-icon-back">返回</el-button>
    </div>
</template>

<script>
    export default {
        name: "queryResult",
      data(){
        return{
          tableData:[],
          search:'',
        }
      },
      mounted() {
        this.$axios.get('users/showResult',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
          this.tableData=res.data.data
        })
      },
      methods:{
          back(){
            if(this.$route.params.isTeather){
              this.$router.back(-1)
            }
            this.$router.push({name:'myCompDetail',params:{CompId:this.$route.params.CompId,CompState:'5'}})

          }
      }
    }
</script>

<style scoped>

</style>
