<template>
  <div class="body">
    <div class="left-side">
      <div class="left-side-item" v-for="item in articles">
        <div class="left-side-item-left" @click="goArticlePage">
          <span class="left-side-item-left-title">{{item.title.slice(0, 41)}}</span>
          <ul>
            <li class="left-side-item-left-type">{{item.type}}</li>
            <li class="left-side-item-left-name">{{item.owner.name}}</li>
            <li class="left-side-item-left-created">{{Date(item.createdAt)}}</li>
          </ul>
        </div>
        <div class="left-side-item-right">
          <img :src="item.titleImg">
        </div>
      </div>
    </div>
    <div class="right-side">
    </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			articles: [
	      {
	        owner: {
	          uid: 'asdfasdfwe',
	          name: '小王'
	        },
	        content: '测试信息',
	        title: '这是一条测试消息',
	        titleImg: 'http://p6bztekng.bkt.clouddn.com/3255868.jpeg',
	        tag: ['tag1', 'tag2', 'tag3'],
	        type: '社团',
	        createdAt: '2018-04-01T11:59:46.746Z'
	      },
	      {
	        owner: {
	          uid: 'asdfasdfwe',
	          name: '小王'
	        },
	        content: '测试信息',
	        title: '这是一条测试消息',
	        titleImg: 'http://p6bztekng.bkt.clouddn.com/3255868.jpeg',
	        tag: ['tag1', 'tag2', 'tag3'],
	        type: '招聘',
	        createdAt: '2018-04-01T11:59:46.746Z'
	      },
	      {
	        owner: {
	          uid: 'asdfasdfwe',
	          name: '小王'
	        },
	        content: '测试信息xxxxxxxxxxxxxxxxxxxxxxxxsssssssss',
	        title: '这是一条测试消息xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
	        tag: ['tag1', 'tag2', 'tag3'],
	        type: '招聘',
	        createdAt: '2018-04-01T11:59:46.746Z'
	      }
	    ]
  	}
	},
	methods: {
		goArticlePage: function (e) {
			this.$router.push({path: '/article'})
		}
	}
}
	
</script>

<style lang="scss" scoped>
@import '../assets/css/common.css';

.body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80rem;
  margin-top: 10rem;

  .left-side {
    width: 50%;
    height: 70rem;
    margin-right: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

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

        .left-side-item-left-title {
            font-weight: 600;
            font-size: 1.8rem;
            overflow: hidden;
            line-height: 2rem;
            height: 2rem;
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
    width: 20%;
    border: 1px solid;
  }
}	
</style>