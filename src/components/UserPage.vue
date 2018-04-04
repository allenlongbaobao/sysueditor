<template>
	<div class="body">
		<div class="left">
			<div class="left-header">
				<ul>
					<li><span>我的文章</span></li>
					<li><span>我的活动</span></li>
					<li><span>我喜欢的</span></li>
					<li><span>收藏</span></li>
					<li><span>关注我的人</span></li>
					<li><span>我关注的人</span></li>
				</ul>
			</div>
			<div class="left-body">
			</div>
		</div>
		<div class="right">
			
		</div>
		
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	methods: {

	},
	created () {


	}
}
	
</script>

<style lang="scss" scoped>
@import '../assets/css/common.css';

.body {
	width: 90%;
	height: 85%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-self: center;
	margin-top: 5rem;


	.left {
		flex: .3 0 70%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;

		.left-header {
			flex: 0 0 10%;

		}

		.left-body {
			flex: 0 0 90%;

		}

	}

	.right {
		flex: 0 0 20%;

	}

}
	
</style>