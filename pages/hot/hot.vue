<template>
	<view class="hot">
		<image class="hot-log" src="../../static/images/logo.png" mode="aspectFit" />
		<view class="my-search" @click="gotoSearch">
			<my-search placeholdertext="uni-app 自定义组件"></my-search>
		</view>
		<view class="sticky">
			<my-tabs ref="tabs" :tabData='tabData' :defaultIndex="currentIndex" @tabClick="tabClick"></my-tabs>
		</view>
		<view class="hotlist">
			<swiper :current="currentIndex" @animtionfinish="onSwiperEnd" @change="swiperIndex"
				:style="{height: swipeCurrentHight+'px'}">
				<swiper-item class="swiper-item" v-for="(tabitem,tabindex) in tabData" :key="tabindex">
					<view>
						<uni-load-more status="loading" v-if="isLoading" />
						<block v-else>
							<hot-list @clickSearchDetail="goDetail(item)" :class="'hot-list-item-'+tabindex"
								v-for="(item,index) in tabListData[tabindex]" :key="index" :data="item"
								:ranking="index+1"></hot-list>
						</block>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		getHotTabs,
		getHotTabList
	} from "@/api/hot"

	export default {
		data() {
			return {
				tabData: [],
				// 当前分类对应的索引（ui上默认是选中第一个分类，所以是0）
				currentIndex: 0,
				isLoading: true,
				// 接收所有分类的列表（每个元素都是一个分类的列表，是个二维数组）
				tabListData: [],
				swipeCurrentHight: 0,
				swipeHightData: {},
				pageScrollHeight: 0
			};
		},
		created() {
			// 请求热门分类导航
			this.loadHotTabs()
		},
		onPageScroll(res) {
			this.pageScrollHeight = res.scrollTop
		},
		methods: {
			async loadHotTabs() {
				// 调用热门分类导航接口
				const res = await getHotTabs()
				// 接收热门分类
				this.tabData = res.data.list
				// 请求当前分类对应的文章列表
				this.loadHotTabsList()
			},
			async loadHotTabsList() {
				// 查看tabListData中有没有当前分类对应的列表，没有则请求当前分类
				if (!this.tabListData[this.currentIndex]) {
					this.isLoading = true
					// 获取当前分类对应的id
					const id = this.tabData[this.currentIndex].id
					// 调用当前分类对应的列表（要给后端传入当前分类的id，后端根据id查到当前分类的列表返你）
					// 接收到data，并且给它取一个新的名字叫做res（别名）
					const {
						data: res
					} = await getHotTabList(id)
					// 将后端返回的列表赋值给所有分类的列表中当前的那一个列表
					this.tabListData[this.currentIndex] = res.list
					this.isLoading = false
					setTimeout(async () => {
						this.swipeCurrentHight = await this.getSwipeHeight()
						this.swipeHightData[this.currentIndex] = this.swipeCurrentHight;
					}, 0)

				}

				/**
				 * todo:
				 * 将获取倒的列表赋值给data对象中的某一个属性
				 * 然后vue模板里v-for这个属性来遍历
				 * 如果你不定义loadHotTabsList这个方法
				 * 那你获取到了列表（数组）后，你怎么使用它呢
				 * 还记得不 template模板中只能使用data对象里的变量
				 */

			},
			tabClick(index) {
				this.currentIndex = index
				this.loadHotTabsList()
			},
			swiperIndex(e) {
				if (this.pageScrollHeight > 78) {
					uni.pageScrollTo({
						scrollTop: 78
					})
				}
				this.currentIndex = e.detail.current
				this.$refs.tabs.itemToLeft(this.currentIndex)
				this.loadHotTabsList()
			},

			onSwiperEnd() {
				if (!this.tabListData[this.currentIndex]) {
					this.loadHotTabsList()
					return
				}
				this.swipeCurrentHight = this.swipeHightData[this.currentIndex]
			},
			getSwipeHeight() {
				return new Promise((resolve, reject) => {
					let sum = 0
					this.$nextTick(() => {
						const query = uni.createSelectorQuery().in(this);
						query.selectAll(`.hot-list-item-${this.currentIndex}`).boundingClientRect(data => {
							data.forEach((item) => {
								sum += item.height
							})
							resolve(sum)
						}).exec();
					})
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: "/subPackage/subpages/search-blog/search-blog"
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/subPackage/subpages/search-detail/search-detail?author=${item.user_name}&articleId=${item.id}`
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.hot {
		background-color: #fff;

		.hot-log {
			width: 100%;
			height: 40px;
			display: block;
		}
	}

	.my-search {
		padding: 0 20px;
		box-sizing: border-box;
	}

	.sticky {
		position: sticky;
		z-index: 9;
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		background-color: #fff;
	}
</style>
