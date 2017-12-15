import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import type from '@/components/type'
import typeShow from '@/components/typeShow'
import book from '@/components/book'
import read from '@/components/read'
import source from '@/components/source'
import chapter from '@/components/chapter'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/type',
			name: 'type',
			component: type,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/typeShow/:gender/:name',
			name: 'typeShow',
			component: typeShow,
			meta: {
				keepAlive: true,
				isBack: true
			}
		},
		{
			path: '/book/:id',
			name: 'book',
			component: book
		},
		{
			path: '/read',
			name: 'read',
			component: read
		},
		{
			path: '/source',
			name: 'source',
			component: source
		},
		{
			path: '/chapter',
			name: 'chapter',
			component: chapter
		},
		{
			path: '/search',
			name: 'search',
			component: search,
			meta: {
				keepAlive: true
			}
		}
	],
	//缓存页返回到原来滚动条  位置
	 scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return {
              x: 0,
              y: 0
          }
      }
}
	 //虽然前进刷新了后退不刷新，但返回是第一次进入的页面内容
//	 scrollBehavior (to, from, savedPosition) {
//      if (savedPosition || typeof savedPosition == 'undefined') { //从第二页返回首页时savePosition为undefined
//          //只处理设置了路由元信息的组件
//          from.meta.isKeepAlive = typeof from.meta.isKeepAlive == 'undefined' ? undefined : false;
//          to.meta.isKeepAlive = typeof to.meta.isKeepAlive == 'undefined' ? undefined : true;
//          if(savedPosition) {
//              return savedPosition;
//          }
//      } else {
//          from.meta.isKeepAlive = typeof from.meta.isKeepAlive == 'undefined' ? undefined : true;
//          to.meta.isKeepAlive = typeof to.meta.isKeepAlive == 'undefined' ? undefined : false;
//      }
//  }
})