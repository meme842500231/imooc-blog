<template>
	<view>
		<view class="icon-box">
			<image class="icon-bg" :src="getRankingNum" mode=""></image>
			<text class="icon-des" :class="{'rankingcolor':ranking<= 3}">{{ranking}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "hot-icon",
		props: {
			ranking: {
				type: Number,
				require: true
			}
		},
		data() {
			return {

			};
		},
		computed: {
			getRankingNum() {
				if (this.ranking <= 3) {
					return require(`@/static/images/ranking-${this.ranking}.png`)
				}
				return require(`@/static/images/ranking-other.png`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-box {
		position: relative;
		text-align: center;
		width: 18px;
		height: 20px;
		margin-right: 5px;

		.icon-bg {
			width: 100%;
			height: 100%;
		}

		.icon-des {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-55%, -55%);
			font-size: 12px;
			
		}
		.rankingcolor{
			color: white;
		}

	}
</style>
