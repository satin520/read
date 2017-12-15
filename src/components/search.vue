<template>
	<div id="search">
		<div class="head">
			<i class="fa fa-angle-left" v-on:click="goBack"></i>搜索
		</div>
		<div class="search">
			<input ref="text" type="text" placeholder="请输入书名或作者" />
			<button @click="search"><i class="fa fa-search"></i></button>
		</div>
		
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
						<span>{{item.cat}}</span>
					</div>
				</div>
				<router-link :to="{name:'book',params:{id:item._id}}" class="bookA"></router-link>
			</div>
		</div>
		<div class="loading" v-show="$store.state.book.load"><i class="fa fa-spinner fa-pulse"></i></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				books: []
			}
		},
		created() {

		},
		methods: {
			goBack: function() {
				this.$router.go(-1)
			},
			search: function() {
				this.$store.commit('LoadShow')
				this.$http({
					url: 'http://novel.juhe.im/search?keyword=' + this.$refs.text.value + '',
					method: 'get'
				}).then(response => {
					this.books = response.body.data.books
					this.$store.commit('LoadHide')
				}, response => {
					//				console.log(err.status);
				})
			}
		}
	}
</script>

<style>
	#search{
		background: #fff;
		height: 100%;
		position: fixed;
		width: 100%;
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
	
	.search {
		margin: 70px 10px 10px;
		height: 40px;
		border-radius: 5px;
		overflow: hidden;
		border: 1px solid #0BA6F7;
		display: flex;
		
	}
	
	.search input {
		height: 40px;
		flex: 1;
		border: none;
		text-indent: 10px;
		box-sizing: border-box;
	}
	
	.search button {
		width: 40px;
		height: 40px;
		background: #0BA6F7;
		border: none;
	}
	
	.search button i {
		color: #fff;
		font-size: 18px;
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