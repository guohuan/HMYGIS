<template>
    <div id="cesiumContainer"></div>
</template>
<script>

import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';

export default {
    data(){
        name:'cesiumContainer'
    },
    mounted() {
        //创建cesium Viewer 
        var viewer = new Cesium.Viewer('cesiumContainer', {
        //是否显示查找位置工具
        geocoder: true,
        //是否显示Home按钮
        homeButton: false,
        //是否显示3D/2D/VC选择器
        sceneModePicker: true,
        //是否显示图层选择器
        baseLayerPicker: true,
        //是否显示导航帮助按钮
        navigationHelpButton: true,
        //是否显示动画器件，左下角仪表盘
        animation: false,
        //是否显示时间轴
        timeline: false,
        //是否显示全屏按钮
        fullscreenButton: true,
        //隐藏版权信息，无效
        creditsDisplay: false,
        //是否显示VR按钮
        vrButton: true,
        });

        //隐藏版权信息
        viewer.cesiumWidget.creditContainer.style.display = "none";
        viewer.bottomContainer.style.display = "none";

        //显示帧速（FPS）
        viewer.scene.debugShowFramesPerSecond = true;
  },
  
}
</script>
<style scoped>
    /* 该style只应用于该控件 */


</style>

