import Vue from 'vue';
import App from './app.vue';
import router from './router/index';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// Vue.config.productionTip = false;

router.beforeEach(
  (to,from,next)=>{
    if (to.path == '/login') {
      sessionStorage.removeItem('user');
    }
    let user =JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path !='/login') {
      next({
        path:'/login'
      });
    } else {
      next();
    }
  }
);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

