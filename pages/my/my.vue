<template>
	<view>
		<my-login></my-login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onPullDownRefresh() {
			console.log('请求列表')
		}
	}
</script>

<style lang="scss">

</style>
