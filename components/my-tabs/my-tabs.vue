<template>
	<view class="my-bars-container">
		<scroll-view class="scroll-content" scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
			<view class="my-bars-box">
				<view class="my-bars-content" v-for="(item,index) in tabData" :key="index"
					:class="{'active':activeIndex===index }" @click="changeIndex(index)">
					<view class="my-bars-item">
						{{item.label||item}}
					</view>
				</view>
				<view class="underline" :style="{transform:'translateX('+slider.left+'px)'}">
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "my-tabs",
		props: {
			config: {
				type: Object,
				default: () => {
					return {}
				}
			},
			tabData: {
				type: Array,
				default: () => {
					return []
				}
			},
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				activeIndex: 0,
				slider: {
					left: 14
				},
				scrollLeft: 0
			};
		},
		watch: {
			defaultIndex: {
				handler(val) {
					this.activeIndex = val
				},
				immediate: true
			}
		},
		methods: {
			// tab改变
			changeIndex(index) {
				if (this.tabData.length === 0) return;
				this.activeIndex = index
				this.$emit('tabClick', index)
				this.itemToLeft(index)
			},
			/**
			 * tab滑块距离左边的值
			 * tab距屏幕左边的值 + （tab的宽度-tab滑块的宽度）/2
			 */
			itemToLeft(index) {
				console.log(index)
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.my-bars-content.active').boundingClientRect(data => {
						console.log(data)
						this.slider.left = data.left + (data.width - 24) / 2
					}).exec();
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-bars-container {
		width: 100%;
		position: relative;
	}

	.scroll-content {
		width: 100%;
		height: 40px;
		line-height: 40px;


	}

	.my-bars-box {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		white-space: nowrap;
	}

	.underline {
		height: 2px;
		width: 24px;
		background-color: #f94d2a;
		border-radius: 3px;
		transition: 0.5s;
		position: absolute;
		bottom: 0;
		// left: 50%;
		// transform: translateX(-50%) !important;
	}


	.my-bars-content {
		padding: 0 12px;
		font-size: 14px;
		position: relative;

		&.active {
			color: #f94d2a;

		}
	}

	/* #ifdef H5 */
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}

	/deep/.uni-scroll-view {
		scrollbar-width: none;
	}

	/* #endif */
</style>
