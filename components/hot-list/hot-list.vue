<template>
	<view class="hot-list" @click="goSearchDetail">
		<view class="hot-list-left">
			<hot-icon :ranking="ranking">

			</hot-icon>
		</view>
		<view class="hot-list-right">
			<view class="hot-list-title line-clamp-2">
				{{data.title}}
			</view>
			<view class="hot-list-des line-clamp-2 ">
				{{data.desc}}
			</view>
			<view class="hot-list-bottom">
				<text class="list-bottom-left">{{data.nickname}}</text>
				<view class="list-bottom-right">
					<image src="../../static/tab-icons/hot-active.png" mode=""></image>
					<text class="hot-hot" @click="emit">
						{{data.views|hotviews}} 热度
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		hotviews
	} from "../../filters/index.js"
	export default {
		name: "hot-list",
		props: {
			data: {
				type: Object,
				require: true
			},
			ranking: {

			}
		},
		data() {
			return {

			};
		},
		filters: {
			hotviews
		},
		methods: {
			goSearchDetail() {
				this.$emit('clickSearchDetail')
			},
			emit() {
				uni.$emit('update',{msg:'页面更新'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-list {
		display: flex;
		margin: 0 10px;
		margin-bottom: 5px;
		padding: 12px 10px;
		background-color: #fff;
		border-radius: 6px;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1)
	}

	.hot-list-right {
		display: flex;
		flex-direction: column;
	}

	.hot-list-title {
		font-size: 16px;
		font-weight: bold;
		color: #000;
	}

	.hot-list-des {
		padding-top: 4px;
		font-size: 14px;
		color: rgb(10, 9, 9);
	}

	.hot-list-bottom {
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-bottom-left {
		font-size: 12px;
		color: #999;

	}

	.list-bottom-right {
		display: flex;
		align-items: center;

		image {
			width: 16px;
			height: 16px;
		}

		.hot-hot {
			margin-left: 5px;
			color: #f94d2a;
			font-size: 12px;
		}
	}
</style>
