<template>
  <div>
    <mt-tabbar v-model="selected" fixed class="border-1px-top">
      <mt-tab-item id="home" >
        <i class="el-icon-s-home" style="font-size: 15px"></i><br/>
        主页
      </mt-tab-item>
      <mt-tab-item id="competition" >
        <i class="el-icon-view" style="font-size: 15px"></i><br/>
        竞赛
      </mt-tab-item>
      <mt-tab-item id="manage" >
        <i class="el-icon-medal" style="font-size: 15px"></i><br/>
        管理
      </mt-tab-item>
      <mt-tab-item id="myself" >
        <i class="el-icon-s-custom" style="font-size: 15px"></i>
        <br/>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>

</template>

<script>
    export default {
        name: "teaccherTabbar",
      data(){
          return {
            selected:'',
          }
      },
      mounted() {
        const index=this.$route.path.lastIndexOf('/')
        this.selected=this.$route.path.substring(index+1,this.$route.path.length)
      },
      watch:{
        selected: function (val, oldVal) {
          // 这里就可以通过 val 的值变更来确定去向
          switch(val){
            case 'home':
              this.$router.push('/teacher/home');
              break;
            case 'competition':
                this.$router.push("/teacher/competition");
              break;
            case 'manage':
                this.$router.push('/teacher/manage');
              break;
            case 'myself':
              this.$router.push('/teacher/myself');
              break;
          }
        }
      }
    }
</script>

<style scoped>

</style>
