<template>
	<div id="type">
		<div class="head">
			<i class="fa fa-angle-left" v-on:click="goBack"></i>分类
		</div>
		<div class="container">
			<div class="main">
				<h3>
				男生频道
			</h3>
				<div class="list">
					<router-link :to="{name:'typeShow',params:{gender:'male',name:item.name}}" v-for="item in type.male" class="item1">{{item.name}}</router-link>
				</div>
			</div>
			<div class="main">
				<h3>
				女生频道
			</h3>
				<div class="list list2">
					<router-link :to="{name:'typeShow',params:{gender:'female',name:item.name}}" v-for="item in type.female" class="item1">{{item.name}}</router-link>
				</div>
			</div>
		</div>
		<div class="loading" v-show="$store.state.book.load"><i class="fa fa-spinner fa-pulse"></i></div>
	</div>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				type: []
			}
		},
		created() {
			this.$store.commit('LoadShow')
			this.$http({
				url: 'http://novel.juhe.im/categories',
				method: 'get'
			}).then(response => {
				this.type = response.body.data
				this.$store.commit('LoadHide')
			}, response => {})
		},
		methods: {
			goBack: function() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	#type {
		position: fixed;
		height: 100%;
		width: 100%;
	}
	
	.container {
		overflow-y: scroll;
		height: 100%;
	}
	
	.head {
		text-align: center;
		background: #18b4fd;
		line-height: 60px;
		height: 60px;
		font-size: 20px;
		color: #fff;
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	
	.head i {
		position: absolute;
		left: 10px;
		font-size: 30px;
		top: 15px;
	}
	
	.main {
		padding-top: 60px;
		box-sizing: border-box;
		background: #fff;
		margin-top: 10px;
	}
	
	.main h3 {
		font-size: 16px;
		line-height: 40px;
	}
	
	.main h3:before {
		content: '';
		height: 18px;
		width: 5px;
		background: #18b4fd;
		margin-left: 10px;
		margin-top: 9px;
		margin-right: 10px;
		border-radius: 10px;
		float: left;
	}
	
	.list a {
		width: 33.3%;
		text-align: center;
		height: 60px;
		line-height: 60px;
		font-size: 20px;
		color: #000;
		display: inline-block;
	}
	
	.list a:nth-child(even) {
		background: #eee;
	}
	
	.tl2 {
		margin-top: 20px;
	}
</style>