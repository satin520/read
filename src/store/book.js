export default {
	state: {
		bookList: [],
		colletList: [],
		mLoad:false,
		load:false,
		currId:''
	},
	mutations: {
		addBook(state, book) {
			for(let item in state.bookList) {
				if(state.bookList[item].id === book.id) {
					return false
				}
			}
			state.bookList.unshift(book)
		},
		updateSou(state, obj) {
			for(let item in state.bookList) {
				if(state.bookList[item].id === obj.id) {
					state.bookList[item].souId = obj.souId
					state.bookList[item].souName = obj.souName
					state.bookList[item].lastChapter = obj.lastChapter
					break
				}
			}
			for(let item in state.colletList) {
				if(state.colletList[item].id === obj.id) {
					state.colletList[item].souId = obj.souId
					state.colletList[item].souName = obj.souName
					state.colletList[item].lastChapter = obj.lastChapter
					window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
					return state.colletList
				}
			}
		},
		updateChapt(state, obj) {
			for(let item in state.bookList) {
				if(state.bookList[item].id === obj.id) {
					state.bookList[item].chapters = obj.chapters
					break
				}
			}
			for(let item in state.colletList) {
				if(state.colletList[item].id === obj.id) {
					state.colletList[item].chapters = obj.chapters
					window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
					return state.colletList
				}
			}
		},
		updateChaptNum(state, obj) {
			for(let item in state.bookList) {
				if(state.bookList[item].id === obj.id) {
					state.bookList[item].chapterNum = obj.chapterNum
					break
				}
			}
			for(let item in state.colletList) {
				if(state.colletList[item].id === obj.id) {
					state.colletList[item].chapterNum = obj.chapterNum
					window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
					return state.colletList
				}
			}
		},
		addCollet(state, book) {
			state.colletList.unshift(book)
			window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
		},
		updateCollet(state,obj){
			for(let item in state.colletList){
				if(state.colletList[item].id === obj.id){
					state.colletList[item].lastChapter=obj.lastChapter
					window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
					return;
				}
			}
		},
		updateCollet2(state,obj){
			for(let item in state.colletList){
				if(state.colletList[item].id === obj.id){
					state.colletList[item].chapters=obj.chapters
					window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
					return;
				}
			}
		},
		removeCollet(state, bookId) {
			for(let item in state.colletList) {
				if(state.colletList[item].id === bookId) {
					state.colletList.splice(item, 1)
					window.localStorage.setItem("colletList", JSON.stringify(state.colletList))
					return state.colletList
				}
			}
		},
		getLocal(state) {
			if(window.localStorage.getItem("colletList")){
				state.colletList = JSON.parse(window.localStorage.getItem("colletList"))
			}
		},
		setCurrId(state,id){
			state.currId=id
		},
		mLoadShow(state){
			state.mLoad=true
		},
		mLoadHide(state){
			state.mLoad=false
		},
		LoadShow(state){
			state.load=true
		},
		LoadHide(state){
			state.load=false
		}
		//		updateSou(state,obj){
		//			for(let item in state.bookList) {
		//				if(state.bookList[item]._id === obj._id) {
		//					state.bookList[item].souId=obj.souId
		//					state.bookList[item].souName=obj.souName
		//					window.localStorage.setItem("bookList", JSON.stringify(state.bookList))
		//					return state.bookList
		//				}
		//			}
		//		},
		//		updateChapt(state,obj){
		//			for(let item in state.bookList) {
		//				if(state.bookList[item]._id === obj._id) {
		//					state.bookList[item].index=obj.index
		//					console.log(state.bookList[item])
		//					window.localStorage.setItem("bookList", JSON.stringify(state.bookList))
		//					return state.bookList
		//				}
		//			}
		//		},

	}
}