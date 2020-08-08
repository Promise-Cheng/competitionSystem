<template>
    <div>
      <div class="nav"><h2>竞赛题目管理</h2></div>
      <el-table
        style="width: 100%"
        max-height="500"
        max-width="100%"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
       || data.date.toLowerCase().includes(search.toLowerCase())
        || data.address.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="compName"
          label="题号"
          width="50%">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="题目ID"
          width="70%">
        </el-table-column>
        <el-table-column
          prop="CompStateName"
          label="题目"
          width="70%">
        </el-table-column>
        <el-table-column
          prop="CompStateName"
          label="附加文件"
          width="80%">
        </el-table-column>
        <el-table-column fixed="right"  width="50%">
          <template slot="header" slot-scope="scope">
            详情
          </template>
          <template slot-scope="scope">
            <el-button @click="getDetail(scope)" icon="el-icon-info">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right"  width="50%">
          <template slot="header" slot-scope="scope">
            修改
          </template>
          <template slot-scope="scope">
            <el-button @click="getDetail(scope)" icon="el-icon-info">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right"  width="50%">
          <template slot="header" slot-scope="scope">
            删除
          </template>
          <template slot-scope="scope">
            <el-button @click="getDetail(scope)" icon="el-icon-info">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "informationEdit",
      data(){
          return{
            tableData:[],
            search:''
          }
      }
    }
</script>

<style scoped>
  .nav{
    line-height:20px;
    color:#ffd04b;
    background-color:#545c64;
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
