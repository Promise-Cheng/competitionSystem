export default {
  computed:{
    //竞赛信息
    compInfo(){
      return this.$store.state.compInfo
    },
    //用户信息
    userInfo(){
      return this.$store.state.user
    },
  }
}
