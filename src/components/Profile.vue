<template>
	<div class="body">
		<div class="wrap">
			<h1>账号信息</h1>
			<ul class="info-ul">
				<li>
					<div class="info-avator">
						<span>头像:</span>
						<img style="width: 3rem; height: 3rem;" :src="avator">
						<button>上传</button>
					</div>
				</li>
				<li v-for="(item, key) in displayUserInfo">
					<div class="info-item email">
						<span class="item-left">{{cnInfo[key]}}:</span>
						<div class="info-item-input-div">
							<input class="info-item-input" type="" name="" placeholder="未填写" :value="item">
							<div class="info-item-modify">
								<div v-show="true" class="item-modify" >
									<span>修改</span>
								</div>
								<div v-show="false" class="item-confirm">
									<span>确认</span>
									<span>取消</span>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="follower">
						<span>关注的人:</span>
					</div>
				</li>
				<li>
					<div class="following">
						<span>关注我的人:</span>
					</div>
				</li>
				<li>
					
					<div class="society">
						<span>认证社团:</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import config from '../../config/dev.env.js'
const IP = config.SERVER_IP

export default {
	data () {
		return {
			displayUserInfo: {},
			avator: '',
			cnInfo: {
				name: '真实姓名',
				nickName: '昵称',
				email: '邮箱',
				birthday: '生日',
				type: '账号类型',
				school: '学校'
			},
			follwer: [],
			following: [],
			society: []
		}
	},
	created () {
		this.$http.post(IP + '/api/getCurrentUserInfo', {}, {withCredentials: true}).then(response => {
			console.log(response)
			let data = response.body.data
			if (response.body.code === 1) {
				this.follwer = data.follower
				this.following = data.following
				this.society = data.society
				this.avator = data.avator
				delete data.follower
				delete data.following
				delete data.society
				delete data.avator
				this.displayUserInfo = data
			}

		})
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

  span {
  	font-size: 2rem;
  	font-weight: 50;
  }

  input {
  	border: none;
  	outline: none;
  	font-size: 1.5rem;
  	color: #ccc;
  }

  input:focus {
  	color: black;
  }

  .wrap {
  	flex: 0 0 60%;
  	display: flex;
  	flex-direction: column;
  	justify-content: space-between;

  	h1 {
  		flex: 0 0 10%;
  	}

  	.info-ul {
  		flex: 0 0 90%;
  		display: flex;
  		flex-direction: column;
  		justify-content: space-between;

  		li {
  			width: 100%;
  			border-bottom: 1px solid #ccc;
  			display: flex;
  			align-items: center;

  			.info-item {
  				display: flex;
  				justify-content: space-between;
  				width: 100%;

  				span {
  					width: 3rem;
  					flex: .2 0 0;
  				}

  				.info-item-input-div {
  					display: flex;
  					justify-content: flex-end;
  					flex: .8 0 0;

  					.info-item-input {
  						flex: .8 0 0;

  					}

  					.info-item-modify {
  						flex: .2 0 0;
  					}

  				}
  			}
  		}
  	}
  }
}
	
</style>