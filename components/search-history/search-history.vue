<template>
	<view class="search-history-container">

		<view class="search-history-title">
			<view class="search-history-text">
				搜索历史
			</view>
			<view class="search-history-delete-icon" v-if="!isShowClear">
				<uni-icons type="trash" @click="isShowClear=true"></uni-icons>
			</view>
			<view class="search-history-delete" v-else>
				<text class="txt" @click="deleteAll">全部删除</text>
				<text class="txt" @click="isShowClear=false">完成</text>
			</view>
		</view>
		<view class="search-history-box">
			<block v-for="(item,index) in searchData" :key="index">
				<view class="search-histyory-item" @click="deleteOne(item,index)">
					<text class="history-txt line-clamp">{{item}}</text>
					<uni-icons v-show="isShowClear" type="clear"></uni-icons>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "search-history",
		data() {
			return {
				isShowClear: false,

			};
		},
		computed: {
			...mapState('searchVue', ['searchData'])
		},
		methods: {
			...mapMutations('searchVue', ['sureDeleteAll', 'sureDeleteOne']),
			deleteAll() {
				uni.showModal({
					title: '提示',
					content: '您确认要删除历史记录吗？',

					success: (res) => {
						if (res.confirm) {
							this.sureDeleteAll()
							this.isShowClear = false
						} else if (res.cancel) {
							this.isShowClear = false
						}
					}
				})
			},
			deleteOne(item, index) {
				if (this.isShowClear == true) {
					this.sureDeleteOne(index)
				} else {
					this.$emit("search", item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-history-container {
		padding: 12px 15px;

		.search-history-title {
			display: flex;
			justify-content: space-between;

			.search-history-text {
				font-size: 12px;
				color: #333;
				padding: 4px 5px;
			}

			.txt {
				color: #999;
				font-size: 12px;
				padding: 4px 5px;
			}
		}

		.search-history-box {
			margin-top: 15px;

			.search-histyory-item {
				width: 50%;
				box-sizing: border-box;
				display: inline-block;
				padding: 8px 10px;
				position: relative;

				.history-txt {
					width: 85%;
					display: inline-block;
					color: #333;
					font-size: 14px;
				}
			}

			.search-histyory-item:nth-child(odd):before {
				content: '';
				border-left: 1px solid #999;
				display: inline-block;
				height: 10px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
			}
		}
	}
</style>
