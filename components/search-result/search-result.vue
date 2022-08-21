<template>
	<view class="search-result-container">
		<empty-data v-if="isEmpty"></empty-data>
		<mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<block v-for="(item,index) in searchResultList" :key="index">
				<view class="search-result-item-box" @click="goSearchDetail(item)">
					<search-result-item-theme-1 v-if="!item.pic_list||item.pic_list.length===0" :data="item">
					</search-result-item-theme-1>
					<search-result-item-theme-2 v-else-if="item.pic_list.length===1" :data="item">
					</search-result-item-theme-2>
					<search-result-item-theme-3 v-else :data="item"></search-result-item-theme-3>
				</view>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import mescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {
		getSearchResult
	} from "../../api/search.js"
	export default {
		name: "search-result",
		mixins: [mescrollMixin],
		data() {
			return {
				page: 1,
				searchResultList: [],
				init: true,
				isEmpty: false
			};
		},
		props: {
			searchRes: {
				type: String,
				required: true
			}
		},
		// created() {
		// 	this.loadSearchResult()
		// },
		methods: {
			async loadSearchResult() {
				const {
					data: res
				} = await getSearchResult({
					q: this.searchRes,
					p: this.page
				})
				res.list.forEach((item) => {
					if (item.title && typeof item.title === 'string') {
						item.title = item.title.replace(/<em>/g, "<em style='color:#f94d2a; margin:0 2px;'>")
					}
					if (item.description && typeof item.description === 'string') {
						item.description = item.description.replace(/<em>/g,
							"<em style='color:#f94d2a; margin:0 2px;'>")
					}
				})
				if (this.page === 1) {
					this.searchResultList = res.list
				} else {
					this.searchResultList = [...this.searchResultList, ...res.list]
				}
				if (this.searchResultList.length === 0) {
					this.isEmpty = true
				}

			},
			goSearchDetail(item) {
				this.$emit('clickSearchDetail', item)
			},
			async mescrollInit() {
				await this.loadSearchResult()
				this.init = false
				this.mescroll.endSuccess()
			},
			async downCallback() {
				if (this.init) {
					return
				} else {
					this.page = 1,
						await this.loadSearchResult()
					this.mescroll.endSuccess()
				}

			},
			async upCallback() {
				if (this.init) return
				this.page = this.page + 1
				await this.loadSearchResult()
				this.mescroll.endSuccess()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.search-result-container {
		padding: 12px 15px;

		.search-result-item-box {
			margin-bottom: 16px;
		}
	}
</style>
