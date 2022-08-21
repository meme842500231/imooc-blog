import request from "../utils/request"
export function getSearchText(){
	return request({
		url:"/search/default-text"
	})
}
export function getHotsearch(){
	return request({
		url:"/search/hot-list"
	})
}
export function getSearchResult(data){
	return request({
		url:'/search',
		data
	})
}