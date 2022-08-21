import request from "../utils/request"
export function getHotTabs() {
	return request({
		url: '/hot/tabs'
	})
}
export function getHotTabList(type){
	return request({
		url: '/hot/list',
		data:{
			type
		}
	})
}
