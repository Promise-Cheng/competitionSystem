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
    name: "ing",
    components:{Footer,Header1},
    data() {
      return {
        search:'',
        tableData:[],
        max:document.documentElement.clientHeight-180,
        maxWidth:document.documentElement.clientWidth,
      }
    },
    mounted(){
      const params = new URLSearchParams();
      const status = -1;
      params.append('status',status);
      this.$axios.get('/Competitions/show',{params:{status:2}}).then((res)=>{
        this.tableData=res.data.data;
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{
      handleCurrentChange(val) {
        this.$router.push({
          name: 'detail', params: {
            CompId: val.CompId
            , compStateID: val.compStateID
          }
        })
      },
      getDetail(scope){
        let tableData=this.tableData.filter(data => !this.search || data.compName.toLowerCase().includes(this.search.toLowerCase())
          // || data.teacher.toLowerCase().includes(this.search.toLowerCase())
          || data.CompStateName.toLowerCase().includes(this.search.toLowerCase()))
        this.$router.push({name:'detail',params:{CompId:tableData[scope.$index].CompId}})
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
