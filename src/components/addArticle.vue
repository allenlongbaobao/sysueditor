<template>
  <div class="wrap">
    <div class="header">
      <input id="articleTitle" type="text" name="" placeholder="请输入标题">
      <div class="panel-parent">
        <span data-panel-type="titleImgPanelShow" class="addTitleImg typcn typcn-image" @click="switchPanel"></span>
        <div v-show="panels.titleImgPanelShow" class="panel addTitleImgPanel">
        </div>
      </div>
      <span @click="changeEditor">切换编辑器</span>
      <div class="panel-parent">
        <span data-panel-type="publicSelectBoxPanelShow" @click="switchPanel">发布</span>
        <div v-show="panels.publicSelectBoxPanelShow" class="panel publicSelect">
          <span>标签</span>
          <div class="publicSelect-type">
            <div v-for="item in typeItems" @click="activeItem">
              {{item}}
            </div>
          </div>
          
          <button class="publicSelect-type-submit" @click="addArticle">确认发布</button>
        </div>
      </div>
      <div>
        <span @click="goMainPage">返回</span>
      </div>
    </div>
    <div v-if="markEditorChosed" class="body">
      <div class="body-left">
        <textarea class="body-left" placeholder="请输入内容" @input="updateContent"></textarea>
      </div>
      <div class="body-right">
        <markHtml :mhtml="compileMarkedDown"></markHtml>
      </div>
    </div>

    <div v-show="!markEditorChosed" class="richtext-body">
      <div id="richtext-title" class="richtext-title"></div>
      <div class="whiteArea"></div>
      <div id="richtext-editarea" style="text-align:left"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import highlightjs from 'highlightjs'
import markHtml from './pages/MarkHtml.vue'
import E from 'wangEditor'

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
  name: 'editor',
  data () {
    return {
      editorContent: '',
      articleContent: '',
      markEditorChosed: true,
      panels: {titleImgPanelShow: false, publicSelectBoxPanelShow: false},
      typeItems: ['社团', '招聘', '求助', '随笔'],
      selectType: ''
    }
  },
  components: {
    markHtml
  },
  computed: {
    compileMarkedDown: function () {
      return marked(this.articleContent)
    }
  },
  methods: {
    switchPanel: function (e) {
      const type = e.target.dataset.panelType
      for(let p in this.panels) {
        this.panels[p] = p === type ? !this.panels[p] : false
      }
    },
    updateContent: function (e) {
      this.articleContent = e.target.value
    },
    changeEditor: function () {
      if (this.markEditorChosed === true) {
        this.articleContent = ''
      } else {
        this.editorContent = ''
      }
      this.markEditorChosed = !this.markEditorChosed
    },
    activeItem: function (e) {
      const children = e.target.parentElement.children
      for(let i = 0; i < children.length; i++) {
        children[i].className = ''
      }
      e.target.className = 'active'
      this.selectType = e.target.value
    },
    goMainPage: function () {
      this.$router.push({path: '/home'})
    },
    addArticle: function () {
      let data = {
        title: document.getElementById('articleTitle'),
        content: this.articleContent === '' ? this.editorContent : this.articleContent, // 两种编辑器只能选其中一种
        type: this.selectType,
        owner: {
          uid: '',
          name: ''
        },
        createdAt: new Date()
      }
      this.$http.post(IP + '/api/addArticle', data).then(response => {

      })
    }

  },
  mounted () {
    let editorTitle= document.getElementById('richtext-title')
    let editorArea = document.getElementById('richtext-editarea')
    let editor = new E(editorTitle, editorArea)
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.css';
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  .header {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
    position: fixed;  
    z-index: 100;

    span {
      cursor: pointer;
      font-size: 2rem;
    }

    span:hover {
      color: green;
    }

    input {
      width: 60%;
      border: none;
      font-size: 3rem;
      color: #666;
      z-index: -1;
      outline: none;
    }

    .addTitleImg {
      font-size: 3rem;
    }

    .addTitleImgPanel {
      width: 20rem;
      height: 20rem;
    }

    .publicSelect {
      top: 137%;
      left: -260%;
      width: 25rem;
      height: 20rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      z-index: 1001;
      background-color: white;

      .publicSelect-type {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2rem;
        align-self: center;

        div {
          border: 1px solid #ccc;
          border-radius: 2px;
          width: 5rem;
          height: 3rem;
          text-align: center;
          padding: 1px;
          margin: 0 1px 1px 3px;
          display: inline-block;
          cursor: pointer;
        }

        .active {
          border-color: green;
          color: green;
        }

        div:hover {
          border-color: green;
          color: green;
        }
      }

      .publicSelect-type-submit {
        align-self: center;
      }


    }

    .header-side-avator-wrap {
      border-radius: 50%;
      border: 1px solid;
      width: 3.5rem;
      height: 3.5rem;
      background-image: url(http://p6bztekng.bkt.clouddn.com/3255868.jpeg);
      cursor: pointer;
    }
  }

  .body {
    display: flex;
    top: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
    height: 92.8%;

    .body-left {
      height: 100%;
      width: 50%;
      display: flex;

      textarea {
        min-width: 0;
        padding-left: 5rem;
        padding-top: 2rem;
        width: 100%;
        height: 100%;
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 2rem;

      }
    }

    .body-right {
      height: 100%;
      width: 50%;
      overflow: scroll;
      padding-top: 2rem;
      padding-left: 2rem;
      font-size: 2rem;
    }
  }

  .richtext-body {
    width: 80%;
    height: 80%;
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 15%;

    #richtext-title {
      border: 1px solid;
    }

    .whiteArea {
      height: 2rem;
    }

    #richtext-editarea {
      border: 1px solid;
      width: 100%;
      height: 90%;
    }
  }

}
</style>
