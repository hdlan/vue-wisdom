<template>
  <router-view></router-view>
</template>

<script>
export default {
    name: 'app' ,
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html{
      font-size: 50px;
      height: 100%
}
body {
  background-color: #efefef;
  height: 100%
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}
</style>
