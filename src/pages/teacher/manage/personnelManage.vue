<template>
  <div>
    <mt-header title="批量处理" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <div><h2>申请团队名单</h2></div>
    <el-divider></el-divider>
    <el-table ref="topicTable"
              :height="max"
              :max-height="max"
              :max-width="maxWidth"
              highlight-current-row
              @row-click="test"
              :data="tableData.filter(data => !search || data.teamName.toLowerCase().includes(search.toLowerCase())
       || data.teamId.toLowerCase().includes(search.toLowerCase())
        || data.PassState.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        type="selection"
        width="45%">
      </el-table-column>
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
<!--      <el-table-column-->
<!--        prop="PassState"-->
<!--        label="申请时间"-->
<!--        width="100%">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="PassState"
        label="状态"
        width="80%">
      </el-table-column>
    </el-table>
    <el-button type="primary" style="width: 30%" @click="IsPass('1')">通过</el-button>
    <el-button  type="primary" style="width: 30%" @click="IsPass(0)">拒绝</el-button>
    <el-button  type="primary" style="width: 30%" @click="back">返回</el-button>
  </div>

</template>

<script>
    export default {
        name: "personnelManage",
      data(){
        return{
          CompStateName:'',
          search:'',
          tableData:[],
          state:'',
          max:document.documentElement.clientHeight-220,
          maxWidth:document.documentElement.clientWidth,
        }
      },
      mounted(){
        this.getData()
      },
      methods:{
          test(row){
            const rows=this.$refs.topicTable.selection
            let selected = rows.length && rows.indexOf(row) !== -1
            this.$nextTick(function () {this.$refs.topicTable.toggleRowSelection(row,!selected);}.bind(this));
          },
          getData(){
            this.$axios.get('/teacher/manageTeam',{params:{CompId:this.$route.params.CompId}})
              .then((res)=>{
                this.tableData=res.data.data
              }).catch((err)=>{
              console.log(err)
            })
          },
        IsPass(is){
          let teamCompId=[]
          for(const index in this.$refs.topicTable.selection){
            teamCompId.push(this.$refs.topicTable.selection[index].teamCompId)
          }
          const params=new URLSearchParams()
          params.append('teamCompId',teamCompId)
          if(is==='1'){
            params.append('passState','Pass')
          }
          else{
            params.append('passState','reject')
          }
          this.$axios.post('/teacher/Passteams',params).then((res)=>{
            if(res.data.result==='success')
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            this.getData();
          }).catch((err)=>{
            console.log(err)
          })
        },
          click1(){
            let teamCompIds=[]
            for(const index in this.$refs.topicTable.selection){
              teamCompIds.push(this.$refs.topicTable.selection[index].teamCompId)
            }
            console.log(teamCompIds)
            console.log(this.$refs.topicTable.selection)
          },
          back(){
             this.$router.replace({name:'manageTeam',params:{CompId:this.$store.state.compInfo.compId,manage:'1',
             CompStateName:this.$store.state.compInfo.CompStateName}})
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
