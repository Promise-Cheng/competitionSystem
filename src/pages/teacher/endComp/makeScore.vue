<template>
  <div>
    <mt-header title="评分界面" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <div v-if="isEnd">
      <el-table ref="topicTable"
                :height="max"
                :max-height="max"
                :max-width="maxWidth"
                highlight-current-row
                @row-click="handleCurrentChange"
                :data="tableData.filter(data => !search || data.teamName.toLowerCase().includes(search.toLowerCase())
       || data.teamId.toLowerCase().includes(search.toLowerCase())
        || data.PassState.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="teamId"
          label="ID"
          width="40%">
        </el-table-column>
        <el-table-column
          prop="teamName"
          label="名称"
          width="">
        </el-table-column>

        <el-table-column
          prop="workState"
          label="提交状态"
          width="80%">
        </el-table-column>
        <el-table-column
          prop="workSum"
          label="提交数量"
          width="80%">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="总分"
          width="50%">
        </el-table-column>

      </el-table>
    </div>
    <div v-else>
      <el-table ref="topicTable"
                :height="max"
                :max-height="max"
                :max-width="maxWidth"
                highlight-current-row
                :data="tableData.filter(data => !search || data.teamName.toLowerCase().includes(search.toLowerCase())
       || data.teamId.toLowerCase().includes(search.toLowerCase())
        || data.PassState.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="teamId"
          label="ID"
          width="40%">
        </el-table-column>
        <el-table-column
          prop="teamName"
          label="名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="workState"
          label="提交状态"
          width="80%">
        </el-table-column>
        <el-table-column
          prop="workSum"
          label="提交数量"
          width="80%">
        </el-table-column>
      </el-table>
    </div>
    <el-button  type="primary" style="width: 30%" @click="back">返回</el-button>
  </div>
</template>

<script>
    export default {
        name: "makeScore",
      mixins:[],
      data(){
        return{
          CompStateName:'',
          search:'',
          tableData:[],
          max:document.documentElement.clientHeight-160,
          maxWidth:document.documentElement.clientWidth,
          state:'',
        }
      },
      computed:{
        isEnd(){
          return this.$store.state.compInfo.CompStateName==='提交成果关闭'
        }
      },
      mounted(){
          console.log(this.isEnd)
          this.$axios.get('/teacher/getPassedteam',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
            this.tableData=res.data.data
            console.log(this.tableData)
          }).catch((err)=>{
            console.log(err)
          })
      },
      methods:{
        handleCurrentChange(val){
          this.$router.replace({name:'score',params:{teamCompId:val.teamCompId}})
        },
          getDetail(scope){
            let tableData=this.tableData.filter(data => !this.search || data.teamName.toLowerCase().includes(this.search.toLowerCase())
              || data.teamId.toLowerCase().includes(this.search.toLowerCase())
              || data.PassState.toLowerCase().includes(this.search.toLowerCase()))
            this.$router.replace({name:'score',params:{teamCompId:tableData[scope.$index].teamCompId}})
          },
        back(){
          this.$router.back(-1)
        }
      },
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
