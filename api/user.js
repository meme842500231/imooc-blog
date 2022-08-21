import request from '../utils/request'
export function login(data) {
	return request({
		url: '/sys/login',
		method: 'POST',
		data
	})
}
export function userFollow(data) {
	return request({
		url: '/user/follow',
		data

	})

}
export function sendCommit(data) {
	return request({
		url: '/user/article/comment',
		method:'POST',
		data

	})

}
export function userPraise(data) {
	return request({
		url: '/user/praise',
		data

	})

}
export function userCollect(data) {
	return request({
		url: '/user/collect',
		data

	})

}
