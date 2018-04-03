<template>
  <div class="body">
    <div class="left-side">
      <div class="left-side-item" v-for="(item, index) in articles">
        <div class="left-side-item-left" :data-index="index"  @click="goArticlePage">
          <div class="left-side-item-left-title">{{item.title.slice(0, 41)}}</div>
          <div>
            <ul>
              <li class="left-side-item-left-type">{{item.type}}</li>
              <li class="left-side-item-left-name">{{item.owner.name}}</li>
              <li class="left-side-item-left-created">{{getDate(item.createdAt)}}</li>
            </ul>
          </div>
        </div>
        <div class="left-side-item-right">
        </div>
      </div>
    </div>
    <div class="right-side">
      推荐信息
    </div>
  </div>
</template>

<script>
import config from '../../config/dev.env.js'
const IP = config.SERVER_IP
export default {
	data () {
		return {
			articles: []
  	}
	},
	methods: {
		goArticlePage: function (e) {
      let index = e.target.dataset.index
      let article = this.articles[index]
      let id = article._id
      console.log(id)
			this.$router.push({path: '/article/' + id})
		},
		getDate: function (createdAt) {
			let date = new Date(createdAt)
      let year = date.getFullYear()
      let mon = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      return year + '-' + mon + '-' + day
		}
	},
	created () {
		this.$http.get(IP + '/api/getAllArticle').then(response => {
			console.log(response.body.data)
			this.articles = response.body.data
		})
	}
}
	
</script>

<style lang="scss" scoped>
@import '../assets/css/common.css';

@media all and (max-width: 1000px) {
	.left-side {
		flex: 0 0 90%;
		margin-right: 0;
	}

	.right-side {
		display: none;
	}
}

.body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80rem;
  margin-top: 10rem;

  .left-side {
  	flex: .4 .4 50%;
    height: 70rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 5rem;

    .left-side-item {
      width: 100%;
      height: 10rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: .4rem;
      background-color: #f4f5f5;
      cursor: pointer;

      .left-side-item-left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        margin-left: 2rem;
        flex: 0 0 100%;

        .left-side-item-left-title {
        		flex: 0 0 60%;
            font-weight: 600;
            font-size: 1.8rem;
            overflow: hidden;
            line-height: 2rem;
        }

        .left-side-item-left-title:hover {
          color: green;
        }

        ul {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin: 0;
          padding: 0;
          width: 100%;

          li {
            margin-left: 1rem;
            padding: .2rem .5rem .2rem .5rem;
          }

          .left-side-item-left-type {
            padding: .2rem .5rem .2rem .5rem;
            background-color: #abbb79;
            border-radius: .3rem;
            text-align: center;
          }

          .left-side-item-left-name:hover {
            color: green;
          }
        }
      }

      .left-side-item-right {
        display: flex;
        margin-right: 2rem;
        align-items: center;
        img {
          width: 10rem;
          height: 7rem;
        }
      }
    }

    .left-side-item:hover {
      box-shadow: 1px 1px 15px rgba(55,173,112,0.15);
      background-color: rgb(240,240,240);
    }
  }

  .right-side {
  	flex: 0 0 20%;
    border: 1px solid;
  }
}	
</style>