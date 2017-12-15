<template>
  <div id="app">
  	<!--<router-view ></router-view>-->
  	<transition name='fade-left'>
  	 <keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name='fade'>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
	background: #eee;
}
.loading {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 9999;
		background: rgba(255, 255, 255, 0.5);
		text-align: center;
	}
	
	.loading i {
		color: #333;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -0.5em;
		margin-left: -0.5em;
		font-size: 50px;
	}
	.fade-left-enter-active,
	.fade-leave-active {
		transition: all .3s
	}
	
	.fade-left-enter{
		margin-left: -30%;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
