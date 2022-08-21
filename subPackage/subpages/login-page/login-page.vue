<template>
	<view>
		<my-login @loginSuccess="loginSuccess"></my-login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loginSuccess(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
