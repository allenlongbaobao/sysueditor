<template>
  <div class="wrap">
    <div class="header">
      <span class="logo">中大地带</span>
      <ul class="header-side">
        <li>
          <ul class="header-side-menu">
            <li v-for="item in menus">
              <a :href="item.link">{{item.name}}</a>
            </li>
          </ul>
        </li>
        <li>
          <img src="">
        </li>
        <li class="header-side-search">
          <div class="header-side-search-wrap">
            <input class="" type="search" name="search" placeholder="搜索">
            <span class="typcn typcn-zoom icon"></span>
          </div>
        </li>
        <li >
          <div id="addMoreList" class="header-side-btn">
            <button class="add-article" @click="addArticle">发文</button
            ><div class="add-more" @mouseover="openPanel" @mouseleave="closePanel">
              <i class="add-more-dropdown typcn typcn-arrow-sorted-down"></i>
            </div>
            <ul class="add-more-list" v-show="openAddMore" @mouseover="openPanel" @mouseleave="closePanel"  >
              <li @click="addTopic"><a href="#">建话题</a></li>
              <li @click="addActivity"><a href="#">办活动</a></li>
            </ul>
          </div>
        </li>
        <li class="header-side-alert">
          <span class="typcn typcn-world"></span>
      </li>
        <li v-if="isSignIn" class="header-side-avator">
          <div class="header-side-avator-wrap">
          </div>
        </li>
        <li v-if="!isSignIn" class="header-side-sign">
          <a @click="goSign('signIn')">登录</a>
          <a @click="goSign('signUp')">注册</a>
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="left-side">
        <div class="left-side-item" v-for="item in articles">
          <div class="left-side-item-left">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      openAddMore: false,
      isSignIn: false,
      menus: {
        title1:
        {
          name: '主页',
          link: '#'
        },
        title2:
        {
          name: '攻略',
          link: '#'
        },
        title3:
        {
          name: '活动',
          link: '#'
        }
      },
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
    openPanel: function () {
      this.openAddMore = true
    },
    closePanel: function () {
      this.openAddMore = false
    },
    goSign: function (str) {
      this.$router.push({name: 'Admin', params: {type: str}})
    },
    addArticle: function () {
      this.$router.push({name: 'AddArticle'})
      console.log('addArticle')
    },
    addTopic: function () {
      this.$router.push({name: 'AddTopic'})
      console.log('addTopic')
    },
    addActivity: function () {
      this.$router.push({name: 'AddActivity'})
      console.log('addActivity')
    }
  },
  created () {
    if (this.$route.params.signIn) {
      this.isSignIn = true
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      const dialog = document.getElementById('addMoreList')
      this.openAddMore = dialog.contains(e.target)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.css';

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 5rem;
    border-bottom: 1px solid;
    position: fixed;
    width: 100%;
    z-index: 250;
    background-color: white;

    .logo {
      font-size: 3rem;
      padding-left: 16rem;
    }

    .header-side {
      width: 65%;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      list-style: none;
      font-size: 2rem;
      padding: 0;

      .header-side-menu {
        display: flex;
        flex-direction: row;
        text-justify: space-between;
        align-items: center;
        list-style: none;
        justify-content: space-between;
        width: 20rem;
        padding: 0;
        a {
          text-decoration: none;
          color: black;
        }

        li:first-child > a {
          color: green;
        }
        li:hover > a {
          color: green;
        }
      }

      .header-side-search-wrap {
          border-radius: 1rem;
          border: 1px solid green;
        input {
          height: 2rem;
          width: 14rem;
          flex-basis: 1rem;
          outline: none;
          border: none;
          margin: .3rem .5rem .3rem .5rem;
          font-size: 1.4rem;

        }
      }

      .header-side-btn {
        display: flex;

        .add-article {
          border-bottom-right-radius: 0px;
          border-top-right-radius: 0px;
          width: 8rem;
        }
        .add-more {
          width: 1.5rem;
          padding-left: 0;
          background-color: #19a819;
          border-left: 1px solid  rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .add-more-dropdown {
          color: white;
        }

        .add-more-list {
          position: absolute;
          top: 79%;
          display: flex;
          flex-direction: column;
          width: 9.5rem;
          list-style: none;
          border: 1px solid;
          color: green;
          margin: 0;
          padding: 0;
          background-color: white;
          cursor: pointer;
          text-align: center;

          a {
            color: #666;
            font-size: 1.5rem;
          }

          li:hover {
            background-color: #e6e9e6;
          }
        }
      }

      .header-side-alert {
        font-size: 2.5rem;
      }

      .header-side-avator {

        .header-side-avator-wrap {
          border-radius: 50%;
          border: 1px solid;
          width: 3.5rem;
          height: 3.5rem;
          background-image: url(http://p6bztekng.bkt.clouddn.com/3255868.jpeg);
          cursor: pointer;
        }
      }

      .header-side-sign {
        a {
          cursor: pointer;
        }

        a:first-child::after{
          content: '|'
        }

        a:hover {
          color: green;
        }
      }
    }
  }

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
}
</style>
