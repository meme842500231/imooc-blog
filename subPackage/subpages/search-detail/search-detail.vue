<template>
	<!-- #ifndef H5 -->
	<page-meta root-font-size="52px">
		<!-- #endif -->
		<view class="detail-container">
			<!-- 文章内容区域 -->
			<block v-if="articleData">
				<!-- 标题 -->
				<view class="title">{{ articleData.articleTitle }}</view>
				<view class="detail-info">
					<view class="detail-left">
						<view class="avatar-box">
							<!-- 头像 -->
							<image class="avatar" :src="articleData.avatar" />
						</view>
						<view class="author-box">
							<!-- 作者 -->
							<text class="author">{{ articleData.nickName }}</text>
							<!-- 发布时间 -->
							<text class="release-time">{{ articleData.date }}</text>
						</view>
					</view>
					<view class="detail-right">
						<!-- 关注按钮 -->
						<button class="follow" size="mini" :type="articleData.isFollow ? 'primary' : 'default'"
							:loading="isFollowLoading" @click="onFollowClick">
							{{ articleData.isFollow ? '已关注' : '关注' }}
						</button>
					</view>
				</view>
				<!-- 文章内容 -->
				<mp-html class="markdown_views" :content="addClassFromHTML(articleData.content)" scroll-table />
				<comment-list :articleId="articleId" ref="mescrollItem"></comment-list>
				<article-operate @onComment="onComment" :articleData="articleData" @changePraise="changePraise"
					@changeCollect="changeCollect"></article-operate>
				<uni-popup ref="popup" type="bottom" @change="showCommit">
					<article-comment-comment v-if="isShowCommit" :articleId="articleId"
						@sendCommentSuccess="sendCommentSuccess"></article-comment-comment>
				</uni-popup>
			</block>
		</view>
		<!-- #ifndef H5 -->
	</page-meta>
	<!-- #endif -->
</template>

<script>
	import {
		userFollow
	} from "../../../api/user.js"
	import {
		mapActions
	} from 'vuex';
	import mescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	import {
		getArticleDetail
	} from '@/api/article.js'
	import npHtml from '@/uni_modules/mp-html/components/mp-html/mp-html.vue'
	export default {
		components: {
			npHtml
		},
		mixins: [mescrollCompMixin],
		data() {
			return {
				author: '',
				articleId: '',
				articleData: null,
				isShowAllComment: false,
				// 关注用户的 loading
				isFollowLoading: false,
				// popup 的显示状态
				isShowCommit: false,

			};
		},
		onLoad(options) {
			this.author = options.author
			this.articleId = options.articleId
			this.loadArticleDetail()

		},
		methods: {
			...mapActions('user', ['islogin']),
			async loadArticleDetail() {
				uni.showLoading({
					title: '加载中'
				})
				const {
					data: res
				} = await getArticleDetail({
					author: this.author,
					articleId: this.articleId,
				})
				console.log(res.data)
				this.articleData = res.data;
			},
			addClassFromHTML(info) {
				return info
					.replace(/<p>/gi, '<p class="p-cls">')
					.replace(/<a>/gi, '<a class="a-cls">')
					.replace(/<h1>/gi, '<h1 class="h1-cls">')
					.replace(/<h2>/gi, '<h2 class="h2-cls">')
					.replace(/<h3>/gi, '<h3 class="h3-cls">')
					.replace(/<h4>/gi, '<h4 class="h4-cls">')
					.replace(/<h5>/gi, '<h5 class="h5-cls">')
					.replace(/<h6>/gi, '<h6 class="h6-cls">')
					.replace(/<ul>/gi, '<ul class="ul-cls">')
					.replace(/<li>/gi, '<li class="li-cls">')
					.replace(/<ol>/gi, '<ol class="ol-cls">')
					.replace(/<td>/gi, '<td class="td-cls">')
					.replace(/<th>/gi, '<th class="th-cls">')
					.replace(/<tr>/gi, '<tr class="tr-cls">')
					.replace(/<dl>/gi, '<dl class="dl-cls">')
					.replace(/<dd>/gi, '<dd class="dd-cls">')
					.replace(/<hr>/gi, '<hr class="hr-cls">')
					.replace(/<pre>/gi, '<pre class="pre-cls">')
					.replace(/<strong>/gi, '<strong class="strong-cls">')
					.replace(/<input>/gi, '<input class="input-cls">')
					.replace(/<table>/gi, '<table class="table-cls">')
					.replace(/<details>/gi, '<details class="details-cls">')
					.replace(/<code>/gi, '<code class="code-cls">')
					.replace(/<kbd>/gi, '<kbd class="kbd-cls">')
					.replace(/<summary>/gi, '<summary class="summary-cls">')
					.replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
					.replace(/<img/gi, '<img class="img-cls"');
			},
			async onFollowClick() {
				const islogin = await this.islogin()
				// this.isFollowLoading = true
				await userFollow({
					author: this.author,
					isFollow:!this.articleData.isFollow
				})
				this.articleData.isFollow = !this.articleData.isFollow
				this.isFollowLoading = false
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
			sendCommentSuccess(data) {
				this.isShowCommit = false,
					this.$refs.popup.close()
				this.$refs.mescrollItem.addCommentList(data)
			},
			changePraise(isPraise) {
				this.articleData.isPraise = isPraise

			},
			changeCollect(isCollect) {
				this.articleData.isCollect = isCollect
			}
		}
	}
</script>
<style lang="scss">
	::v-deep .article_content {
		.h1-cls {
			font-size: $uni-font-size-title;
		}

		.p-cls {
			line-height: 32px;
			text-align: justify;
			letter-spacing: 1px;
			margin-right: 10px;
		}

	}

	.detail-container {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		padding-bottom: 108px;

		.title {
			font-size: $uni-font-size-title;
			color: $uni-text-color-title;
			font-weight: bold;
		}

		.detail-info {
			padding: $uni-spacing-col-base 0;
			display: flex;
			justify-content: space-between;

			.detail-left {
				display: flex;

				.author-box {
					margin-left: $uni-spacing-row-base;
					display: flex;
					flex-direction: column;

					.author {
						font-size: $uni-font-size-base;
						font-weight: bolder;
						color: $uni-color-title;
					}

					.release-time {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
				}
			}

			.detail-right {
				display: flex;
				align-items: center;

				.follow {
					padding: 0 10px;
					width: 65px;
				}

			}
		}

	}
</style>
