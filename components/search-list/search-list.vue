<template>
	<view class="hot-list-container">
		<view class="hot-list-title">
			<view class="hot-list-title-text">
				慕课热搜-全网技术 一网打尽
			</view>
		</view>
		<block v-for="(item,index) in hotListData" :key="index">
			<view class="hot-list-content" @click="onSearch(item)">
				<view class="hot-list-num">
					<hot-icon :ranking="index+1"></hot-icon>
				</view>
				<view class="hot-list-text">
					{{item.label}}
				</view>
				<image class="hot-list-icon" src="../../static/images/hot-icon.png" v-if="index<=2"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		getHotsearch
	} from "../../api/search.js"
	export default {
		name: "search-list",
		data() {
			return {
				hotListData: []
			};
		},
		created() {
			this.getHotList()
		},
		methods: {
			async getHotList() {
				const {
					data: res
				} = await getHotsearch()
				this.hotListData = res.list
			},
			onSearch(item){
				this.$emit('searchListItem',item.label)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-list-container {
		.hot-list-title {
			font-size: bold;
			font-size: 14px;
			color: #f94d2a;
			padding: 12px 12px 12px 0;
			margin: -12px -12px 0 -12px;
			box-sizing: border-box;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);

			.hot-list-title-text {
				padding-left: 12px;
			}

		}

		.hot-list-content {
			display: flex;
			align-items: center;
			padding: 12px 0;

			.hot-list-text {
				color: #000;
				font-size: 12px;
				margin: 0 10px;
			}

			image {
				width: 14px;
				height: 14px;
			}
		}
	}
</style>
