<template>
	<view class="hot-video-item-container">
		<view class="video-box">
			<video ref="video" id="myVideo" class="video" :src="data.play_url" enable-danmu danmu-btn
				controls />
		</view>
		<view @click="$emit('click',data)">
			<hot-video-info :data="data"></hot-video-info>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	.hot-video-item-container {
		margin-bottom: $uni-spacing-col-lg;
		position: relative;

		.video {
			width: 100%;
			height: 230px;
		}
	}
</style>
