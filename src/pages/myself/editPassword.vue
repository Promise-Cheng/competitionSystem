<template>
  <div>
    <mt-header title="密码修改"  fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <mt-field label="输入旧密码：" placeholder="Input password" type="password" v-model="oldPassword"></mt-field>
    <mt-field label="输入新密码：" placeholder="Input password" type="password" v-model="newPassword1"></mt-field>
    <mt-field label="确认新密码：" placeholder="Input password" type="password" :state="state" v-model="newPassword2"></mt-field>
    <el-button @click="edit" type="primary" style="width: 40% " round>提交</el-button>
  </div>
</template>

<script>
    export default {
        name: "editPassword",
      data(){
          return{
            oldPassword:'',
            newPassword1:'',
            newPassword2:'',
           // state:'',//error,success
          }
      },
      methods:{
       back(){
         this.$router.push('/myself')
       },
        edit(){
         if(this.oldPassword===this.$store.state.user.password){
           if(this.state==='success'){
             const params=new URLSearchParams()
             params.append('password',this.newPassword1)
             this.$axios.post('/users/password',params)
               .then((res)=>{
                 console.log(1)
               this.$router.replace('/login');
             }).catch((err)=>{
               console.log(err)
             })
           }
           else {
             this.$message.error('两次密码输入不一样！');
           }

         }
          else{
           this.$message.error('旧密码错误');
         }
        },
      },
      computed:{
            state(){
            if(this.newPassword1===''||this.newPassword2===''){
              return  ''
            }
            else if (this.newPassword1===this.newPassword2){

              return  'success'
            }
            else{
              return 'error'
            }

          }
      }

    }
</script>

<style scoped>

</style>
