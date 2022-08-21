<template>
  <view class="comment-container" :style="{bottom:bottom+'px'}">
    <uni-easyinput
      v-model="value"
      type="textarea"
      placeholder="说点什么..."
      :maxlength="50"
      :inputBorder="false"
    ></uni-easyinput>
    <button class="commit" type="primary" :disabled="!value" size="mini" @click="onBtnClick">
      发送
    </button>
  </view>
</template>

<script>
	import {sendCommit} from '../../api/user.js'
export default {
  name: 'article-comment-commit',
  props:{
	  articleId:{
		  type:String,
		  required:true
	  }
  },
  data() {
    return {
      value: '',
	  bottom:0
    };
  },
  created() {
  	uni.onKeyboardHeightChange(({height})=>{
		this.bottom=height
	})
  },
  methods: {
    /**
     * 发送按钮点击事件
     */
   async onBtnClick() {
		const{data:res}=await sendCommit({
			articleId:this.articleId,
			content:this.value
		})
		uni.showToast({
			icon:'success',
			title:'发表成功',
			mask:true
		})
		this.$emit('sendCommentSuccess',res)
	}
  }
};
</script>

<style lang="scss" scoped>
.comment-container {
  background-color: $uni-bg-color;
  text-align: right;
  padding: $uni-spacing-row-base;
  position: relative;
}
</style>

