<template>
  <div>
        <mt-header fixed title="竞赛管理"></mt-header>
      <el-table ref="topicTable"
                          :height="max"
                          :max-height="max"
                          :max-width="maxWidth"
                          highlight-current-row
                          :data="tableData"
                >
        <el-table-column
          prop="num"
          label="账号"
          width="">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="60%">
        </el-table-column>
        <el-table-column
          label="操作"
          width="80%">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">重置密码</el-button>
          </template>
        </el-table-column>
        </el-table>
  </div>
</template>

<script>

  export default {
    name: "competition",
    data() {
      return {
          selected:"",
          columnName:'',
          columnLable:'',
        tableData:[],
        details:[],
        max:document.documentElement.clientHeight,
        maxWidth:document.documentElement.clientWidth,
      }
    },
    methods:{
      handleClick(row){
        const params = new URLSearchParams();
        params.append('id', row.num);
        params.append('type', row.type);
         this.$axios.post('/teacher/initializePassword',params).then((res) =>{
          
          this.$message({
                      type: 'success',
                      message: '重置成功!'
                    });
                    this.getData();
         });
      },
      getData(){
        this.$axios.get('/teacher/getUserInfo').then((res)=>{
        this.tableData=res.data
        
      }).catch((err)=>{
        console.log(err);
      })
      }
    },
    mounted() {
        this.getData();
      },
  }
</script>

<style scoped>

</style>

