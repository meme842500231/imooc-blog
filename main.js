
import Vue from 'vue'
import App from './App'
import './styles/global.scss'
import store from "./store"
import './styles/article.scss'
Vue.config.productionTip = false

App.mpType = 'app'

// 挂载方法1，给Vue挂载$store对象，值是store
Vue.prototype.$store = store

const app = new Vue({
	// 挂载方式2，直接在new Vue的时候传入store，es6简写形式
	// store,
    ...App
})
app.$mount()