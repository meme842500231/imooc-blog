const STORAGE_KEY = 'search-list'
const STORAGE_history=6
export default {
	namespaced: true,

	// 方式1：
	state: () => {
		return {
			searchData:uni.getStorageSync(STORAGE_KEY)|| []
		}
	},

	// 方式2： 
	// state: {
	// 	searchData: []
	// }



	mutations: {
		saveToStorage(state) {
			uni.setStorage({
				data: state.searchData,	
				key: STORAGE_KEY
			})
		},
		addsearch(state, val) {
			if (!val) return
			const found = state.searchData.findIndex(item => item === val)
			if (found !== -1) {
				state.searchData.splice(found, 1)
			}
			state.searchData.unshift(val)
			this.commit('searchVue/saveToStorage')
			if(state.searchData.length>STORAGE_history){
				state.searchData.splice(STORAGE_history,state.searchData.length-STORAGE_history)
			}
		},
		sureDeleteOne(state, index) {
			state.searchData.splice(index, 1)
			this.commit('searchVue/saveToStorage')
		},
		sureDeleteAll(state) {
			state.searchData = []
			this.commit('searchVue/saveToStorage')
		}

	}
}
