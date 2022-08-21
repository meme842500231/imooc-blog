<template>
	<view class="comment-limt-container">
		<view class="" v-if="!isShowAll">
			<view class="comment-title">精简评论</view>
			<block v-for="(item, index) in commentListData.slice(0, 2)" :key="index">
				<!-- item 项组件 -->
				<comment-item :data="item.info"></comment-item>
			</block>
			<view class="show-more" @click="onMoreClick">查看更多评论</view>
		</view>
		<view class="comment-all-container" v-else>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :up="{textNoMore:'我也是有底线的!'}" :down="{use:false}">
				<view class="comment-title">全部评论</view>
				<block v-for="(item, index) in commentListData" :key="index">
					<!-- item 项组件 -->
					<comment-item :data="item.info"></comment-item>
				</block>
			</mescroll-body>
		</view>
	</view>
	</view>
</template>
<script>
	import mescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {
		getDetailComment
	} from '../../api/article.js'
	export default {
		name: "comment-list",
		mixins: [mescrollMixin],
		props: {
			articleId: {
				type: String,
				required: true,

			}
		
		},
		data() {
			return {
				page: 1,
				size: 5,
				commentListData: [],
				isShowAll: false,
				init: false,
				mescroll: null,
				countTotal: 0
			};
		},

		created() {
			this.loadDetailComment()
		},
		methods: {
			async loadDetailComment() {
				const {
					data: res
				} = await getDetailComment({
					articleId: this.articleId,
					page: this.page,
					size: this.size
				})
				this.countTotal = res.count
				if (this.page === 1) {
					this.commentListData = res.list
				} else {
					this.commentListData = [...this.commentListData, ...res.list]
				}
				

			},
			onMoreClick() {
				this.isShowAll = true
			},
			async mescrollInit() {
				await this.loadDetailComment()
				this.init = false
				this.getMescroll().endSuccess()
				this.getMescroll().endBySize(this.commentListData.length, this.countTotal)
			},
			async upCallback() {
				if (this.init) return
				this.page = this.page + 1
				await this.loadDetailComment()
				// endSuccess
				this.getMescroll().endSuccess()
				this.getMescroll().endBySize(this.commentListData.length, this.countTotal)
			},

			// 返回mescroll实例对象
			getMescroll() {
				if (!this.mescroll) {
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
				return this.mescroll
			},
			addCommentList(data){
				this.commentListData.unshift(data)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.comment-title {
		font-weight: bold;
		color: $uni-text-color-title;
		font-size: $uni-font-size-lg;
		margin: $uni-spacing-col-lg 0;
	}

	.comment-limt-container {
		.show-more {
			margin: $uni-spacing-col-lg;
			text-align: center;
			color: $uni-text-color-more;
			font-size: $uni-font-size-base;
		}
	}
</style>
