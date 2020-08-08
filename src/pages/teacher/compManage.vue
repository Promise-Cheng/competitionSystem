<template>
  <div>
    <mt-header  fixed title="管理竞赛" style="line-height: 20px;background-color: #409eff">
    </mt-header>
    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item id="start"><i class="el-icon-s-promotion"  style="font-size: 12px"></i>报名中</mt-tab-item>
      <mt-tab-item id="ing"><i class="el-icon-loading"  style="font-size: 12px"></i>进行中</mt-tab-item>
      <mt-tab-item id="end"><i class="el-icon-medal-1"  style="font-size: 12px"></i>已结束</mt-tab-item>
    </mt-navbar>
    <br/>
    <br/>
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
    <el-table ref="topicTable"
              :height="max"
              :max-height="max"
              :max-width="maxWidth"
              highlight-current-row
              @row-click="handleCurrentChange"
              :data="tableData.filter(data => !search || data.compName.toLowerCase().includes(search.toLowerCase())
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
        sortable
        label="状态"
        width="80%">
      </el-table-column>
    </el-table>

      <div>
        <el-pagination
          background
          small
          layout="sizes,prev, pager, next"
          :pager-count="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange1"
          :current-page.sync="num"
          :page-sizes=[5,6,7,8,10]
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
      <br/>
    </mt-loadmore>
    <el-button type="primary" style="width: 100%" icon="el-icon-plus" @click="pubComp">发布竞赛</el-button>

    <Footer/>
  </div>

</template>

<script>
  import Footer from './teacherTabbar'
    export default {
        name: "compManage",
      components:{Footer},
      data(){
          return{
            search:'',
            tableData:[],
            max:document.documentElement.clientHeight-230,
            maxWidth:document.documentElement.clientWidth,
            num:1,
            pageSize:7,
            total:100,
            selected: 'start',
            state:1,
          }
      },
      watch: {
        selected: function (val, oldVal) {
          this.$set(this,'num',1)
          switch (val) {
            case 'start':
              this.state = 1;

              this.getData();
              break;
            case 'ing':
              this.state = 2;
              this.getData();
              break;
            case 'end':
              this.state = 3;
              this.getData();
              break;
          }
        },

      },
      mounted() {
        if(this.$route.params.selected){
          this.selected=this.$route.params.selected;
        }
       this.getData();
      },
      methods:{
          getData(){
            this.$axios.get('/teacher/manageComp',{params:{page:this.num,status:this.state,size:this.pageSize}}).then((res)=>{
              this.tableData=res.data.data
              this.total=res.data.Sum
            }).catch((err)=>{
              console.log(err);
            })
          },
        handleCurrentChange1(val){
          this.getData();
        },
        handleSizeChange(val){
          this.pageSize=val
          this.getData()
        },
        handleCurrentChange(val) {
          this.$router.push({name:'manageTeam',params:{CompId:val.CompId,manage:'1',CompStateName:val.CompStateName}})
        },
        getDetail(scope){
          let tableData=[]
          tableData= this.tableData.filter(data => !this.search || data.compName.toLowerCase().includes(this.search.toLowerCase())
            || data.CompStateName.toLowerCase().includes(this.search.toLowerCase()))
          this.$router.push({name:'compDetail',params:{CompId:tableData[scope.$index].CompId,manage:'1',CompStateName:tableData[scope.$index].CompStateName}})
        },
        pubComp(){
          this.$router.push('/teacher/pubComp')
        },
        loadTop(){
          setTimeout(()=>{
            this.getData();
            this.$refs.loadmore.onTopLoaded();
          }, 1000);
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
      }

    }
</script>

<style scoped>
  .nav{
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:40px; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    /*z-index:99; !* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 *!*/
  }
</style>
