<template>
  <div>
    <mt-header  fixed title="校内竞赛信息" style="line-height: 20px;background-color:#E6A23C">
    </mt-header>
    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item id="start"><i class="el-icon-s-promotion"  style="font-size: 12px"></i>报名中</mt-tab-item>
      <mt-tab-item id="ing"><i class="el-icon-loading"  style="font-size: 12px"></i>进行中</mt-tab-item>
      <mt-tab-item id="end"><i class="el-icon-medal-1"  style="font-size: 12px"></i>已结束</mt-tab-item>
    </mt-navbar>
    <br/>
    <br/>                                                                
<!--    <el-menu-->
<!--      :default-active="this.$route.path"-->
<!--      mode="horizontal"-->
<!--      background-color="#545c64"-->
<!--      text-color="#fff"-->
<!--      style="text-align: left"-->
<!--      active-text-color="#ffd04b"-->
<!--      router>-->
<!--      <el-menu-item index="/competition" style="width:25% ;font-size: 12px ;text-align: center"><i class="el-icon-s-opportunity" style="font-size: 12px"></i>未开始</el-menu-item>-->
<!--      <el-menu-item index="/competition/start" style="width: 25%;font-size: 12px;text-align: center"><i class="el-icon-s-promotion"  style="font-size: 12px"></i>报名中</el-menu-item>-->
<!--      <el-menu-item index="/competition/ing" style="width:25%;font-size: 12px;text-align: center"><i class="el-icon-loading"  style="font-size: 12px"></i>进行中</el-menu-item>-->
<!--      <el-menu-item index="/competition/end" style="width: 25%;font-size: 12px;text-align: center"><i class="el-icon-medal-1"  style="font-size: 12px"></i>已结束</el-menu-item>-->
<!--    </el-menu>-->
  </div>


</template>

<script>
    export default {
        name: "indexHead",
      data (){
          return{
            selected:'',
            path:'',
          }
      },
      mounted(){
          const index=this.$route.path.lastIndexOf('/')
          if(index===0){
            this.selected='competition';
          }
          else{
            this.selected=this.$route.path.substring(index+1,this.$route.path.length)
          }
      },
      watch: {
        selected: function (val, oldVal) {
          switch (val) {
            case 'competition':
              this.$router.push('/competition');
              break;
            case 'start':
              this.$router.push('/competition/start');
              break;
            case 'ing':
              this.$router.push('/competition/ing');
              break;
            case 'end':
              this.$router.push('/competition/end');
              break;

          }
        }
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
