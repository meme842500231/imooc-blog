<template>
	<view class="search-blog-container">
		<view class="my-search">
			<my-search :inShowInput="true" :placeholdertext="defaultText" :config="{backgroundColor:'#f1f0f3'}"
				v-model="searchVal" @inputChange="inputChange" @search="search" @focus="focus" @blur="blur"
				@clear="clear" @cancel="cancel"></my-search>
		</view>
		<view class="search-result" v-if="showType===search_result">
			<search-result  @clickSearchDetail="goDetail" ref="mescrollItem" :searchRes="searchVal"></search-result>
		</view>

		<view class="search-history" v-else-if="showType===search_history">
			<search-history @search="search"></search-history>
		</view>
		<view class="search-list card" v-else>
			<search-list @searchListItem="searchListItem"></search-list>
		</view>
	</view>
</template>

<script>
	import mescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	import {
		mapMutations
	} from 'vuex'
	import {
		getSearchText
	} from "../../../api/search.js"
	const search_list = "0"
	const search_history = "1"
	const search_result = "2"
	export default {
		mixins: [mescrollCompMixin],
		data() {
			return {
				searchVal: '',
				defaultText: '默认的placeholdertext',
				showType: 0,
				search_list,
				search_history,
				search_result
			};
		},

		created() {
			this.getSearchDefaultText()
		},
		computed: {

		},
		methods: {
			...mapMutations('searchVue', ['addsearch']),
			search(val) {
				this.searchVal = val ? val : this.defaultText
				this.addsearch(this.searchVal)
				if (this.searchVal) {
					this.showType = search_result
				}
			},
			focus(val) {
				this.showType = search_history
			},
			blur(val) {

			},
			clear(val) {
				this.showType = search_history
			},
			cancel(val) {
				this.showType = search_list
			},
			inputChange(val) {

			},
			async getSearchDefaultText() {
				const {
					data: res
				} = await getSearchText()
				this.defaultText = res.defaultText

			},
			searchListItem(val) {
				this.search(val)
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/subPackage/subpages/search-detail/search-detail?author=${item.author}&articleId=${item.id}`
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-blog-container {
		.my-search {
			background-color: #fff;
			padding: 0 20px;
			box-sizing: border-box;
			position: sticky;
			top: 0;
			z-index: 9;

		}
	}
</style>
