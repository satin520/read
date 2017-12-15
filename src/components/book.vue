<template>
	<div id="book">
		<div class="container">
			<div class="book">
				<div class="top">
					<i class="fa fa-angle-left" v-on:click="goBack"></i>
				</div>
				<div class="cover">
					<img :src="'http://statics.zhuishushenqi.com' + book.cover" />
				</div>
				<div class="rt-txt">
					<div class="tl">
						{{book.title}}
					</div>
					<div class="author">
						作者：{{book.author}}
					</div>
					<div class="info">
						{{book.majorCate}}&nbsp;|&nbsp;<span v-if="book.isSerial===true">连载</span><span v-else>完结</span>&nbsp;|&nbsp;{{(book.wordCount/10000).toFixed(1)}}万字
					</div>
				</div>
			</div>
			<div class="intro">
				{{book.longIntro}}
			</div>
			<div class="source">
				<div class="hd">来源<b>共{{source.length}}个来源</b></div>
				<div class="cur-sou">当前使用：<b>{{souName}}</b></div>
				<router-link to="/source" class="linkA"></router-link>
			</div>
			<div class="catalog">
				<div class="hd">目录<b>共{{chapters.length}}章</b></div>
				<div>最新章节：{{lastChapter}}</div>
				<div class="cur-chap">阅读进度：
					<b v-if="chapterNum==0">未阅读</b>
					<b v-else>{{speed}}% (已读{{chapterNum}}章)</b>
				</div>
				<router-link to="/chapter" class="linkA"></router-link>
			</div>
			<div class="bottom">
				<a @click="collet(isCollet)" :class="[isCollet?'collet':'noCollet']"></a>
				<router-link to="/read" class="read">阅读</router-link>
			</div>
			<div class="min-loading" v-show="$store.state.book.mLoad"><i class="fa fa-spinner fa-pulse"></i></div>
			<div class="loading" v-show="$store.state.book.load"><i class="fa fa-spinner fa-pulse"></i></div>
		</div>
	</div>
</template>

<script>
	let maxChapter = 0
	export default {
		data() {
			return {
				book: [],
				source: [],
				chapters: [],
				bookList: [], //收藏书籍的内容
				bestId: 0, //最佳资源索引
				lastChapter: '', //最后的章节
				souName: '', //当前选择资源名
				souId: '', //当前选择资源id
				chapterNum: 0, //当前章节
				isCollet: false //收藏状态
			}
		},
		created() {
			
			this.$store.commit('getLocal')
			this.$store.commit('setCurrId',this.$route.params.id)
			this.getData(this.$store.state.book.colletList)
			if(this.book.length === 0) {
				this.getData(this.$store.state.book.bookList)
			}
			if(this.book.length === 0) {
				this.getBook()
				this.getSource()
			}
		},
		beforeRouteLeave(to, from, next) {
			this.$store.commit('addBook', {
				id: this.$route.params.id,
				souName: this.souName,
				book: this.book,
				source: this.source,
				souId:this.souId,
				chapters: this.chapters,
				lastChapter: this.lastChapter,
				chapterNum: this.chapterNum,
				isCollet: this.isCollet
			})
			next()
		},
		methods: {
			getBook: function() {
				this.$store.commit('LoadShow')
				this.$http({
					url: 'http://novel.juhe.im/book-info/' + this.$route.params.id + '',
					method: 'get'
				}).then(response => {
					this.book = response.body.data
					this.$store.commit('LoadHide')
				}, response => {
					//console.log(err.status);
				})
			},
			getSource: function() {
				this.$http({
					url: 'http://novel.juhe.im/book-sources?view=summary&book=' + this.$route.params.id + '',
					method: 'get'
				}).then(response => {
					this.source = response.body.data
					//根据更新日期自动选择资源
					for(let i in this.source) {
						maxChapter=this.compareDate(maxChapter,this.source[i].updated)
						if(maxChapter===this.source[i].updated){
							this.bestId = i
						}
					}
					this.souName = this.source[this.bestId].name
					this.souId = this.source[this.bestId]._id
					this.lastChapter = this.source[this.bestId].lastChapter
					this.$store.commit('mLoadShow')
					this.$http({
						url: 'http://novel.juhe.im/book-chapters/' + this.souId + '',
						method: 'get'
					}).then(response => {
						this.chapters = response.body.data.chapters
						this.$store.commit('mLoadHide')
						
					})
				}, response => {
					//console.log(err.status);
				})

			},
			compareDate:function(date1, date2) {
				var oDate1 = new Date(date1);
				var oDate2 = new Date(date2);
				if(oDate1.getTime() > oDate2.getTime()) {
					return date1
				} else {
					return date2
				}
			},
			getData:function(obj) {
				for(let item in obj) {
					if(obj[item].id === this.$route.params.id) {
						this.mLoad = false
						this.book = obj[item].book
						this.souName = obj[item].souName
						this.source = obj[item].source
						this.chapters = obj[item].chapters
						this.lastChapter = obj[item].lastChapter
						this.chapterNum = obj[item].chapterNum
						this.isCollet = obj[item].isCollet
						break
					}
				}
			},
			goBack: function() {
				this.$router.go(-1)
			},
			collet: function(iscollet) {
				if(this.isCollet) {
					this.isCollet = false
					this.$store.commit('removeCollet', this.book._id)
				} else {
					this.isCollet = true
					this.$store.commit('addCollet', {
						id: this.$route.params.id,
						souName: this.souName,
						book: this.book,
						source: this.source,
						chapters: this.chapters,
						souId:this.souId,
						lastChapter: this.lastChapter,
						chapterNum: this.chapterNum,
						isCollet: this.isCollet
					})
				}
			}
		},
		computed: {
			speed: function() {
				this.chapterNum >this.chapters.length?this.chapterNum=this.chapters.length:this.chapterNum
				return(Math.round(this.chapterNum / this.chapters.length * 10000) / 100).toFixed(2)
			}
		}
	}
</script>

<style>
	#book {
		height: 100%;
		box-sizing: content-box;
		padding-bottom: 60px;
		top: 0;
		width: 100%;
		position: fixed;
	}
	.container {
		overflow-y: scroll;
		height: 100%;
	}
	
	#book .book {
		background: linear-gradient(#888, #333, #111);
		height: 150px;
		position: relative;
		padding-top: 30px;
	}
	
	#book .book .top {
		position: fixed;
		top: 30px;
		z-index: 99;
		height: 30px;
		margin-top: -30px;
	}
	
	#book .book .top i {
		position: absolute;
		left: 10px;
		color: #fff;
		font-size: 30px;
		top: 15px;
	}
	
	#book .book .cover {
		width: 126px;
		position: absolute;
		top: 55px;
		left: 20px;
	}
	
	#book .book .cover img {
		height: 180px;
		width: 126px;
	}
	
	#book .book .rt-txt {
		position: absolute;
		top: 70px;
		left: 176px;
		color: #fff;
	}
	
	#book .book .rt-txt .tl {
		font-size: 18px;
	}
	
	#book .book .rt-txt .author {
		margin-top: 10px;
	}
	
	#book .intro {
		padding: 70px 10px 10px 10px;
		background: #fff;
		color: #333;
	}
	
	.source,
	.catalog {
		background: #fff;
		padding: 10px;
		position: relative;
		border-top: 1px solid #aaa;
		border-bottom: 1px solid #ddd;
		margin-top: 10px;
		color: #333;
	}
	
	.source .hd,
	.catalog .hd {
		font-size: 16px;
	}
	
	.source .hd b,
	.catalog .hd b {
		font-weight: normal;
		float: right;
	}
	
	.cur-chap b {
		font-weight: normal;
	}
	.linkA{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 60px;
		left: 0;
	}
	
	.bottom a {
		background: #fff;
		width: 50%;
		float: left;
		text-align: center;
		line-height: 60px;
		font-size: 18px;
		color: red;
	}
	
	.bottom a.noCollet:after {
		content: '收藏书籍';
	}
	
	.bottom a.collet:after {
		content: '取消收藏';
	}
	
	.bottom a.collet {
		background: #666;
		color: #fff;
	}
	
	.bottom a.read {
		background: red;
		color: #fff;
	}
	
	.min-loading {
		height: 185px;
		margin-top: -185px;
		text-align: center;
		position: relative;
		width: 100%;
		background: rgba(255, 255, 255, 0.5);
	}
	
	.min-loading i {
		font-size: 30px;
		position: absolute;
		top: 50%;
		margin-top: -0.5em;
		margin-left: -0.5em;
	}
</style>