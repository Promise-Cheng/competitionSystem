<template>
  <div>
    <mt-header  fixed title="参与的竞赛信息" style="line-height: 20px">
    </mt-header>
    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item id="start"><i class="el-icon-s-promotion"  style="font-size: 12px"></i>报名中</mt-tab-item>
      <mt-tab-item id="ing"><i class="el-icon-loading"  style="font-size: 12px"></i>进行中</mt-tab-item>
      <mt-tab-item id="end"><i class="el-icon-medal-1"  style="font-size: 12px"></i>已结束</mt-tab-item>
    </mt-navbar>
    <br/>
    <br/>
  </div>

</template>

<script>
    export default {
        name: "myHeader",
      data(){
          return{
            index:'/myself/start',
            selected:''
          }
      },
      mounted() {
          let index=this.$route.path.lastIndexOf('/')
          this.selected=this.$route.path.substring(index+1,this.$route.path.length)
      },
      watch:{
          selected:function (val, oldVal) {
            // switch (val) {
            //   case 'start':
            //     this.$router.push('/myself/start');
            //     break;
            //   case 'ing':
            //     this.$router.push('/myself/ing');
            //     break;
            //   case 'end':
            //     this.$router.push('/myself/end');
            // }
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
