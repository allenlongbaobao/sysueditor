<template>
	<div class="body">
		<div class="title-wrap">
			<h1 class="title-wrap-title">{{article.title}}</h1>
			<div class="title-wrap-info">
				<span class="title-wrap-info-name">{{article.owner.name}}</span>
				<span class="title-wrap-info-createdAt">{{getDate(article.createdAt)}}</span>
			</div>
		</div>
		<div class="content">
			<div class="content-left">
				<ul>
					<li>
						<span>
							<svg class="svgIcon-use" width="33" height="33" viewBox="0 0 33 33"><path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fill-rule="evenodd"></path></svg>
						</span>
						<span>{{article.love}}</span>
					</li>
					<li>
						<span>
							<svg class="svgIcon-use" width="32" height="32" viewBox="0 0 29 29"><path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4zM21 23l-5.91-3.955-.148-.107a.751.751 0 0 0-.884 0l-.147.107L8 23V6.615C8 5.725 8.725 5 9.615 5h9.77C20.275 5 21 5.725 21 6.615V23z" fill-rule="evenodd"></path></svg>
						</span>
					</li>
				</ul>
			</div>
			<markHtml class="content-body" :mhtml="article.content"></markHtml>
			<div class="content-right">
				
			</div>
		</div>
		<div class="comment">
			<comment></comment>
		</div>
	</div>
	
</template>

<script>
import marked from 'marked'
import highlightjs from 'highlightjs'
import comment from './pages/Comment.vue'
import markHtml from './pages/MarkHtml.vue'
import config from '../../config/dev.env.js'
const IP = config.SERVER_IP


marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value   // 这里highlightjs会自动给代码增加类
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

export default {
	data () {
		return {
			article: {
				title: '',
				owner: {
					name: ''
				},
				createdAt: ''
			} 
		}
	},
	components: {
		markHtml,
		comment
	},
	created () {
		this.getArticle(this.$route.params.id)
	},
	methods: {
		getArticle: function (id) {
			this.$http.post(IP + '/api/getArticleById', {id}, { withCredentials: true}).then(response => {
				if (response.body.code === 1) {
					this.article = response.body.data
					console.log(this.article.type)
					this.article.content = marked(this.article.content)
				} else {
					console.log('无效文章链接')
				}
			})
		},
		getDate: function (createdAt) {
			let date = new Date(createdAt)
      let year = date.getFullYear()
      let mon = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      return year + '-' + mon + '-' + day
		}
	}
}
	
</script>

<style lang="scss" scoped>
@import '../assets/css/common.css';
.body {
	display: flex;
  flex-direction: column;
  justify-content: flex-start;
	flex: 0 0 100%;
  align-items: center;
  height: 80rem;
  margin-top: 10rem;

  .title-wrap {
  	display: flex;
  	flex-flow: column nowrap;
  	align-items: center;
  	justify-content: space-around;
  	width: 60%;

  	.title-wrap-title {
  		text-align: center;
  		font-size: 5rem;
  		font-weight: 100;
  		border-bottom: 1px solid #ccc;
  		width: 100%;
  	}

  	.title-wrap-info {
  		display: flex;
  		flex-flow: row nowrap;
  		justify-content: flex-start;
  		flex: 0 0 60%;
  		align-self: center;

  		.title-wrap-info-name {
  			margin-right: 2rem;

  		}

  		.title-wrap-info-createdAt {

  		}
  	}
  }

  .content {
  	display: flex;
  	position: relative;
  	flex: 0 0 60%;
  	width: 70%;

  	.content-left {
  		position: fixed;
  		left: 5%;

  		ul {
  			li {
  				margin-bottom: 1rem;
	  			cursor: pointer;

	  			span:hover {
	  				color: green;
	  				fill: green;
	  			}
  			}
  		}
  	}

  	.content-body {
  		width: 100%;
  	}



  }
}	
</style>