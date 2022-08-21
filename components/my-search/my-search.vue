<template>
	<view class="my-search-container">
		<uni-search-bar v-if="inShowInput" class="my-search-bar" :radius="100" :bgColor="config.backgroundColor"
			:placeholder="placeholdertext" :value="value" @input="onInput" @confirm="onSearch" @cancel="onCancel"
			@focus="onFocus" @blur="onBlur" @clear="onClear">
			<uni-icons slot="clearIcon" type="clear" color="#999"></uni-icons>
		</uni-search-bar>
		<view class="my-search" v-else :placeholder="placeholdertext"
			:style="{height:config.height+'px',backgroundColor:config.backgroundColor,border:config.border}">
			<view class="search-icon">
				<image :src="config.icon"></image>
			</view>
			<text class="placeholder" :style="{textColor:config.textColor}">{{placeholdertext}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			value: {
				type: String
			},
			placeholdertext: {
				type: String,
				default: '搜索'
			},
			inShowInput: {
				type: Boolean,
				default: false
			},
			config: {
				type: Object,
				default: () => ({
					height: 36,
					backgroundColor: '#ffffff',
					icon: '/static/images/search.png',
					border: '1px solid #c9c9c9',
					textColor: '#454545'
				})
			}
		},
		data() {
			return {};
		},
		methods: {
			onSearch(e) {
				this.$emit('search', e.value)
			},
			onFocus() {
				this.$emit('focus', this.value)
			},
			onBlur() {
				this.$emit('blur', this.value)
			},

			onClear() {
				this.$emit('clear', this.value)
			},
			onCancel() {
				this.$emit('cancel', this.value)
			},
			onInput() {
				this.$emit('inputChange', this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;
	}

	.my-search-bar {
		width: 100%;
	}

	.my-search {
		width: 100%;
		height: 36px;
		line-height: 36px;
		display: flex;
		align-items: center;
		background-color: $uni-white;
		border-radius: 15px;
		border: 1px solid $uni-border-4;
	}

	.search-icon {
		width: 20px;
		height: 20px;
		margin-left: 10px;
		display: flex;
		align-items: center;

	}

	.search-icon image {
		width: 100%;
		height: 100%;

	}

	.placeholder {
		font-size: 12px;
		margin-left: $uni-spacing-sm;
		color: $uni-border-4;
	}
</style>
