import request from "../utils/request"
export function getHotVideo(data) {
	return request({
		url: '/video/list',
		data
	});
}
export function getVideoDanmuList(data) {
	return request({
		url: '/video/danmu',
		data
	});
}
