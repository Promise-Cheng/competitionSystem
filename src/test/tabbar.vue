<template>
        <mt-tabbar v-model="selected" fixed class="border-1px-top">
          <mt-tab-item id="首页" >
            首页
          </mt-tab-item>
          <mt-tab-item id="名品特卖" to="/brandSale">
           名品特卖
            <!-- <router-link to="brandSale">名品特卖</router-link> -->
          </mt-tab-item>
          <mt-tab-item id="直播特区" >
            直播特区
          </mt-tab-item>
          <mt-tab-item id="购物车" >
      购物车
          </mt-tab-item>
          <mt-tab-item id="我的">
            我的
          </mt-tab-item>
        </mt-tabbar>
  </template>

  <script>

    export default {

      data(){
        return{
          selected: "首页",
        }
      },
      mounted(){
      },

      watch: {

        value: function (val, oldVal) {

          // 这里就可以通过 val 的值变更来确定去向

          switch(val){

            case 'MainPage':

              this.$router.push('/home');

              break;

            case 'ShoppingList':

              this.$router.push('/home');

              break;

            case 'GroupList':

              this.$router.push('/home');

              break;

            case 'UserCenter':

              this.$router.push('/home');

              break;

          }

        }

      },

    }

  </script>



<style scoped>

</style>
