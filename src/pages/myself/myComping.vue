<template>
  <div>
    <MyHeader/>
    <el-input
      placeholder="请输入竞赛名称"
      prefix-icon="el-icon-search"
      v-model="search" style="width: 100%"></el-input>
    <el-table ref="topicTable"
              :height="max"
              :max-height="max"
              :max-width="maxWidth"
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData.filter(data => !search
       || data.compName.toLowerCase().includes(search.toLowerCase())
        || data.CompStateName.toLowerCase().includes(search.toLowerCase()))"
    >

      <el-table-column
        prop="compName"
        label="竞赛名称"
        width="">
      </el-table-column>
      <el-table-column
      prop="teamName"
      label="参与团队"
      width="">
    </el-table-column>
      <el-table-column
        prop="TypeName"
        label="类型"
        width="60%">
      </el-table-column>
      <el-table-column
        prop="CompStateName"
        label="状态"
        width="80%">
      </el-table-column>

    </el-table>
    <el-button type="primary" style="width: 100%" @click="back" icon="el-icon-back">返回</el-button>
  </div>
</template>

<script>
  import MyHeader from './myHeader'

    export default {
        name: "myComping",
      components: {MyHeader},
      data(){
        return{
          search:'',
          tableData:[],
          max:document.documentElement.clientHeight-200,
          maxWidth:document.documentElement.clientWidth,
        }
      },
      mounted() {
        this.$axios.get('/users/myComp',{params:{status:2}}).then((res)=>{
          this.tableData=res.data.data
        })
      },
      methods:{
        handleCurrentChange(val) {
          if(val.CompStateName==="开始竞赛")
              this.$router.push({name:'myCompDetail',params:{CompId:val.CompId,CompState:'2'}})
          else {
            this.$router.push({name:'myCompDetail',params:{CompId:val.CompId,CompState:'1'}})
          }
        },
        getDetail(scope){
          let tableData=this.tableData.filter(data => !this.search || data.compName.toLowerCase().includes(this.search.toLowerCase())
            || data.teacher.toLowerCase().includes(this.search.toLowerCase())
            || data.CompStateName.toLowerCase().includes(this.search.toLowerCase()))
          this.$router.push({name:'myCompDetail',params:{CompId:tableData[scope.$index].CompId,CompState:'2'}})
        },
        back(){
          this.$router.push('/myself')
        }
      }
    }
</script>

<style scoped>

</style>
