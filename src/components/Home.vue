<template>
	<div class="home">
		<div class="head">
			终点网
		</div>
		<div class="type">
			<div class="item">
				<router-link to="/type" class="item1"></router-link>
			</div>
			<div class="item">
				<router-link to="/search" class="item2"></router-link>
			</div>
			<div class="item">
				<router-link to="/rank" class="item3 "></router-link>
			</div>
		</div>
		<div class="collect">
			<div class="hd">
				书架
			</div>
			
			<div class="item" v-for="(item,index) in $store.state.book.colletList" @click="showBtn($event)" >
				<div class="lf-img">
					<img :src="'http://statics.zhuishushenqi.com' + item.book.cover" />
					<i v-if="item.chapters.length-item.chapterNum>99">99+</i>
					<i v-else>{{item.chapters.length-item.chapterNum}}</i>
				</div>
				<div class="rt-txt">
					<p class="title">
						{{item.book.title}}
					</p>
					<p class="lastChapter">
						{{item.lastChapter}}
					</p>
					<p class="author">
						{{item.book.author}}
					</p>
				</div>
				<div class="btn">
					<router-link :to="{name:'read',params:{id:item.id}}" class="col1">阅读</router-link>
					<router-link :to="{name:'book',params:{id:item.id}}" class="col2">详细</router-link>
					<a @click="remove(item.id)" class="col3">删除</a>
				</div>
			</div>
		</div>
		<div class="loading" v-show="loading"><i class="fa fa-spinner fa-pulse"></i></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false
			}
		},
		created() {
//			localStorage.clear()
			this.$store.commit('getLocal')
			this.getBook()

		},
		methods: {
			getBook: function() {
				if(this.$store.state.book.colletList.length!=0){
					this.loading=true
				for(let i in this.$store.state.book.colletList) {
					let souId = this.$store.state.book.colletList[i].souId
					let bookId = this.$store.state.book.colletList[i].id
					this.$http({
						url: 'http://novel.juhe.im/book-sources?view=summary&book=' + bookId + '',
						method: 'get'
					}).then(response => {
						for(let i in response.body.data) {
							if(response.body.data[i]._id === souId) {
								this.$store.commit('updateCollet', {
									id: bookId,
									lastChapter: response.body.data[i].lastChapter
								})
								break;
							}
								this.loading = false
						}
					}, response => {
						//				console.log(err.status);
					})
					
					this.$http({
						url: 'http://novel.juhe.im/book-chapters/' + souId + '',
						method: 'get'
					}).then(response => {
						this.$store.commit('updateCollet2', {
							id: bookId,
							chapters: response.body.data.chapters
						})
					}, response => {
						//				console.log(err.status);
					})
				
				}
				}
				
			},
			showBtn:function(event){
				$(event.currentTarget).find('.btn').toggleClass('show')
			},
			remove:function(bookId){
				this.$store.commit('removeCollet', bookId)
			}
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	
	.type {
		padding-top: 60px;
		background: #fff;
		height: 80px;
		position: static;
	}
	
	.type:after {
		content: '';
		display: block;
		clear: both;
	}
	
	.type .item {
		width: 20%;
		padding: 10px 0;
		float: left;
		text-align: center;
	}
	
	.type a {
		width: 52px;
		height: 52px;
		position: relative;
		display: inline-block;
		border-radius: 50%;
		background: #18b4fd;
	}
	.type a.item2{
		background: #42B983;
	}
	.type a.item3{
		background: #ff6600;
	}
	.type a.item1:after {
		content: '分类';
		position: absolute;
		left: 1px;
		top: 1px;
		border: 1px solid #fff;
		border-radius: 50%;
		display: block;
		height: 48px;
		line-height: 48px;
		color: #fff;
		width: 48px;
	}
		.type a.item2:after {
		content: '搜索';
		position: absolute;
		left: 1px;
		top: 1px;
		border: 1px solid #fff;
		border-radius: 50%;
		display: block;
		height: 48px;
		line-height: 48px;
		color: #fff;
		width: 48px;
	}
	.type a.item3:after {
		content: '排行';
		position: absolute;
		left: 1px;
		top: 1px;
		border: 1px solid #fff;
		border-radius: 50%;
		display: block;
		height: 48px;
		line-height: 48px;
		color: #fff;
		width: 48px;
	}
	.home .collect {
		margin-top: 10px;
		border-bottom: 1px solid #ccc;
		background: #fff;
	}
	
	.home .collect .hd {
		border-bottom: 1px solid #ccc;
		line-height: 30px;
	}
	
	.home .collect .hd:after {
		content: '';
		display: block;
		float: left;
		height: 14px;
		width: 4px;
		margin-top: 8px;
		margin: 8px 6px 0 10px;
		background: #18b4fd;
	}
	
	.home .collect .item {
		padding: 10px 0 10px 10px;
		height: 100px;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		position: relative;
		justify-content:space-between;
		border-bottom: 1px solid #ccc;
		
	}
	.home .collect .item .btn{
		position: absolute;
		right: -100%;
		top:0px;
		transition: all 0.3s;
	}
	.home .collect .item .show{
		right: 0;
	}
	.home .collect .item .btn a{
		display: block;
		height: 100%;
		float: left;
		line-height: 80px;
		font-size: 18px;
		padding: 10px 20px;
		color: #fff;
		border-right: 1px solid #fff;
	}
	.home .collect .item .btn a.col1{
		background: gray;
	}
	.home .collect .item .btn a.col2{
		background: goldenrod;
	}
	.home .collect .item .btn a.col3{
		background: red;
	}
	.home .collect .item .lf-img {
		float: left;
		position: relative;
	}
	.home .collect .item .lf-img i{
		position: absolute;
		right: -5px;
		top: -5px;
		width: 24px;
		font-style: normal;
		color: #fff;
		text-align: center;
		line-height: 24px;
		font-size: 12px;
		height: 24px;
		border-radius: 50%;
		background: #FF0000;
	}
	.home .collect .item img {
		height: 80px;
		width: 56px;
	}
	
	.home .collect .item .rt-txt {
		margin-left: 10px;
		flex: 1;
	}

	.home .collect .item .rt-txt .title {
		font-size: 16px;
		color: #000;
	}
	.home .collect .item 
	.home .collect .item .rt-txt .lastChapter {
		font-size: 14px;
		color: #333;
	}
	
	.home .collect .item .rt-txt .author {
		font-size: 12px;
		margin-top: 5px;
		color: #18B4FD;
	}
	
	.home .collect .item:last-child {
		border-bottom: 0;
	}
</style>