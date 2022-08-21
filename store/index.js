import Vue from "vue"
import Vuex from "vuex"
import searchVue from './modules/searchVue.js'
import user from './modules/user.js'
import video from './modules/video'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		searchVue,
		user,
		video
	}
})
export default store


