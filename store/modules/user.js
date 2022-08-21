import {
	login
} from '@/api/user.js';
const STORAGE_KEY = 'user-info';
const TOKEN_KEY = 'token';
export default {
	namespaced: true,
	state: () => {
		return {
			// 用户 token
			token: uni.getStorageSync(TOKEN_KEY) || '',
			// 用户信息
			userInfo: uni.getStorageSync(STORAGE_KEY) || {}
		};
	},
	mutations: {
		/**
		 * 保存 token 到 vuex
		 */
		setToken(state, token) {
			console.log(token)
			state.token = token;
			console.log(state)
			this.commit('user/saveToken');
		},
		/**
		 * 保存 token 到 本地存储
		 */
		saveToken(state) {
			uni.setStorage({
				key: TOKEN_KEY,
				data: state.token
			});
		},
		/**
		 * 保存 用户信息 到 vuex
		 */
		removeToken(state) {
			state.token = ''
			this.commit('user/saveToken');
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			this.commit('user/saveUserInfo');
		},
		/**
		 * 保存 用户信息 到 本地存储
		 */
		saveUserInfo(state) {
			uni.setStorage({
				key: STORAGE_KEY,
				data: state.userInfo
			});
		},
		removeUserInfo(state) {
			state.userInfo = {}
			this.commit('user/saveUserInfo');
		}
	},

	actions: {
		async login(context, userProfile) {
			// 用户数据
			const rawData = userProfile.userInfo;
			// 调用登录接口
			const {
				data: res
			} = await login({
				signature: userProfile.signature,
				iv: userProfile.iv,
				nickName: rawData.nickName,
				gender: rawData.gender,
				city: rawData.city,
				province: rawData.province,
				avatarUrl: rawData.avatarUrl
			});

			// TODO: 登录逻辑
			this.commit('user/setToken', res.token);
			this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
		},
		loginout(context) {
			this.commit('user/removeToken')
			this.commit('user/removeUserInfo')
		},
		async islogin(context) {
			if (context.state.token)
				return true
			const [error,res]= await uni.showModal({
				title: '登录之后才可以进行该操作',
				content: '请您确认是否立即跳转到登录页面？'
			})
			const{confirm,cancel}=res
			if (confirm) {
				uni.navigateTo({
					url: '/subPackage/subpages/login-page/login-page'
				})
			}else{
				return
			}
			return false

		}
	}
}
