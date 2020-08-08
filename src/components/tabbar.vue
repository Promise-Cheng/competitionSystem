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
      <mt-tab-item id="team" >
        <i class="el-icon-medal" style="font-size: 15px"></i><br/>
        团队
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
        name: "tabbar",
      data(){
          return {
            selected:'',
            index:'',
            path:'',
            select:''
          }
      },
      mounted() {
        const index=this.$route.path.lastIndexOf('/')
        this.index=index
        if(index!==0){
          this.select=this.$route.path.substring(1,index)
          this.path=this.$route.path
        }
        else{
          this.select=this.$route.path.substring(1,this.$route.path.length)
        }
        this.selected=this.select
        // console.log(this.selected);

      },
      watch:{
        selected: function (val, oldVal) {
          // 这里就可以通过 val 的值变更来确定去向
          this.$router.push(this.path);
             switch(val){
              case 'home':
                 this.$router.push('/home');
                 break;
               case 'competition':
                 // console.log('competition')
                 if(this.index===0||oldVal==='team')
                    this.$router.push("/competition/start");
                 else
                    this.$router.push(this.path);
                 this.$router.push("/competition/start");
                 break;
               case 'team':
                   this.$router.push('/team/myteam');
                break;
               case 'myself':
                 this.$router.push('/myself');
                 break;
             }
          }


        }
    }
</script>

<style scoped>
  .footer{
    position:fixed;
    bottom: 0;
    text-align:left;
    width: 100%;
  }
</style>
