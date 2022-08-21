<template>
	<view class="hot-video-container">
		<mescroll-body  ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback">
		<block v-for="(item,index) in videoList" :key="index">
			<hot-video-item :data="item" @click="onItemClick"></hot-video-item>
		</block>
		</mescroll-body>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import mescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {getHotVideo} from '../../api/hot-video.js'
	export default {
		data() {
			return {
				page:1,
				size:10,
				videoList:[],
				init:true,
				mescroll: null
			};
		},
		mixins: [mescrollMixin],
		created() {
			this.getVideo()
		},
		mounted() {
		this.mescroll=this.$refs.mescrollRef.mescroll
		},
		methods:{
			...mapMutations('video',['setVideoData']),
			async getVideo(){
				const {data:res}=await getHotVideo({
					page:this.page,
					size:this.size
				})
				if(this.page===1){
					this.videoList=res.list
				}else{
					this.videoList=[...this.videoList,...res.list]
				}
			},
			async mescrollInit(){
				await this. getVideo()
				this.init=false
				this.mescroll.endSuccess()
			},
			async upCallback(){
				if(this.init)return
				this.page = this.page + 1
				await this. getVideo()
				this.mescroll.endSuccess()
			},
			async downCallback(){
				if(this.init)return
				this.page=1
				await this. getVideo()
				this.mescroll.endSuccess()
			},
			onItemClick(data){
				this.setVideoData(data)
				uni.navigateTo({
					url:`/subPackage/subpages/video-detail/video-detail`
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.hot-video-container {
  background-color: $uni-bg-color-grey;
}
</style>


