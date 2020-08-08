<template>
  <div>
    <div>
      <mt-header title="详情信息" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-divider></el-divider>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item >
          竞赛名称:{{ details.compName }}
        </el-form-item>
        <br/>
        <el-form-item >
          竞赛类型:{{ details.CompName }}
        </el-form-item>
        <br/>
        <el-form-item >
          开始时间:{{ details.startTime}}
        </el-form-item>
        <br/>
        <el-form-item >
          结束时间:{{ details.endTime}}
        </el-form-item>
        <br/>
        <el-form-item >
          人数限制:{{ details.personNum }}
        </el-form-item>
        <br/>
        <el-form-item >
          指导老师:{{details.teacher }}
        </el-form-item>
        <br/>
        <el-form-item >
          竞赛描述:{{ details.compIntro}}
        </el-form-item>
        <br/>
      </el-form>
      <div v-if="isEnd">
        <el-button @click="getDetail" type="primary" style="width: 30%">竞赛题目</el-button>
        <el-button type="primary" style="width: 30%" @click="getResult">查看榜单</el-button>
        <el-button @click="back" type="primary" style="width: 30%">返回</el-button>
      </div>
      <div v-else-if="isStart">
        <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
      </div>
      <div v-else-if="isIng">
        <el-button @click="getDetail" type="primary" style="width: 30%">竞赛题目</el-button>
        <el-button @click="back" type="primary" style="width: 30%">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myCompDetail",
      data(){
        return{
          details:[],
          isEnd:false,
          isStart:false,
          isIng:false
        }
      },
      mounted(){
        if(this.$route.params.CompState==='5')
            this.isEnd=true
        else if(this.$route.params.CompState==='1')
          this.isStart=true
        else if(this.$route.params.CompState==='2'){
            console.log(2222)
        }
        else  this.isIng=true
        this.$axios.get('/Competitions/detail',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
          this.details=res.data.data
        }).catch((err)=>{
          console.log(err);
        })
      },
      methods:{
          getDetail(){
            this.$router.push({name:'compSubject',params:{CompId:this.$route.params.CompId,CompState:this.$route.params.CompState}})
          },
        getResult(){
          this.$router.push({name:'queryResult',params:{CompId:this.$route.params.CompId,CompState:this.$route.params.CompState}})
        },
          back(){
            let select='';
            if(this.$route.params.CompState==='1'){
              select='start'
            }
            else if(this.$route.params.CompState<=3){
              select='ing';
            }
            else{
              select='end';
            }
            this.$router.replace({name:'myStart',params:{selected1:select}})
          }
      }
    }
</script>

<style scoped>

</style>
