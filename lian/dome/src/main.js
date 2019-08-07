// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store/store'
Axios.prototype.axios = "Axios";
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if (to.meta.requireAuth){ //判断该路由是否需要登陆权限
    if (store.state.token){  // 通过vuex state获取当前的token是否存在

      next();
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
      next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
