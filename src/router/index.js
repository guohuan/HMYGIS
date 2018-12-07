import Vue from 'vue';
import VueRouter from 'vue-router';
import cesiumViewer from '@/components/cesiumViewer.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        name: 'cesiumViewer',
        component: cesiumViewer
    }
];

var route = new VueRouter({
    routes
})

export default route;