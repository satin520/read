// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import $ from 'jquery'
Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.http.interceptors.push((request, next) => {
    let timeout;
    // 這裡改用 _timeout
    if (request._timeout) {
        timeout = setTimeout(() => {
　　　　　　　　//自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
            next(request.respondWith(request.body, {
                 status: 408,
                 statusText: '请求超时'
            }));
            
        }, request._timeout);
    }
    next((response) => {
　　　　return response;
    })
})