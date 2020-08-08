<template>
    <div>
      <mt-header title="校内竞赛介绍" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <div>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">ACM</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">服务外包</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">新生杯</div></el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "compIntroduce",
      methods:{
        back(){
          this.$router.back(-1)
        }
      }
    }
</script>

<style scoped>
  .nav{
    background-color:#545c64;
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    /*z-index:99; !* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 *!*/
  }
</style>
