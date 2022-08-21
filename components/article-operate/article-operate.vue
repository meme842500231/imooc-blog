<template>
	<view class="operate-container">
		<!-- 输入框 -->
		<view class="comment-box" @click="oninputcomment">
			<my-search :placeholdertext="placeholder"
				:config="{height:28,backgroundColor:'#eeedf4',border:'none',icon:'/static/images/input-icon.png',textColor:'#a6a5ab'}">
			</my-search>
		</view>
		<!-- 点赞 -->
		<view class="options-box" @click="onPraise">
			<view class="praise-box">
				<image class="img" :src="getIsPraise" />
				<text class="txt">点赞</text>
			</view>
		</view>
		<!-- 收藏 -->
		<view class="options-box" @click="onCollect">
			<view class="collect-box">
				<image class="img" :src="getIsCollect" />
				<text class="txt">收藏</text>
			</view>
		</view>
	</view>
</template>


<script>
	import {
		userPraise,
		userCollect
	} from '../../api/user.js'
	import {
		mapActions
	} from 'vuex';
	export default {
		name: "article-operate",
		data() {
			return {

			};
		},
		props: {
			articleData: {
				type: Object,
				required: true
			},
			placeholder:{
				type:String,
				default:"评论一句，前排打call..."
			}
		},
		computed: {
			getIsPraise() {
				return this.articleData && this.articleData.isPraise ? '/static/images/praise.png' :
					'/static/images/un-praise.png';
			},
			getIsCollect(){
				return this.articleData && this.articleData.isCollect ?'/static/images/collect.png':'/static/images/un-collect.png'
			}
		},
		methods: {
			...mapActions('user', ['islogin']),
			async oninputcomment() {
				const islogin = await this.islogin
				if (islogin) {
					this.$emit('onComment')
				}
			},

			async onPraise() {
				const islogin = await this.islogin
				if (!islogin) {
					return
				} else {
					await userPraise({
						articleId: this.articleData.articleId,
						isPraise: !this.articleData.isPraise
					})
				}
				this.$emit('changePraise', !this.articleData.isPraise)
			},
			async onCollect() {
				const islogin = await this.islogin
				if (!islogin) {
					return
				} else {
					await userCollect({
						articleId: this.articleData.articleId,
						isCollect: !this.articleData.isCollect
					})
				}
				this.$emit('changeCollect',!this.articleData.isCollect)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.operate-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $uni-bg-color;
		padding: 4px 6px 32px 6px;
		display: flex;
		border-top: 1px solid $uni-bg-color-grey;
		align-items: center;

		.comment-box {
			flex-grow: 2;
		}

		.options-box {
			flex-grow: 1;
		}

		.praise-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.img {
				width: $uni-img-size-base;
				height: $uni-img-size-base;
				color: $uni-text-color;
			}

			.txt {
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
			}
		}

		.collect-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.img {
				width: $uni-img-size-base;
				height: $uni-img-size-base;
			}

			.txt {
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
			}
		}
	}
</style>
