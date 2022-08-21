<template>
	<view class="search-result-item-box">
		<rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text>
		<rich-text :nodes=" data.description" class="item-desc line-clamp-2"></rich-text>
		<view class="item-desc-bottom">
			<view class="item-author">{{data.nickname}}</view>
			<view class="item-update-time">
				<uni-icons class="item-update-time-icon" type="compose" color="#999999" />
				<text>{{data.created_at| relativeTime }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		relativeTime
	} from "../../filters"

	export default {
		name: "search-result-item-theme-1",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		filters: {
			relativeTime
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
	.search-result-item-box {
		margin-bottom: 16px;

		.tem-title {
			font-size: 14px;
			font-weight: bold;
			color: #000;
		}

		.item-desc {
			margin-top: 8px;
			font-size: 14px;
			color: #555;
		}

		.item-desc-bottom {
			margin-bottom: 8px;
			display: flex;
			align-items: center;
			color: #999;
			font-size: 12px;

			.item-author {
				margin-right: 12px;
			}

			.item-update-time {
				.item-update-time-icon {
					color: #999;
					margin-right: 5px;
				}
			}

		}
	}
</style>
