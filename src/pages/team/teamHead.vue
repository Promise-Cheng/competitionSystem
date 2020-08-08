<template>
  <div>
      <mt-header  fixed title="校内团队信息" style="background-color: #409eff">
      </mt-header>
      <mt-navbar v-model="selected" class="nav">
        <mt-tab-item id="team"><i class="el-icon-s-grid"></i> 所有团队</mt-tab-item>
        <mt-tab-item id="myTeam"><i class="el-icon-menu"></i> 我的团队</mt-tab-item>
      </mt-navbar>
      <br/>
      <br/>
  </div>

</template>

<script>
    export default {
        name: "teamHead",
      data(){
          return{
            selected:'',
          }
      },
      mounted() {
          if(this.$route.path.lastIndexOf('/')===0)
            this.selected='team'
        else
          this.selected='myTeam'
      },
      watch:{
          selected:function (val, oldVal) {
            if(val==='team')
              this.$router.push('/team')
            else
              this.$router.push('/team/myTeam')
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
