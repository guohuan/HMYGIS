import Vue from 'vue';
import VueRouter from 'vue-router';
import cesiumViewer from '@/components/cesiumViewer.vue';
import login from '@/components/Login.vue';
import home from '@/components/Home.vue';
import chart from '@/components/charts.vue';
import mcode from '@/components/MQRCode.vue';
import User from '@/components/user.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/login',
        component: login,
        name: '',
        hidden: true,
    },
    {
        path: '/',
        name: '主页',
        component: home,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {
                path: '/Map',
                component: cesiumViewer,
                name: '地图',
            },
        ]
    },
    {
        path: '/',
        component: home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: login, name: '页面4' },
            { path: '/user', component: User, name: '用户信息' },
            { path: '/mqrcode', component: mcode, name: '二维码' }
        ]
    },
    {
        path: '/',
        name: '',
        component: home,
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/Chart', component: chart, name: '图表' }
        ]
    },
];

var route = new VueRouter({
    routes
})

export default route;