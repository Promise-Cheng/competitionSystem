<template>
    <div>
      <Header/>
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">选项一</mt-tab-item>
        <mt-tab-item id="2">选项二</mt-tab-item>
        <mt-tab-item id="3">选项三</mt-tab-item>
      </mt-navbar>
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
        <el-table ref="topicTable"
                  :max-height="max"
                  :max-width="maxWidth"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  :data="tableData.filter(data => !search
       || data.compName.toLowerCase().includes(search.toLowerCase())
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
        <div slot="top" class="mint-loadmore-top" >
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'"><i class="el-icon-loading"  style="font-size: 12px"></i></span>
        </div>
      </mt-loadmore>
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        style="width: 100%"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="a"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        @prev-click="god"
        :total="1000">
      </el-pagination>
      <tabbar/>

    </div>
</template>

<script>
  import Header from './header'
  import tabbar from './tabbar'

  export default {

    components:{tabbar,Header},
    data(){
      return{
        selected:'1',
        a:1,
        topStatus: '',
        search:'',
        tableData:[],
        max:document.documentElement.clientHeight-180,
        maxWidth:document.documentElement.clientWidth,
      }
    },
    mounted(){
      const params = new URLSearchParams();
      const status = -1;
      params.append('status',status);
      this.$axios.get('/Competitions/show',{params:{status:2}}).then((res)=>{
        this.tableData=res.data.data;
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{
      handleCurrentChange(val) {
        this.$router.push({
          name: 'detail', params: {
            CompId: val.CompId
            , compStateID: val.compStateID
          }
        })
      },
      loadTop(){
        setTimeout(()=>{
          this.$axios.get('/Competitions/show',{params:{status:1}}).then((res)=>{
          this.tableData=res.data.data;
        }).catch((err)=>{
          console.log(err);
        })
          this.$refs.loadmore.onTopLoaded();
          }, 1000);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleSizeChange(){

      },
      god(){
        console.log(this.a)
      }
    },
    watch:{
      selected:function (val, oldVal) {
        switch (val) {
          case 1:
            this.$router.push('/competition');
            break;
          case 2:
            this.$router.push('/competition/start');
            break;
          case 3:
            this.$router.push('/competition/ing');
            break;
          case 4:
            this.$router.push('/competition/end');
            break;

        }
      }
    }
  }
</script>

<style scoped>

</style>
