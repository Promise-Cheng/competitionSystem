<template>
  <div>
        <mt-header fixed title="账号管理">
          <mt-button icon="back" slot="left" @click="back">返回</mt-button>
        </mt-header>
      <el-table ref="topicTable"
                          :height="max"
                          :max-height="max"
                          :max-width="maxWidth"
                          highlight-current-row
                          :data="tableData"
                >
        <el-table-column
          prop="type"
          label="类型"
          width="50%">
        </el-table-column>
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
          label="操作"
          width="120%">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">重置</el-button>
            <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
  </div>
</template>

<script>

  export default {
    name: "userInfo",
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
      handleClick1(row){
        const params = new URLSearchParams();
        params.append('id', row.num);
        params.append('type', row.type);
         this.$axios.post('/teacher/deleteUser',params).then((res) =>{
          
          this.$message({
                      type: 'success',
                      message: '删除成功!'
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
      },
      back(){
            this.$router.back(-1)
          },
    },
    mounted() {
        this.getData();
      },
  }
</script>

<style scoped>

</style>

