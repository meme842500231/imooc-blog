
import store from '@/store/index'
const BASE_URL = "https://api.imooc-blog.lgdsunday.club/api"

function request({
	url,
	data,
	method
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				icode: '135FD29FDE7A55DD',
				Authorization: store.state.user.token

			},
			url: BASE_URL + url,
			data,
			method,
			success: ({
				data,
				statusCode,
				header
			}) => {
				if (data.success) {
					resolve(data)
				} else {
					uni.showToast({
						title: data.message,
						mask: true,
						duration: 3000
					}) 
					reject(data.message)
				}
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}

		})
	})
}
export default request
