<template>
	<div id="chapter">
		<div class="head">
			<i class="fa fa-angle-left" @click="goBack"></i>章节列表
		</div>
		<div class="chapter">
			<ul>
				<li v-for="(item,index) in chapters" @click="getChapter(index+1)" :class="{active:index===chapterNum-1}">{{index+1}}.&nbsp;&nbsp;{{item.title}}</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				souId: '',
				chapterNum:0,
				chapters: []
			}
		},
		created() {
			this.getData(this.$store.state.book.bookList)
		},
		methods: {
			goBack: function() {
				this.$router.go(-1)
			},
			getChapter: function(index) {
				this.$store.commit('updateChaptNum', {
					id: this.$store.state.book.currId,
					chapterNum: index
				})
				this.$router.go(-1)
			},
			getData:function(obj) {
				for(let item in obj) {
					if(obj[item].id === this.$store.state.book.currId) {
						this.souId = obj[item].souId
						this.chapters = obj[item].chapters
						this.chapterNum = obj[item].chapterNum
						break
					}
				}
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
	
	#chapter {
		position: absolute;
		left: 0;
		top: 60px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background: #fff;
		overflow-y: scroll;
	}
	
	#chapter .chapter {
		height: 100%;
		box-sizing: border-box;
	}
	
	#chapter .chapter ul li {
		border-bottom: 1px solid #ccc;
		padding: 5px 0;
		position: relative;
		text-indent: 15px;
	}
	
	#chapter .chapter ul li.active {
		color: #18b4fd;
	}
</style>