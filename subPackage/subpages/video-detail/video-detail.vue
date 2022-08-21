<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video id="myVideo" class="video" :src="videoData.play_url" :danmu-list="danmuList" enable-danmu danmu-btn
				controls />

			<hot-video-info :data="videoData" />
		</view>
		<view class="video-detail-container">
			<view class="danmu-box">
				<!-- 加载动画 -->
				<uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
				<!-- 无弹幕 -->
				<empty-data v-else-if="commentList.length === 0"></empty-data>
				<!-- 弹幕列表 -->
				<view class="comment-container" v-else>
					<view class="all-comment-title">全部弹幕</view>
					<view class="list">
						<block v-for="(item, index) in commentList" :key="index">
							<comment-item :data="item"></comment-item>
						</block>
					</view>
				</view>
				<article-operate @onComment="onComment" placeholder="发个弹幕,开心一下" :articleData="videoData"
					@changePraise="changePraise" @changeCollect="changeCollect"></article-operate>
				<uni-popup ref="popup" type="bottom" @change="showCommit">
					<article-comment-comment v-if="isShowCommit" :articleId="videoData.id"
						@sendCommentSuccess="sendDanmuSuccess">
					</article-comment-comment>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getVideoDanmuList
	} from '../../../api/hot-video.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				danmuList: [],
				commentList: [],
				isShowCommit: false,
				videoContext: '',
				isLoadingComment: true
			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		computed: {
			...mapState('video', ['videoData']),
		},
		created() {
			this.loadVideoDanmuList()

		},
		methods: {
			...mapMutations('video', ['setVideoData']),
			async loadVideoDanmuList() {
				const {
					data: res
				} = await getVideoDanmuList({
					videoId: this.videoData.id
				})
				//定义随机颜色
				res.list.forEach((item) => {
					item.color = this.getRandomColor()
				})
				this.isLoadingComment = false
				this.danmuList = [...res.list]
				this.commentList = [...res.list]
			},
			onComment() {
				this.$refs.popup.open('bottom')
			},
			showCommit(e) {
				if (e.show) {
					this.isShowCommit = e.show
				} else {
					setTimeout(() => {
						this.isShowCommit = e.show
					}, 200)
				}
			},
			sendDanmuSuccess(data) {
				this.videoContext.sendDanmu({
					text: data.info.content,
					color: this.getRandomColor()
				})
				console.log(data)
				this.commentList.unshift(data.info),
					this.$refs.popup.close(),
					this.isShowCommit = false,
					uni.showToast({
						icon: 'success',
						title: "发表成功"
					})

			},
			getRandomColor() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			changePraise(isPraise) {
				this.setVideoData({
					...this.videoData,
					isPraise
				})
				console.log(this.videoData)
			},
			changeCollect(isCollect) {
				this.setVideoData({
					...this.videoData,
					isCollect
				})
				console.log(this.videoData)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.video-detail-container {
		.video-box {
			background-color: $uni-bg-color;
			position: sticky;
			top: 0;
			z-index: 9;

			.video {
				width: 100%;
				height: 230px;
			}
		}

		.danmu-box {
			border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
			margin-bottom: 36px;

			.comment-container {
				padding: $uni-spacing-col-lg $uni-spacing-row-lg;

				.all-comment-title {
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
			}
		}
	}
</style>
