<template>
  <div>
    <mt-header fixed title="竞赛平台管理"></mt-header>
     <div>
      <div  style=" background: #E4E7ED;width: 45%;float: left">
        <i class="el-icon-s-custom"></i>使用人数：
        <p>{{personNum}}</p>
      </div>
      <div  style=" background: #E4E7ED; width: 45%;float: right">
        <i class="el-icon-star-off"></i>竞赛总数：
        <p>{{CompNum}}</p>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <mt-cell-swipe 
        title="账号管理"
        to="/manager/userinfo/student"  is-link></mt-cell-swipe>
    <!-- <mt-cell-swipe
        title="竞赛管理"
        to="/manager/comptitiom" is-link></mt-cell-swipe>
    <mt-cell-swipe
        title="团队管理"
        to="/manager/team" is-link></mt-cell-swipe> -->
    <el-divider></el-divider>
    <div>
        <div id="chart_example">
        </div>
    </div>
  </div>
  
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "Index",
    data() {
      return {
        personNum:0,
        CompNum:0,
        CompList:[],
        max:document.documentElement.clientHeight-200,
        maxWidth:document.documentElement.clientWidth,
      }
    },
    methods:{
        manageUser(){
            console.log("aaaa")
            this.$router.push('')
        }
    },
    mounted() {
        let CompName=[]
        let CompNumber=[]
        this.$axios.get('/home').then((res)=>{
          this.CompList=res.data.data.CompList
          this.CompNum=res.data.data.CompNum
          this.personNum=res.data.data.personNum
          for(const compList in this.CompList){
            CompName.push(this.CompList[compList].CompName)
            CompNumber.push(this.CompList[compList].Sum)
          }
          let this_ = this;
          let myChart = echarts.init(document.getElementById('chart_example'));
          let option = {
            title: { text: '各类竞赛数量统计' },
            color: ['#f44'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {
                type : 'shadow'
              }
            },
            xAxis : [
              {
                type : 'category',
                data : CompName,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'数量',
                type:'bar',
                barWidth: '60%',
                data:CompNumber,
              }
            ]
          };
          myChart.setOption(option);
          //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
          window.addEventListener('resize',function() {myChart.resize()});
        }).catch((err)=>{
          console.log(err)
        })


      },
  }
</script>

<style scoped>
  #chart_example{
    width: 80%;
    height: 200px;
    margin: 0 auto;
  }
</style>

