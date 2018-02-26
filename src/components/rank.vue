<template>
	<div class="type">
		<div class="head">
			<i class="fa fa-angle-left" v-on:click="goBack"></i>热门排行榜
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
	export default {
		data() {
			return {
				books: []
			}
		},
		created() {
			this.$store.commit('LoadShow')
				this.$http({
					url: 'http://novel.juhe.im/rank/54d42d92321052167dfb75e3',
					method: 'get'
				}).then(response => {
					this.books = response.body.data.ranking.books
					this.$store.commit('LoadHide')
				}, response => {})
		},
		methods:{
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