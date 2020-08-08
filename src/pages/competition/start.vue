<template>
  <div>

    <div v-if="isSearch">
      <mt-header  fixed title="校内竞赛" style="line-height: 20px;background-color:#E6A23C ">
        <mt-button icon="back" slot="left" @click="isSearch=!isSearch">返回</mt-button>
      </mt-header>
      <div>
        <el-table ref="topicTable"
                  :max-height="max1"
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
    </div>
    <div v-else>
      <mt-header  fixed title="校内竞赛" style="line-height: 20px;background-color:#E6A23C ">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <mt-navbar v-model="selected" class="nav">
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
            :page-sizes=[5,6,7,8,10]
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </div>
        <br/>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import Footer from '../../components/tabbar'
  import Header1 from './indexHead'
    export default {
        name: "start",
      components:{Footer,Header1},
      data() {
        return {
          search:'',
          tableData:[],
          max1:document.documentElement.clientHeight - 140,
          max:document.documentElement.clientHeight-210,
          maxWidth:document.documentElement.clientWidth,
          num: 1,
          total: 100,
          pageSize: 5,
          selected: 'start',
          state: 1,
          isSearch:false,
        }
      },
      mounted(){
          if(this.$route.params.selected){
            this.selected=this.$route.params.selected;
          }
        this.getData()
      },
      watch: {
        selected: function (val, oldVal) {
          this.num=1;
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
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        handleSizeChange(val){
          this.pageSize=val
          this.getData()
        },
        handleCurrentChange1(val){
          this.getData();
        },
        handleCurrentChange(val) {
          this.$router.replace({name:'detail',params:{CompId:val.CompId
              ,compStateName:val.CompStateName}})
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
            this.$axios.get('/Competitions/Search',{params:{content:this.search}}).then((res)=>{
              this.tableData=res.data.data
            }).catch((err)=>{
              console.log(err);
            })
          }
        },
        ToSearch(){
          this.isSearch=(this.search!=="")
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
