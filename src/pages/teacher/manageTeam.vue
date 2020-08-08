<template>
  <div class="nav">
    <mt-header title="流程管理" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <div>
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
    <el-divider></el-divider>
    <div style="text-align: left">竞赛状态：{{this.$store.state.compInfo.CompStateName}}</div>
      <el-collapse @change="handleChange">
        <el-collapse-item title="详情信息" name="1">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item >
              竞赛名称:{{ details.compName }}
            </el-form-item>
            <br/>
            <el-form-item >
              竞赛类型:{{ details.CompName }}
            </el-form-item>
            <br/>
            <el-form-item >
              开始时间:{{ details.startTime}}
            </el-form-item>
            <br/>
            <el-form-item >
              结束时间:{{ details.endTime}}
            </el-form-item>
            <br/>
            <el-form-item >
              人数限制:{{ details.personNum }}
            </el-form-item>
            <br/>
            <el-form-item >
              指导老师:{{details.teacher }}
            </el-form-item>
            <br/>
            <el-form-item >
              竞赛描述:{{ details.compIntro}}
            </el-form-item>
            <br/>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    <h3>申请者名单</h3>
    <el-table ref="topicTable"
              :height="max"
              :max-height="max"
              :max-width="maxWidth"
              highlight-current-row
              @row-click="handleCurrentChange"
              :data="tableData.slice((num-1)*pageSize,num*pageSize)"
    >
      <el-table-column
        prop="teamId"
        label="序号"
        width="50%">
      </el-table-column>
      <el-table-column
        prop="teamName"
        label="团队名称"
        width="">
      </el-table-column>

      <el-table-column
        prop="PassState"
        label="审核结果"
        width="80%">
      </el-table-column>
    </el-table>
      <el-pagination
        background
        small
        layout="prev, pager, next"
        :pager-count="5"
        @current-change="handleCurrentChange1"
        :current-page.sync="num"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
      <div v-if="this.$store.state.compInfo.CompStateName!=='发布成绩'">
        <el-button type="primary" style="width: 20%;font-size: 10px;" @click="manageMore">批量管理</el-button>
        <el-button  type="primary" style="width: 20%;font-size: 10px" @click="titleEdit">题目管理</el-button>
        <el-button  type="primary" style="width: 20%;font-size: 10px" @click="edit">信息修改</el-button>
        <el-button  type="primary" style="width: 20%;font-size: 10px" @click="operation">{{state}}</el-button>
      </div>
        <div v-else>
          <el-button  type="primary" style="width: 20%;font-size: 10px" @click="titleEdit">题目管理</el-button>
          <el-button  type="primary" style="width: 20%;font-size: 10px" @click="edit">信息修改</el-button>
          <el-button  type="primary" style="width: 20%;font-size: 10px" @click="operation">{{state}}</el-button>
        </div>
      <div style="margin-top: 10px" v-if="this.$store.state.compInfo.CompStateName==='开始竞赛'">
        <el-button type="primary" style="width: 80%" @click="makeScore">查看上交情况</el-button>
      </div>
    <div v-if="isShow">
      <el-divider></el-divider>
      <el-button type="primary" style="width: 40%" @click="makeScore">评分</el-button>
      <el-button  type="primary" style="width: 40%" @click="Rank">预生成榜单</el-button>
    </div>
    </mt-loadmore>
  </div>
  </div>
</template>

<script>
    import pubComp from "./pubComp";

    export default {
        name: "manageTeam",
      data(){
        return{
          CompStateName:'',
          search:'',
          tableData:[],
          state:'',
          isShow:false,
          compStateID:'',
          dialogVisible:false,
          details:[],
          max:document.documentElement.clientHeight-380,
          maxWidth:document.documentElement.clientWidth,
          compTypes:[],
          num:1,
          pageSize:4,
          total:100,
        }
      },
      mounted(){
          if(this.$route.params.CompId){
            this.$store.state.compInfo={compId:this.$route.params.CompId,CompStateName:this.$route.params.CompStateName}
          }
         this.getData();
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
        },
        handleCurrentChange1: function(currentPage){
          this.currentPage = currentPage;
        },
        handleCurrentChange(val){
          this.$router.replace({name:'manageTeamDetail',params:{teamId:val.teamId,teamCompId:val.teamCompId}})
        },
        handleChange(){
         this.getDetail()
        },
        operation(){
          if(this.state==="查看榜单"){
            this.$router.push({name:'queryResult',params:{CompId:this.$store.state.compInfo.compId,isTeather:'1'}})
          }
          else {
            this.$messagebox.confirm('此操作将更新状态, 是否继续?').then(() => {
              //提交数据，更改状态

              const params = new URLSearchParams()
              params.append('CompId', this.$store.state.compInfo.compId)
              params.append('compStateID', this.compStateID)

              this.$axios.post('/teacher/ChangeCompState', params).then((res) => {
                if (res.data.result === "success") {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.$store.state.compInfo.CompStateName=this.state
                  if(this.state==='提交成果关闭'){
                    this.isShow=true
                  }else{
                    this.isShow=false
                  }
                  this.getData();
                }
              }).catch((res) => {
                console.log(res)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            })
          }
        },
        makeScore(){
          this.$router.push({name:'makeScore',params:{CompId:this.$store.state.compInfo.compId}})
        },
        manageMore(){
          this.$router.replace({name:'personnelManage',params:{CompId:this.$store.state.compInfo.compId}})
        },
          titleEdit(){
            this.$router.push({name:'titleEdit',params:{CompId:this.$store.state.compInfo.compId}})
          },
          manage(scope){
            let tableData=[]
            tableData= this.tableData.filter(data => !this.search || data.teamName.toLowerCase().includes(this.search.toLowerCase())
              || data.teamId.toLowerCase().includes(this.search.toLowerCase())|| data.PassState.toLowerCase().includes(search.toLowerCase()))
            this.$router.push({name:'manageTeamDetail',params:{teamId:tableData[scope.$index].teamId,teamCompId:tableData[scope.$index].teamCompId}})
          },
          back(){
            let select='';
            if(this.$store.state.compInfo.CompStateName==='开始报名'){
              select='start'
            }
            else if(this.$store.state.compInfo.CompStateName==='截至报名'||this.$store.state.compInfo.CompStateName==='开始竞赛'){
              select='ing'
            }
            else{
              select='end'
            }
            this.$router.push({name:'teacherManage',params:{selected:select}})
          },
        edit(){
          this.$router.push({name:'pubComp',params:{CompId:this.$store.state.compInfo.compId,compStateName:this.compStateName}})
        },
        Rank(){
          this.$router.replace({name:'perRank',params:{CompId:this.$store.state.compInfo.compId}})
        },
        loadTop(){
          setTimeout(()=>{
            this.getData();
            this.getDetail();
            this.$refs.loadmore.onTopLoaded();
          }, 1000);
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        getDetail(){
          this.$axios.get('/Competitions/detail',{params:{CompId:this.$store.state.compInfo.compId}}).then((res)=>{
            this.details=res.data.data
          }).catch((err)=>{
            console.log(err);
          })
        },
        getData(){
          const CompStateName=this.$store.state.compInfo.CompStateName
          if(CompStateName==='提交成果关闭'){
            this.isShow=true
          }
          switch (CompStateName) {
            case '未开始':this.state='开始报名';break;
            case '开始报名': this.state='截至报名';break;
            case '截至报名': this.state='开始竞赛';break;
            case '开始竞赛': this.state='提交成果关闭';break;
            case '提交成果关闭': this.state='发布成绩';break;
            case '发布成绩': this.state='查看榜单';break;
            default: this.state='错误';
          }
          this.$axios.get('/teacher/manageTeam',{params:{CompId:this.$store.state.compInfo.compId,page:this.num,size:this.pageSize}})
            .then((res)=>{
              this.compStateID=res.data.compStateID
              this.tableData=res.data.data
              this.total=this.tableData.length
            }).catch((err)=>{
            console.log(err)
          })
        }
      }
    }
</script>

<style>
  .message-logout {
    width: 60%;
  }
  .nav{
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:10px; /* 距离窗口顶部距离 */
    left:0px; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
