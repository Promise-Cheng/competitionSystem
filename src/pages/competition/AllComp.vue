<template>
  <div>
    <Header1/>
    <el-input
      placeholder="请输入竞赛名称"
      prefix-icon="el-icon-search"
      v-model="search" style="width: 100%"></el-input>
    <el-table ref="topicTable"
              :max-height="max"
              :max-width="maxWidth"
              highlight-current-row
              @current-change="handleCurrentChange"
              :data="tableData.filter(data => !search
       || data.compName.toLowerCase().includes(search.toLowerCase())
        || data.CompStateName.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="CompId"
        label="ID"
        width="40%">
      </el-table-column>

      <el-table-column
        prop="compName"
        label="竞赛名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="CompStateName"
        label="类型"
        sortable
        width="80%">
      </el-table-column>
      <el-table-column
        prop="CompStateName"
        sortable
        label="状态"
        width="80%">
      </el-table-column>

    </el-table>
    <Footer/>
  </div>
</template>

<script>
  import Footer from '../../components/tabbar'
  import Header1 from './indexHead'
  export default {
    name: "AllComp",
    components:{Footer,Header1},
    data() {
      return {
        search:'',
        tableData:[],
        details:[],
        max:document.documentElement.clientHeight-200,
        maxWidth:document.documentElement.clientWidth,
      }
    },
    mounted(){
      this.$axios.get('/Competitions/show',{params:{status:0}}).then((res)=>{
        this.tableData=res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods: {
      handleCurrentChange(val) {
        this.$router.push({
          name: 'detail', params: {
            CompId: val.CompId
            , compStateID: val.compStateID
          }
        })
      },
      getDetail(scope) {
        let tableData = this.tableData.filter(data => !this.search || data.compName.toLowerCase().includes(this.search.toLowerCase())
          || data.CompStateName.toLowerCase().includes(this.search.toLowerCase()))
        this.$router.push({
          name: 'detail',
          params: {CompId: tableData[scope.$index].CompId, compStateID: this.tableData[scope.$index].compStateID}
        })
      },
    }
  }
</script>

<style scoped>

</style>

