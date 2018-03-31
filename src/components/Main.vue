<template>
  <div class="wrap">
    <div class="header">
      <span class="logo">中大地带</span>
      <ul class="header-side">
        <li>
          <ul class="header-side-menu">
            <li v-for="(item, key) in menus">
              <a :href="item.link">{{item.name}}</a>
            </li>
          </ul>
        </li>
        <li>
          <img src="">
        </li>
        <li class="header-side-search">
          <input type="search" name="search" placeholder="搜索">
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
        <li class="header-side-avator">
          <div class="header-side-avator-wrap">
          </div>
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="left-side">
        <h1>safasdf</h1>
        
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
    addArticle: function () {
      this.$router.push({name: 'addArticle'})
      console.log('addArticle')
    },
    addTopic: function () {
      this.$router.push({name: 'addTopic'})
      console.log('addTopic')
    },
    addActivity: function () {
      this.$router.push({name: 'addActivity'})
      console.log('addActivity')
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      const dialog = document.getElementById('addMoreList')
      this.openAddMore = dialog.contains(e.target) ? true : false
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
      
      input {
        height: 2rem;
        flex-basis: 1rem;
        border-radius: 1rem;
        border: 1px solid green;
        outline: none;
        height: 3rem;
      }

      .header-side-btn {
        display: flex;

        .add-article {
          border-bottom-right-radius: 0px;
          border-top-right-radius: 0px;
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
          width: 11.5rem;
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
      border: 1px solid;
      margin-right: 5rem;
    }

    .right-side {
      width: 20%;
      border: 1px solid;
    }
  }
}
</style>
