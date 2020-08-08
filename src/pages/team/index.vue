<template>
  <div>
    <mt-header  fixed title="我的团队" style="background-color: #409eff">
    </mt-header>
    <el-input
      placeholder="请输入竞赛名称"
      prefix-icon="el-icon-search"
      v-model="search" style="width: 100%"></el-input>
    <el-table
      highlight-current-row
      @current-change="handleCurrentChange"
      :max-height="max"
      :max-width="maxWidth"
      :data="tableData.filter(data => !search || data.teamName.toLowerCase().includes(search.toLowerCase())
       || data.Role.toLowerCase().includes(search.toLowerCase())
        || data.Passtatus.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="teamName"
        label="团队名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="Role"
        label="队内职务"
        width="">
      </el-table-column>
      <el-table-column
        prop="Passtatus"
        label="申请状态"
        width="80%">
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content:space-between">
      <el-button type="primary" style="width: 45%" icon="el-icon-back" @click="goTeam">加入团队</el-button>
      <el-button type="primary" style="width: 45%" icon="el-icon-plus" @click="createTeam">新建团队</el-button>
    </div>

    <Footer/>
  </div>
</template>

<script>
  import Header from './teamHead'
  import Footer from '../../components/tabbar'
    export default {
        name: "index",
      components:{Footer,Header},
      data(){
        return{
          tableData:[],
          search:'',
          max:document.documentElement.clientHeight-220,
          maxWidth:document.documentElement.clientWidth,
        }
      },
      mounted() {
        if(this.$store.state.user)
          this.$axios.get('/users/manage').then((res)=>{
            this.tableData=res.data.data
          }).catch((err=>{
            console.log(err)
          }))
      },
      methods:{
          goTeam(){
            this.$router.push('/team');
          },
          createTeam(){
            this.$router.push('/team/newTeam')
          },
        handleCurrentChange(val) {
          this.$router.push({name:'myTeamDetail',params:{teamId:val.teamId,Role:val.Role,Passtatus:val.Passtatus}})
        },
        getDetail(scope){
            let tableData=this.tableData.filter(data => !this.search || data.teamName.toLowerCase().includes(this.search.toLowerCase())
              || data.Role.toLowerCase().includes(this.search.toLowerCase())
              || data.Passtatus.toLowerCase().includes(this.search.toLowerCase()))
          this.$router.push({name:'myTeamDetail',params:{teamId:tableData[scope.$index].teamId,Role:tableData[scope.$index].Role,Passtatus:tableData[scope.$index].Passtatus}})
           // const params=new URLSearchParams()
          // params.append('teamId',)
          //   this.$axios.post('/users/manage/detail')
        }
      }
    }
</script>

<style scoped>

</style>
