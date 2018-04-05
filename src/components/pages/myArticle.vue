<template>
	<div class="tab">
		<div class="item" :data-aid="item._id" v-for="item in articles" @click="goArticle">
			<span class="title">{{item.title}}</span>
			<div class="item-info">
				<span>{{item.owner.nickName}}</span>
				<span>{{item.createdAt}}</span>
			</div>
		</div>
	</div>
	
</template>

<script>
import config from '../../../config/dev.env.js'
const IP = config.SERVER_IP
export default {
	data () {
		return {
			articles: []
		}
	},
	props: {
		id: String
	},
	created () {
		console.log(this.id)
		this.$http.post(IP + '/api/getAllArticleByUid', {id: this.id}).then(response => {
			console.log(response)
			this.articles = response.body.data
		})
	},
	methods: {
		goArticle: function (e) {
			console.log(e.target.parentElement.dataset.aid)
			let id = e.target.parentElement.dataset.aid
			this.$router.push({name: 'Article', path: '/article/' + id, params: {id: id}})
		}
	}
}
	
</script>
<style lang="scss" scoped>
.tab {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;

	.item {
		display: flex;
		flex-direction: column;
		z-index: 1000;
		cursor: pointer;
		height: 10rem;
		justify-content: space-between;

		.title {
			font-size: 3rem;
			color: green;
			flex: 1 0 0;
		}


		.item-info {
			display: flex;
			justify-content: flex-start;
		}

	}
	.item:hover {
		background-color: #ccc;
	}
}

	
</style>