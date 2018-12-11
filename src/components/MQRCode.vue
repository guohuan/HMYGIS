<!--  -->
<template>
    <div>
      <h3>二维码生成组件</h3>
        <vue-qr style="float:left;margin-left:200px;" :bgSrc='config.imagePath' :text="config.value" :size="200" :margin="0"></vue-qr>
        <vue-qr style="float:left;margin-left:200px;" :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
        <vue-qr style="float:left;margin-left:200px;" :bgSrc='config.imagePath' :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
    </div>
        
</template>
 
<script>
  import VueQr from 'vue-qr';
  import utils from '../common/util.js';

  export default {
    components: { VueQr },
    data() {
      return {
          config: {
            value: utils.CreateUUID(),//'这是一个简单的二维码',//显示的值、跳转的地址
            imagePath: require('@/assets/logo.png')//中间logo的地址
          }
      }
    },
    computed: {},

    //事件（钩子）回调函数：
    //组件创建之后，数据已经完成初始化，但是DOM还未生成
    created() {},

    //数据装载DOM上后，各种数据已经就位，将数据渲染到DOM上，DOM已经完成
    mounted() {},

    methods: {}
  }
  </script>
<style scoped>
</style>
