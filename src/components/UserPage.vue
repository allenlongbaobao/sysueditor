<template>
	<div class="body">
		<div class="left">
			<div class="left-header">
				<ul>
					<li v-for="(tab, key) in tabList" @click="currectTab = key">
						<span :class="[{active: currectTab === key}]">{{tab}}</span>
					</li>
				</ul>
			</div>
			<div class="left-body">
				<component v-bind:is="currectTabComponent" :id="id"></component>

			</div>
		</div>
		<div class="right">
			
		</div>
		
	</div>
</template>

<script>
import myArticle from './pages/myArticle.vue'
import myActivity from './pages/myActivity.vue'
import collection from './pages/collection.vue'
import follower from './pages/follower.vue'
import following from './pages/following.vue'

export default {
	data () {
		return {
			id: '',
			currectTab: 'myArticle',
			tabList: {
				myArticle: '我的文章',
				myActivity: '我的活动',
				collection: '收藏',
				follower: '关注我的',
				following: '我关注的'
			},
			componentList: {
				myArticle: myArticle,
				myActivity: myActivity,
				follower: follower
			}
		}
	},
	components: {
		'tab-myArticle': myArticle,
		'tab-myActivity': myActivity,
		'tab-collection': collection,
		'tab-follower': follower,
		'tab-following': following
	},
	methods: {
		
	},
	created () {
		this.id = this.$route.params.id
	},
	computed: {
		currectTabComponent: function () {
			return 'tab-' + this.currectTab 
		}
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
	margin-top: 10rem;


	.left {
		flex: .3 0 70%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-right: 3rem;

		.left-header {
			flex: 0 0 10%;
			display: flex;
			justify-content: center;
			width: 100%;

			ul {
				flex: 0 0 90%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				li {
					flex: 1 0 0;
					cursor: pointer;
					font-size: 2rem;
					display: flex;
					justify-content: center;
					align-items: center;

					span {
						height: 90%;

					}
					.active {
						color: white;
						font-size: 2.5rem;
						background-color: green;
					}
				}

				li > span:hover {
					font-size: 2.5rem;
					border-bottom: 1px solid green;
				}
			}

		}

		.left-body {
			flex: 0 0 90%;
			width: 100%;

		}

	}

	.right {
		flex: 0 0 20%;
		border: 1px solid #ccc;

	}

}
	
</style>