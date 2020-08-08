<template>
  <div id="app">


    <router-view v-if="$route.meta.keepAlive"></router-view>
    <keep-alive v-else>
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style  lang="scss">   //注意要用lang="scss"声明
  @import "./style/weui";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
