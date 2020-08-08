<template>
  <div>
    <mt-header :title="topic" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <div>
      <el-form style="text-align: left">
        <el-form-item label="竞赛名称:">
          <el-input
            placeholder="请输入竞赛名称"
            prefix-icon="el-icon-s-custom"
            v-model="compName" style="width: 50%">
          </el-input></el-form-item>
        <el-form-item label="竞赛类型:"  >
          <el-input
            placeholder="请输入竞赛名称"
            prefix-icon="el-icon-s-custom"
            v-model="compType" disabled style="width: 50%">
          </el-input>
<!--          <el-select v-model="compType"  placeholder="请选择竞赛类型" style="width: 35%">-->
<!--            <el-option-->
<!--              v-for="item in compTypes"-->
<!--              :key="item.CompTypeid"-->
<!--              :label="item.CompName"-->
<!--              :value="item.CompTypeid">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </el-form-item>
        <el-form-item>
          <div class="block">
            <span class="demonstration">开始时间：</span>
            <el-date-picker
              v-model="startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <span class="demonstration">结束时间：</span>
            <el-date-picker
              v-model="endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="最大竞赛人数:" >
          <el-select v-model="personNum" style="width: 20%">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item >
        <el-form-item label="竞赛介绍:" >
          <el-input type="textarea" v-model="compIntro"   :rows="4" ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center ">
          <el-button type="primary" @click="onSubmit" style="width: 40%;">{{operation}}</el-button>
          <el-button type="primary" style="width: 40%;" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>

<script>
    export default {
        name: "pubComp",
      data(){
          return{
            value:'',
            topic:'竞赛发布',
            compIntro:'',
            personNum:'1',
            endTime:'',
            startTime: '',
            compName:'',
            compType:'',
            operation:'立即发布',
            backPath:'/teacher/myself',
            compTypes:[],
            options1: [
              {
              value: '1',
              label: '1'
            }, {
              value: '2',
              label: '2'
            }, {
              value: '3',
              label: '3'
            }, {
              value: '4',
              label: '4'
            },{
              value: '5',
              label: '5'
            },{
              value: '6',
              label: '6'
            },{
              value: '7',
              label: '7'
            },],
            details:[],
          }
      },
      mounted(){
        this.compType=this.$store.state.user.info.CompName
        this.$axios.get('/teacher/CompTypes').then((res)=>{
          this.compTypes=res.data.data
        }).catch((err)=>{
          console.log(err)
        })
          //如果是修改信息则请求已有数据，进行修改
        if(this.$route.params.CompId) {
          this.topic='竞赛信息修改'
          this.operation = '立即修改'
          this.backPath = '/teacher/manage'
          this.$axios.get('/Competitions/detail',{params:{CompId:this.$route.params.CompId}}).then((res)=>{
            this.details=res.data.data
            this.startTime=this.details.startTime
            this.endTime=this.details.endTime
            this.compName=this.details.compName
            this.compType=this.details.CompName
            this.compIntro=this.details.compIntro
            this.personNum=this.details.personNum
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      methods:{
        onSubmit(){
          let compType =JSON.parse(JSON.stringify(this.compType))
          for(const index in this.compTypes){
            if(compType===this.compTypes[index].CompName){
              compType=this.compTypes[index].CompTypeid
              break
            }
          }
          if(!compType || !this.compName ||  !this.startTime||  !this.endTime||  !this.compIntro||  !this.personNum){
            this.$message.error('请填写完整的信息(不能为空)');
            return;
          }
          const params=new URLSearchParams()
          if(this.$route.params.CompId){
            params.append('compName',this.compName)
            params.append('CompId',this.$route.params.CompId)
            params.append('CompTypeid',compType)
            params.append('startTime',this.startTime)
            params.append('endTime',this.endTime)
            params.append('compIntro',this.compIntro)
            params.append('personNum',this.personNum)
            this.$axios.post('/teacher/manageComp/updateInfo',params).then((res)=>{
              if(res.data.result==='success'){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
             this.$router.replace({name:'manageTeam',params:{CompId:this.$store.state.compInfo.compId,manage:'1',
             CompStateName:this.$store.state.compInfo.CompStateName}})
            }).catch((err)=>{
              console.log(err)
            })
          }
          else {
            // console.log(compType)
            // return;
            params.append('compName',this.compName)
            params.append('CompTypeid',compType)
            params.append('startTime',this.startTime)
            params.append('endTime',this.endTime)
            params.append('compIntro',this.compIntro)
            params.append('personNum',this.personNum)
            this.$axios.post('/teacher/submit',params).then((res)=>{
              if(res.data.result==='success'){
                this.$message({
                  message: '发布成功',
                  type: 'success'
                });
              }
              //this.$store.state.compInfo.CompStateName="开始竞赛"
              this.$router.replace({name:'manageTeam',params:{CompId:res.data.CompId,CompStateName:'开始报名'}})
            }).catch((err)=>{
              console.log(err)
            })
          }
        },
        back(){
          this.$router.back(-1)
        }
      }
    }
</script>

<style scoped>
  .nav{
    background-color:#545c64;
    position:absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
