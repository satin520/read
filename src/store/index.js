import Vue from 'vue'
import Vuex from 'vuex'
import Book from './book.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book: Book
  }
})