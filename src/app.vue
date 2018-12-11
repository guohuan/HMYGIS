<template>
  <div id="app">
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name:'App'
  }
</script>
<style lang="scss">

  /* 保证浏览器全屏幕显示，没有多余的白边 */
  html， body， #cesiumContainer {
    width: 100%; 
    height: 100%; 
    margin: 0; 
    padding: 0; 
    overflow: hidden;
  }

  #app {
    font-family: 'Avenir'， Helvetica， Arial， sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
  
.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}


</style>
