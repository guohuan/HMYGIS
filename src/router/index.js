import Vue from 'vue';
import VueRouter from 'vue-router';
import cesiumViewer from '@/components/cesiumViewer.vue';
import login from '@/components/Login.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/Map',
        name: 'cesiumViewer',
        component: cesiumViewer
    },
];

var route = new VueRouter({
    routes
})

export default route;