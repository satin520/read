<template>
	<div id="text">
		<div class="content">
			<div class="title">
				{{text.title}}
			</div>
			<p v-html="readTxt" id="txt"></p>
			<div class="btn">
				<a class="lf" id="lf" @click="prev">上一章</a>
				<a class="rt" id="rt" @click="next">下一章</a>
			</div>

		</div>
		<transition name="fade">
			<div class="read-hd" v-show="setting">
				<i class="fa fa-angle-left" @click="goBack"></i>
				<b>{{book.title}}</b>
				<span @click="refresh">刷新</span>
			</div>
		</transition>
		<transition name="fade">
			<div class="read-ft" v-show="setting">
				<transition name="fade">
					<div class="font set" v-show="isFontBox">
						<div class="ft-col">
							<a @click="ftC('#000')" style="background: #000000;"></a>
							<a @click="ftC('#fff')" style="background: #fff;"></a>
							<a @click="ftC('#0BA6F7')" style="background: #0BA6F7;"></a>
							<a @click="ftC('#42B983')" style="background: #42B983;"></a>

						</div>
						<p>
							<i @click="addFont">A+</i>
							<i @click="decFont">A-</i>
						</p>
					</div>
				</transition>
				<ul>
					<li><i class="fa fa-list"></i>
						<p>目录</p>
						<router-link to="/chapter" class="linkA"></router-link>
					</li>
					<li @click="fontBox"><i class="fa fa-font"></i>
						<p>字体</p>
					</li>
					<li>
						<i class="fa fa-area-chart"></i>
						<p>背景</p>
					</li>
					<li>
						<i class="fa fa-clipboard"></i>
						<p>换源</p>
						<router-link to="/source" class="linkA"></router-link>
					</li>
				</ul>

			</div>
		</transition>
		<transition name="fade">
			<div class="tipsBox" v-show="isTips">
				<p id="tips">内容</p>
				<p @click="tips">关闭</p>
			</div>
		</transition>
		<div class="click-area" @click="setBox"></div>
		<div class="loading" v-show="$store.state.book.load"><i class="fa fa-spinner fa-pulse"></i></div>
	</div>
</template>

<script>
	let conlf
	export default {
		data() {
			return {
				text: [],
				chapterNum: 0,
				source: [],
				souName: '',
				book:[],
				setting: false,
				isTips: false,
				isFontBox: false,
				chapters: []
			}
		},
		created() {
			if(this.$route.params.id){
				this.$store.commit('setCurrId',this.$route.params.id)
			}
			this.getData(this.$store.state.book.colletList)
			if(this.book.length === 0) {
				this.getData(this.$store.state.book.bookList)
			}
			this.chapterNum===0?this.chapterNum=1:this.chapterNum
			this.getTxt(this.chapterNum-1)
		},
		methods: {
			getData: function(obj) {
				for(let item in obj) {
					if(obj[item].id === this.$store.state.book.currId) {
						this.source = obj[item].source
						this.souName = obj[item].souName
						this.chapters = obj[item].chapters
						this.chapterNum = obj[item].chapterNum
						this.book = obj[item].book
						break
					}
				}
			},
			next: function() {
				if(this.chapterNum >= this.chapters.length) {
					$('#tips').text('已经是最后一章了')
					this.isTips = true
					return false
				} else {
					this.chapterNum++
						this.getTxt(this.chapterNum-1)
					this.$store.commit('updateChaptNum', {
						id: this.$route.params.id,
						chapterNum: this.chapterNum
					})
				}
				$('.content').scrollTop(0)
			},
			prev: function() {
				if(this.chapterNum <= 1) {
					$('#tips').text('已经是第一章')
					this.isTips = true
					return false
				} else {
					this.chapterNum--
					this.getTxt(this.chapterNum-1)
					this.$store.commit('updateChaptNum', {
						id: this.$route.params.id,
						chapterNum: this.chapterNum
					})
				}
				$('.content').scrollTop(0)
			},
			goBack: function() {
				this.$router.go(-1)
			},
			tips: function() {
				this.isTips = false
			},
			setBox: function() {
				if(this.setting) {
					this.setting = false
				} else {
					this.setting = true
				}
			},
			getTxt: function(chapterNum) {
				console.log(chapterNum)
				this.$store.commit('LoadShow')
				this.$http({
					url: 'http://novel.juhe.im/chapters/' + encodeURIComponent(this.chapters[chapterNum].link) + '',
					method: 'get',
					_timeout: 5000, //设置超时时间
				}).then(response => {
					this.text = response.body.data.chapter
					this.$store.commit('LoadHide')
				}, (err) => {
					this.$store.commit('LoadHide')
					this.isTips = true
					$('#tips').text(err.status + ':' + err.statusText)
				})
			},
			decFont: function() {
				let fs = parseInt($('#txt').css('fontSize'))
				if(fs <= 12) {
					this.isTips = true
					$('#tips').text('再小需要放大镜了')
				} else {
					$('#txt').css('fontSize', fs - 1)
				}
			},
			addFont: function() {
				let fs = parseInt($('#txt').css('fontSize'))
				if(fs >= 50) {
					this.isTips = true
					$('#tips').text('眼科电话10086')
				} else {
					$('#txt').css('fontSize', fs + 1)
				}
			},
			ftC: function(col) {
				$('#txt').css('color', col)
			},
			fontBox: function() {
				this.isFontBox ? this.isFontBox = false : this.isFontBox = true
			},
			refresh: function() {
				this.getTxt(this.chapterNum - 1)
			}
		},
		computed: {
			readTxt: function() {
				if(this.text.cpContent) {
					if(this.text.cpContent == null) { //防止报错
						return
					} else {
						return this.text.cpContent.replace(/\n/g, '<br/>').replace(/\t/g, '  ')
					}

				} else {
					if(this.text.body == null) {
						return
					} else {
						return this.text.body.replace(/\n/g, '<br/>').replace(/\t/g, '  ')
					}
				}

			}
		}
	}
</script>

<style>
	#text {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgb(233, 223, 199);
	}
	
	#text .content {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		box-sizing: border-box;
		padding: 10px;
	}
	
	.read-hd {
		position: fixed;
		height: 60px;
		width: 100%;
		top: 0;
		background-color: rgba(0, 0, 0, 0.8);
	}
	
	.read-hd b {
		font-size: 20px;
		color: #fff;
		font-weight: normal;
		line-height: 60px;
		margin-left: 35px;
	}
	
	.read-hd i {
		position: absolute;
		left: 10px;
		color: #fff;
		font-size: 30px;
		top: 14px;
	}
	
	.read-hd span {
		float: right;
		margin-right: 10px;
		line-height: 60px;
		font-size: 18px;
		color: #fff;
	}
	
	.read-ft {
		position: fixed;
		height: 60px;
		width: 100%;
		bottom: 0;
		color: #fff;
		font-size: 16px;
		background-color: rgba(0, 0, 0, 0.8);
	}
	
	.read-ft li {
		float: left;
		position: relative;
		width: 25%;
		padding-top: 8px;
		text-align: center;
	}
	
	.read-ft .set {
		border-bottom: 1px solid #666;
		position: absolute;
		width: 100%;
		padding: 10px 5%;
		box-sizing: border-box;
		top: -120px;
		height: 120px;
		background-color: rgba(0, 0, 0, 0.8);
	}
	
	.read-ft .set .ft-col {
		height: 40px;
		width: 100%;
		margin-bottom: 10px;
	}
	
	.read-ft .set .ft-col a {
		height: 30px;
		width: 30px;
		display: inline-block;
		margin-right: 10px;
		border-radius: 50%;
	}
	
	.read-ft .set p {
		float: left;
		border: 1px solid #fff;
		border-radius: 5px;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		height: 40px;
	}
	
	.read-ft .set p:after {
		content: '';
		background: #fff;
		height: 38px;
		width: 1px;
		position: absolute;
		left: 50%;
		top: 0;
	}
	
	.read-ft .set i {
		font-size: 24px;
		line-height: 40px;
		float: left;
		color: #fff;
		width: 50%;
		text-align: center;
		display: inline-block;
		font-style: normal;
	}
	
	.read-ft li p {
		line-height: 16px;
	}
	
	.read-ft i {
		color: #fff;
		font-size: 20px;
	}
	
	.tipsBox {
		height: 90px;
		width: 200px;
		position: absolute;
		left: 50%;
		margin-left: -100px;
		top: 50%;
		z-index: 99;
		background: rgba(0, 0, 0, 0.9);
		border-radius: 5px;
		margin-top: -45px;
	}
	
	.tipsBox p#tips {
		font-size: 16px;
	}
	
	.tipsBox p {
		text-align: center;
		font-size: 18px;
		color: #fff;
		line-height: 45px;
		border-top: 1px solid #999;
	}
	
	.content .title {
		font-size: 20px;
		padding: 10px 0;
		margin-bottom: 20px;
		color: #333;
		border-bottom: 1px solid #666;
	}
	
	.content .btn {
		margin: 20px 0 10px;
		text-align: center;
	}
	
	.content .btn a {
		padding: 5px 10px;
		border-radius: 5px;
		display: inline-block;
		background: #333;
		margin: 0 5px;
		color: #fff;
	}
	
	.click-area {
		position: absolute;
		width: 30%;
		height: 20%;
		top: 40%;
		left: 35%;
	}
</style>