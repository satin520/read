<template>
	<div id="source">
		<div class="head">
			<i class="fa fa-angle-left" @click="goBack"></i>选择来源
		</div>
		<div class="curSource">
			<h3>当前源</h3>
			<div class="item" @click="getSource(item.name,item._id,item.lastChapter)" v-for="(item,index) in source" v-if="item.name==souName">
				<span>{{item.lastChapter}}</span>
				<b>{{souName}}</b>
			</div>
		</div>
		<div class="sourceList">
			<h3>其他源</h3>
			<div class="item" v-for="(item,index) in source" @click="getSource(item.name,item._id,item.lastChapter)" v-if="item.name!=souName">
				<span>{{item.lastChapter}}</span>
				<b>{{item.name}}</b>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				source: [],
				souName: '',
				chapters:[]
			}
		},
		created() {
			this.getData(this.$store.state.book.bookList)
		},
		methods: {
			goBack: function() {
				this.$router.go(-1)
			},
			getSource: function(souName, souId, lastChapter) {
				this.$store.commit('mLoadShow')
				this.$store.commit('updateSou', {
					id: this.$store.state.book.currId,
					souId: souId,
					souName: souName,
					lastChapter: lastChapter
				})
				this.getChapter(souId)
				this.$router.go(-1)

			},
			getData: function(obj) {
				for(let item in obj) {
					if(obj[item].id === this.$store.state.book.currId) {
						this.source = obj[item].source
						this.souName = obj[item].souName
						break
					}
				}
			},
			getChapter: function(souId) {
				
				this.$http({
					url: 'http://novel.juhe.im/book-chapters/' + souId + '',
					method: 'get'
				}).then(response => {
					this.chapters = response.body.data.chapters
					this.$store.commit('updateChapt', {
					id: this.$store.state.book.currId,
					chapters: this.chapters
					})
					this.$store.commit('mLoadHide')
				})
				
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
	
	.head i {
		position: absolute;
		left: 10px;
		font-size: 30px;
		top: 15px;
	}
	
	#source {
		position: absolute;
		left: 0;
		top: 60px;
		overflow-y: scroll;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.curSource h3,
	.sourceList h3 {
		font-size: 14px;
		background: #ddd;
		color: #666;
		padding-left: 10px;
		line-height: 30px;
	}
	
	.curSource .item,
	.sourceList .item {
		padding: 10px 10px 30px 10px;
		position: relative;
	}
	
	.curSource .item:after,
	.sourceList .item:after {
		content: '>';
		position: absolute;
		right: 20px;
		line-height: 24px;
		font-size: 24px;
		color: #666;
	}
	
	.curSource span,
	.sourceList span {
		color: #000;
		padding-right: 60px;
	}
	
	.curSource b,
	.sourceList b {
		font-size: 12px;
		color: #666;
		font-weight: normal;
		position: absolute;
		bottom: 10px;
		right: 40px;
	}
	
	.sourceList .item {
		border-bottom: 1px solid #ccc;
	}
</style>