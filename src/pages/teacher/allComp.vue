<template>
    <div>
      <mt-header  fixed title="校内竞赛" style="line-height: 20px;background-color:#E6A23C ">
      </mt-header>
      <div v-if="isSearch">
        <div>
          <el-table ref="topicTable"
                    :height="max1"
                    :max-height="max1"
                    :max-width="maxWidth"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    :data="tableData"
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
              prop="CompName"
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
        </div>
        <el-button type="primary" style="width: 100%" icon="el-icon-back" @click="isSearch=!isSearch">返回</el-button>
      </div>
      <div v-else>
        <mt-navbar v-model="selected"class="nav">
          <mt-tab-item id="start"><i class="el-icon-s-promotion"  style="font-size: 12px"></i>报名中</mt-tab-item>
          <mt-tab-item id="ing"><i class="el-icon-loading"  style="font-size: 12px"></i>进行中</mt-tab-item>
          <mt-tab-item id="end"><i class="el-icon-medal-1"  style="font-size: 12px"></i>已结束</mt-tab-item>
        </mt-navbar>
        <br/>
        <br/>
        <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
          <el-input
            placeholder="请输入竞赛名称"
            prefix-icon="el-icon-search"
            v-model="search" style="width: 70%"></el-input>
          <el-button icon="el-icon-search" @click="ToSearch" style="width: 20%"></el-button>
          <div>
            <el-table ref="topicTable"
                      :height="max"
                      :max-height="max"
                      :max-width="maxWidth"
                      highlight-current-row
                      @row-click="handleCurrentChange"
                      :data="tableData"
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
                prop="CompTypeName"
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
          </div>

          <div>
            <el-pagination
              background
              small
              layout="sizes,prev, pager, next"
              :pager-count="5"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange1"
              :current-page.sync="num"
              :page-size="pageSize"
              :page-sizes=[5,6,7,8,10]
              :total="total">
            </el-pagination>
          </div>
          <br/>
        </mt-loadmore>
      </div>

      <Footer/>
    </div>
</template>

<script>
  import Footer from './teacherTabbar'
    export default {
        name: "allComp",
      components:{Footer},
      data(){
          return {
            search: '',
            tableData: [],
            max1:document.documentElement.clientHeight - 140,
            max: document.documentElement.clientHeight - 210,
            maxWidth: document.documentElement.clientWidth,
            num: 1,
            total: 100,
            pageSize: 5,
            selected: 'start',
            state: 1,
            isSearch:false,
          }
      },
      computed:{

      },
      mounted() {
          //获取屏幕宽高
          //console.log(document.documentElement.clientWidth,document.documentElement.clientHeight);
        if(this.$route.params.selected){
          this.selected=this.$route.params.selected;
        }
        this.getData()
        // this.num=1;
        // console.log(this.num);
        // this.$set(this,'num',1)
      },
      watch: {
        selected: function (val, oldVal) {
          this.$set(this,'num',1)
          switch (val) {
            case 'start':
              this.state=1;
              this.getData();
              break;
            case 'ing':
              this.state=2;
              this.getData();
              break;
            case 'end':
              this.state=3;
              this.getData();
              break;
          }
        },
        isSearch(val,oldVal){
          this.getData()
        }
      },
      methods:{

        handleSizeChange(val){
          this.pageSize=val
          this.getData()
        },
        ToSearch(){
          this.isSearch=(this.search!=="")
        },
          getData(){
          if(!this.isSearch)
            this.$axios.get('/Competitions/show',{params:{status:this.state,page:this.num,size:this.pageSize}}).then((res)=>{
              this.tableData=res.data.data
              this.total=res.data.Sum
            }).catch((err)=>{
              console.log(err);
            })
            else {
            this.$axios.get('/Competitions/Search',{params:{content:this.search,page:this.num}}).then((res)=>{
              this.tableData=res.data.data
            }).catch((err)=>{
              console.log(err);
            })
          }
          },
        handleCurrentChange1(val){
            this.getData();
        },
        handleCurrentChange(val) {
          this.$router.push({name:'compDetail',params:{CompId:val.CompId,compStateName:val.CompStateName}})
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
        // getDetail(scope){
        //   let tableData=[]
        //   tableData= this.tableData.filter(data => !this.search || data.compName.toLowerCase().includes(this.search.toLowerCase())
        //     || data.CompStateName.toLowerCase().includes(this.search.toLowerCase()))
        //   this.$router.push({name:'compDetail',params:{CompId:tableData[scope.$index].CompId}})
        // }
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
