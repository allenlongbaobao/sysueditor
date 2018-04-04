<template>
  <div class="wrap">
    <p class="site-name">SYSU AREA</p>
    <form class="signin" v-show="hasAccount">
      <input id="signinEmail" type="text" name="signin-email" placeholder="邮箱" @input="clearSignFail">
      <input id="signinPass" type="password" name="signin-pass" placeholder="密码" @inpu="clearSignFail">
      <input id="signinReset" type="reset" name="" style="display:none;">
      <span v-show="signinFail" class="legal-info">账号错误，请重新输入</span>
      <div>
        <button type="button" class="sigin-btn" @click="signIn">登录</button>
        <a href="javascript:(void 0)" @click="showSignup">注册</a>
        <a href="javascript:(void 0)" @click="forgetPass">忘记密码</a>
      </div>
    </form>
    <form class="signup" v-show="!hasAccount">
      <input id="signupName" type="text" name="signup-name" placeholder="用户名" @input="checkName">
      <span class="legal-info">{{nameIllegalInfo}}</span>
      <input id="signupEmail" type="text" name="sigup-email" placeholder="邮箱" @input="checkEmail">
      <span class="legal-info">{{emailIllegalInfo}}</span>
      <input id="signupPass" type="password" name="signup-pass" placeholder="密码" @input="checkPass">
      <span class="legal-info" v-if="passIllegal">密码长度应大于5小于13</span>
      <input type="password" name="signup-pass-repeat" placeholder="重复密码" @input="checkPassConsist">
      <span class="legal-info" v-if="passConsistIllegal">两次密码输入不一致</span>
      <input id="signupReset" type="reset" style="display: none">
      <div>
        <span v-show="signupFail" class="legal-info">注册失败</span>
        <button type="button" class="signup-btn" @click="signUp">注册</button>
        <a href="javascript:(void 0)" @click="showSignin">已有账号</a>
      </div>
    </form>
    <p class="three-part-p">第三方登录</p>
    <ul class="three-part-list">
      <li v-for="item in threeParts">
        <div class="oauth-bg">
          <a :href="item.link"><img :src="item.img"></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import env from '../../config/dev.env.js'
const IP = env.SERVER_IP

export default {
  data () {
    return {
      hasAccount: true,
      nameIllegal: false,
      passIllegal: false,
      passConsistIllegal: false,
      signinFail: false,
      signupFail: false,
      nameIllegalInfo: '',
      emailIllegalInfo: '',
      threeParts: [{
        name: '微信',
        img: './static/wechat.svg',
        link: '#'
      },
      {
        name: '微博',
        img: './static/weibo.svg',
        link: '#'
      }]
    }
  },
  created () {
    this.hasAccount = this.$route.params.type === 'signIn' ? true : false
  },
  methods: {
    showSignup: function () {
      this.hasAccount = false
    },
    showSignin: function () {
      this.hasAccount = true
    },
    forgetPass: function () {
      alert('oh, i forget')
    },
    clearSignFail: function () {
      if (this.signinFail === true) {
        this.signinFail = false
      }

    },
    checkName: function (e) {
      let nickName = e.target.value
      let regex = /^^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{6,12}$/
      if (regex.test(nickName)) {
        this.nameIllegalInfo = ''
        this.$http.post(IP + '/api/checkNickNameExisted', {nickName}).then(response => {
          console.log(response)
          if (response.body.code !== 1) {
            this.nameIllegalInfo = '用户名已存在，请重新输入'
          }
        })
      } else if (nickName !== '') {
        this.nameIllegalInfo = '用户名格式不正确'
      } else {
        this.nameIllegalInfo = ''
      }
    },
    checkEmail: function (e) {
      let value = e.target.value
      let regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regex.test(value)) {
        this.emailIllegalInfo = ''
        this.$http.post(IP + '/api/checkEmailExisted', {email: value}).then(response => {
          console.log(response)
          if (response.body.code !== 1) {
            this.emailIllegalInfo = '邮箱已存在，请重新输入'
          } else {
          }
        })
      } else if (value !== '') {
        // 邮箱不合法
        this.emailIllegalInfo = '邮箱格式不正确'
      } else {
        // 清空
        this.emailIllegalInfo = ''
      }
    },
    checkPass: function (e) {
      const pass = e.target.value
      if (pass.length < 6 || pass.length > 12) {
        if (pass.length === 0) {
          this.passIllegal = false
        } else {
          this.passIllegal = true
        }
      } else {
        this.passIllegal = false
      }
    },
    checkPassConsist: function (e) {
      const passConsist = e.target.value
      const pass = document.getElementById('signupPass').value
      if (pass === passConsist) {
        this.passConsistIllegal = false
      } else {
        this.passConsistIllegal = true
      }
    },
    signIn: function () {
      const email = document.getElementById('signinEmail').value
      const pass = document.getElementById('signinPass').value
      const data = {email, pass}

      this.$http.post(IP + '/api/signIn', data, {
        withCredentials: true
      }).then(response => {
        console.log(response)
        if (response.body.code !== 1) {
          this.signinFail = true
          document.getElementById('signinReset').click()
        } else {
          this.$router.push({path: '/', params: {data: response.body.data, signIn: true}})
        }

      })
    },
    signUp: function () {
      const nickName = document.getElementById('signupName').value
      const email = document.getElementById('signupEmail').value
      const pass = document.getElementById('signupPass').value
      const data = {nickName, email, pass}
      console.log(data)

      this.$http.post(IP + '/api/signUp', data, {
        withCredentials: true
      }).then(response => {
        console.log(response)
        if (response.body.code !== 1) {
          this.signupFail = true
          document.getElementById('signupReset').click()
        } else {
          this.$router.push({path: '/', params: {data: response.body.data, signIn: true}})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.site-name {
  font-size: 5rem;
}
.wrap {
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  width: 40rem;
}

.signin, .signup {
  display: flex;
  flex-direction: column;
  width: 30rem;
  input {
    height: 3rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    outline: none;
    border: none;
    border-bottom: solid 1px;
    font-size: 2rem;
  }

  .legal-info {
    align-self: flex-start;
    color: red;
  }

  div {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    button {
      width: 10rem;
      height: 2.9rem;
      margin-top: 1rem;
      background-color: green;
      outline: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 2px;
    }
    button:hover {
      background-color: rgb(2, 73, 26);
    }

    a {
      margin-top: 1rem;
    }
  }
}

.three-part-list {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
  padding: 0;

  .oauth-bg {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #f4f8fb;
    display: flex;
    align-items: center;
    justify-content:center;
    img {
      height: 2.3rem;
      vertical-align: center;
    }
  }
}

.three-part-p {
  color: #8b9196;
  font-size: 1.5rem;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
}
a {
  text-decoration: none;
  color: green;
}

ul {
  list-style: none;
}
</style>
