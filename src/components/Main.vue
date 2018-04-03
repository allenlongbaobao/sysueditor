<template>
  <div class="wrap">
    <div id="header" class="header">
      <span class="logo">中大地带</span>
      <ul id="header-side" class="header-side">
        <li>
          <ul class="header-side-menu">
            <li v-for="item in menus">
              <span @click="goHomePage">{{item.name}}</span>
            </li>
          </ul>
        </li>
        <li class="header-side-search">
          <div class="header-side-search-wrap">
            <input class="" type="search" name="search" placeholder="搜索">
            <span class="typcn typcn-zoom icon"></span>
          </div>
        </li>
        <li  class="header-side-btn-wrap">
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
        <li v-show="isSignIn" class="header-side-avator">
          <div id="userInfoPanel"class="panel-parent">
            <div class="header-side-avator-wrap" @click="switchUserInfoPanel"></div>
            <div v-show="userInfoPanel"class="panel user-info"@click="switchUserInfoPanel">
              <div @click="goUserPage"><span class="typcn typcn-home-outline"></span>个人主页</div>
              <div @click="goProfile"><span class="typcn typcn-cog-outline"></span>设置</div>
              <div><span class="typcn typcn-th-large-outline"></span>关于</div>
              <div @click="signOut"><span class="typcn typcn-arrow-back-outline"></span>注销</div>
            </div>
          </div>
        </li>
        <li v-show="!isSignIn" class="header-side-sign">
          <a @click="goSign('signIn')">登录</a>
          <a @click="goSign('signUp')">注册</a>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import config from '../../config/dev.env.js'
const IP = config.SERVER_IP

export default {
  data () {
    return {
      id: '',
      openAddMore: false,
      isSignIn: false,
      userInfoPanel: false,
      menus: {
        title1:
        {
          name: '主页',
          link: '/'
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
      }
    }
  },
  methods: {
    openPanel: function () {
      this.openAddMore = true
    },
    closePanel: function () {
      this.openAddMore = false
    },
    switchUserInfoPanel: function () {
      this.userInfoPanel = this.userInfoPanel === false ? true : false
    },
    goSign: function (str) {
      this.$router.push({name: 'Admin', params: {type: str}})
    },
    goUserPage: function () {
      this.$router.push({path: '/user'})
    },
    goProfile: function () {
      this.$router.push({name: 'Profile', params: {id: this.id}})
    },
    goHomePage: function () {
      this.$router.push({path: '/'})
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
    },
    signIn: function () {
      this.$http.post(
        IP + '/api/signIn', 
        {}, 
        {
          withCredentials: true,
          progress: event => {
            //this.masterShow = true
          }
        }).then(response => {
          if (response.body.code === 1) {
            // 用户已登录
            this.isSignIn = true
            this.id = response.body.user._id
            
          }
        })
    },
    signOut: function () {
      this.$http.post(IP + '/api/signOut', {}, {withCredentials: true}).then(response => {
        if (response.body.code === 1) {
          this.isSignIn = false
          this.$router.push({name: 'Admin', params: {type: 'signIn'}})
        }
      })
    }
  },
  created () {
    if (this.$route.params.signIn) {
      this.isSignIn = true
    } else {
      this.signIn()
    }
  },
  mounted () {
    document.addEventListener('click', e =>{
      const dialog = document.getElementById('userInfoPanel')
      this.userInfoPanel = dialog.contains(e.target)
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
    justify-content: center;
    align-items: center;
    height: 5rem;
    border-bottom: 1px solid;
    position: fixed;
    width: 100%;
    z-index: 250;
    background-color: white;

    .logo {
      font-size: 3rem;
      flex: .4 0 auto;
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
        span {
          text-decoration: none;
          color: black;
          cursor: pointer;
        }

        li:first-child > span {
          color: green;
        }
        li:hover > span {
          color: green;
        }
      }

      .header-side-search {
        display: flex;
        justify-content: center;

        .header-side-search-wrap {
            border-radius: 1rem;
            border: 1px solid green;
            width: 63%;
          input {
            height: 2rem;
            width: 58%;
            flex-basis: 1rem;
            outline: none;
            border: none;
            margin: .3rem .5rem .3rem .5rem;
            font-size: 1.4rem;
            -webkit-appearance: none;
          }
          span {
            width: 10%;
          }
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

        .user-info {
          width: 10rem;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          left: -90%;
          padding: .5rem 0 .5rem 0;

          div {
            width: 10rem;
            text-align: left;
            cursor: pointer;
            z-index: 1001;
            font-size: 1.5rem;
            padding: .8rem 0 .8rem 0;

            span {
              margin: 0 .8rem 0 .8rem;
            }
          }

          div:hover {
            background-color: #ccc;
          }
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
}

@media all and (max-width: 800px) {
  .header-side-search {
    display: none;
  }

  .header-side-btn-wrap {
    display: none;
  }

  .logo {
    display: none;
  }
}

@media all and (max-width: 600px) {
  .header-side-search .header-side-search-wrap {
    display: none;
  }

  .header-side-btn {
    display: none;
  }

  .header-side-alert {
    display: none;
  }

  .logo {
    display: none;
  }

  #header-side {
    width: 100%;
  }
}
</style>
