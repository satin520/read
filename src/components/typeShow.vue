<template>
	<div class="type">
		<div class="head">
			<i class="fa fa-angle-left" v-on:click="goBack"></i>{{this.$route.params.name}}
		</div>
		<div class="scroll">
			<div class="books">
				<div class="book" v-for="item in books">
					<div class="lf-img">
						<img :src="'http://statics.zhuishushenqi.com' + item.cover" />
					</div>
					<div class="rt-txt">
						<div class="tl">
							{{item.title}}
						</div>
						<div class="intro">
							{{item.shortIntro}}
						</div>
						<div class="info">
							<b>{{item.author}}</b>
							<span>{{item.minorCate}}</span>
						</div>
					</div>
					<router-link :to="{name:'book',params:{id:item._id}}" class="bookA"></router-link>
				</div>
			</div>
		</div>
		<div class="loading" v-show="$store.state.book.load"><i class="fa fa-spinner fa-pulse"></i></div>
	</div>
</template>

<script>
	let indexScrollTop =0
	export default {
		data() {
			return {
				books: [],
				gender: this.$route.params.gender,
				limit: 20,
				isFirstEnter: false
			}
		},
		created() {
			this.isFirstEnter = true
			// 只有第一次进入或者刷新页面后才会执行此钩子函数
			// 使用keep-alive后（2+次）进入不会再执行此钩子函数
		},
		activated() {
			if(!this.$route.meta.isBack || this.isFirstEnter) {
				// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
				// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
				this.limit = 20 //书籍限制还原
				this.books = [] // 把数据清空，可以稍微避免让用户看到之前缓存的数据
				this.getBooks()
			}
			// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
			this.$route.meta.isBack = false
			// 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
			this.isFirstEnter = false

		},
		beforeRouteEnter(to, from, next) {
			// 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
			// 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
			// 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
			// 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
			if(from.name == 'book') {
				to.meta.isBack = true
				//判断是从哪个路由过来的，
				//如果是book过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
			}
			next();
		},
		mounted() {
			$(window).scroll(this.scrollMethod)
		},
		methods: {
			scrollMethod: function() {
				const bookH = $('.scroll').outerHeight()
				const viewH = $(window).height()
				const scrollH = $(window).scrollTop()
				if(scrollH + viewH === bookH) {
					this.switchShow = true
					this.limit = this.limit + 20
					this.getBooks()
				}
			},
			getBooks: function() {
				this.$store.commit('LoadShow')
				this.$http({
					url: 'http://novel.juhe.im/category-info?gender=' + this.gender + '&type=hot&major=' + this.$route.params.name + '&minor=&start=' + (this.limit - 20) + '&limit=' + this.limit + '',
					method: 'get'
				}).then(response => {
					this.switchShow = false
					this.books = this.books.concat(response.body.data.books)
					this.$store.commit('LoadHide')
				}, response => {})
			},
			goBack: function() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
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
	
	.head i{
		position: absolute;
		left: 10px;
		font-size: 30px;
		top: 15px;
	}
	.type {
		width: 100%;
		height: 100%;
	}
	
	.scroll {
		width: 100%;
		height: 100%;
		padding-top: 60px;
		
		box-sizing: border-box;
	}
	
	.books {
		height: 100%;
		padding: 0px 10px;
		box-sizing: border-box;
		background: #fff;
		
		overflow-x: hidden;
	}
	.books div.book {
		padding: 10px 10px 10px 0;
		border-bottom: 1px solid #ccc;
		position: relative;
		display: flex;
	}
	.books div.book:last-child{
		border-bottom:0;
	}
	.books a.bookA {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.books a.bookA:active {
		background: #000;
		opacity: 0.3;
	}
	
	.books .lf-img {
		float: left;
		width: 70px;
	}
	
	.books .lf-img img {
		display: inline-block;
		width: 70px;
		height: 100px;
	}
	
	.books .rt-txt {
		height: 100px;
		overflow: hidden;
		margin-left: 10px;
		flex: 1;
	}
	
	.books .rt-txt .tl {
		color: #000;
	}
	
	.books .rt-txt .intro {
		margin-top: 5px;
		font-size: 12px;
		line-height: 1.6em;
		height: 3.2em;
		color: #555;
		overflow: hidden;
	}
	
	.books .info {
		margin-top: 5px;
		position: relative;
	}
	
	.books .info b {
		font-size: 12px;
		font-weight: normal;
		color: #0ba6f7;
	}
	
	.books .info span {
		position: absolute;
		right: 0;
		bottom: 0;
		border: 1px solid #42B983;
		color: #42B983;
		font-size: 12px;
		box-sizing: border-box;
		padding: 0 5px;
		float: right;
		border-radius: 5px;
	}
</style>