import {
	getVideoDanmuList
} from '@/api/hot-video.js'
export default {
	namespaced: true,

	state: () => {
		return {
			videoData: {}
		}
	},
	mutations: {
		setVideoData(state, videoData) {
			state.videoData = videoData
		}
	}
}
