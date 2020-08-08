<template>
  <div>
    <MyHeader/>
    <el-table
      style="width: 100%"
      max-height="400"
      max-width="100%"
      :data="tableData.filter(data => !search || data.compName.toLowerCase().includes(search.toLowerCase())
       || data.teacher.toLowerCase().includes(search.toLowerCase())
        || data.CompStateName.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column type="expand" width="30%">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item >
              竞赛名称:{{ props.row.compName}}
            </el-form-item>
            <br/>
            <el-form-item >
              竞赛类型:{{ props.row.compStateID }}
            </el-form-item>
            <br/>
            <el-form-item >
              开始时间:{{ props.row.name }}
            </el-form-item>
            <br/>
            <el-form-item >
              结束时间:{{ props.row.name }}
            </el-form-item>
            <br/>
            <el-form-item >
              人数限制:{{ props.row.name }}
            </el-form-item>
            <br/>
            <el-form-item >
              指导老师:{{ props.row.teacher }}
            </el-form-item>
            <br/>
            <el-form-item >
              竞赛描述:{{ props.row.name }}
            </el-form-item>
            <br/>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="compName"
        label="竞赛名称"
        width="100%">
      </el-table-column>
      <el-table-column
        prop="teacher"
        label="指导老师"
        width="100%">
      </el-table-column>
      <el-table-column
        prop="CompStateName"
        label="竞赛状态"
        width="100%">
      </el-table-column>
      <el-table-column fixed="right"  width="100%">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="getDetail(scope)">详情</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-button type="primary" style="width: 100%" @click="back">返回</el-button>
  </div>
</template>

<script>
  import MyHeader from './myHeader'

  export default {
    name: "myComp",
    components: {MyHeader},
    data(){
      return{
        search:'',
        tableData:[]
      }
    },
    mounted() {
      this.$axios.get('/users/myComp',{params:{status:3}}).then((res)=>{
        this.tableData=res.data.data
      })
    },
    methods:{
      getDetail(scope){

      },
      back(){
        this.$router.push('/myself')
      }
    }
  }
</script>

<style scoped>

</style>
