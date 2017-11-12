<template>
	<div>
		<div id="container">
			<div id="main">
				<div id="title">
					<a :class="ifLogin?'choosen':false" @click="reverseLR">登录</a>
					<b>.</b>
					<a :class="ifLogin?false:'choosen'" @click="reverseLR">注册</a>
				</div>
				<form>
					<div id="np">
						<div>
							<svg class="icon" aria-hidden="true" id="nameIcon">
								<use xlink:href="#icon-user"></use>
							</svg>
							<input id="name" placeholder="用户名" type="text" v-model="name">
						</div>
						<div>
							<svg class="icon" aria-hidden="true" id="nameIcon">
								<use xlink:href="#icon-password"></use>
							</svg>
							<input id="pwd" placeholder="密码" type="password" v-model="password">
						</div>
					</div>
					<div class="tip" v-if="tip">
						<p>您已在其他页面登录,确定登录吗?</p>
						<a @click='jump'>是</a>
						<a @click="notForceLogin">否</a>
					</div>
					<input type="submit" id="submit" :value="ifLogin?'登录':'注册'" @click='submit' v-if="!tip"></input>
				</form>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import '../../static/iconfont.js'
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
import draw from '../util/draw'

const mydata = {
	data: null,
	forceLoginClose: false
}

export default {
	data: function () {
		return {
			name: '',
			password: '',
			tip: false
		}
	},
	computed: {
		...mapState(['ifLogin', 'state', 'me'])
	},
	methods: {
		...mapMutations(['reverseLR', 'setMe', 'setState', 'win', 'defeat']),
		...mapActions(['gameOver']),
		submit(event) {
			event.preventDefault()
			const socket = new WebSocket('ws://120.25.229.44:8081/ws')
			draw.socket = socket
			socket.onopen = () => {
				socket.send(JSON.stringify({
					type: this.ifLogin ? 'login' : 'register',
					name: this.name,
					pwd: this.password
				}))
				setInterval(function(){
					socket.send(JSON.stringify({type:"ping"}))
				},4*1000)
			}
			socket.onmessage = (event) => {
				const data = JSON.parse(event.data)
				mydata.data = data
				switch (data.type) {
					case 'login':
						if (data.message === 'success') {
							this.jump()
						} else if (data.message === 'hasLogin') {
							this.tip = true
						} else if (data.message === 'wrong') {
							alert("用户名或密码错误")
							mydata.forceLoginClose = true
							socket.close()
						}
						break
					case 'register':
						if (data.message === 'success') {
							alert('注册成功!')
							this.jump()
						} else {
							alert('用户已存在')
							mydata.forceLoginClose = true
							socket.close()
						}
						break
					case 'ready':
						this.setState('ready')
						alert('等待其他玩家')
						break
					case 'play':
						this.setState('play')
						alert('开始游戏!')
						break
					case 'coo':
						draw.drawChess(data.coo, false)
						break
					case 'defeat':
						draw.drawChess(data.coo, false)
						this.gameOver()
						this.defeat()
						alert('你输了!')
						break
					case 'win':
						this.gameOver()
						this.win()
						alert('你赢了!')
						break
					case 'drop':
						this.gameOver()
						this.win()
						alert("对方掉线,你赢了!")
						break
					case 'forceLogin':
						mydata.forceLoginClose = true
						alert("您在其他页面登录!")
						socket.close()
						break
				}
			}
			socket.onclose = (event) => {
				if (!mydata.forceLoginClose) {
					alert('您已掉线!')
				} else {
					mydata.forceLoginClose = false
				}
				this.setMe(null)
				this.setState(null)
				draw.replay()
			}
		},
		jump() {
			if (this.tip) {
				draw.socket.send(JSON.stringify({
					type: 'forceLogin',
					id: mydata.data.me.id
				}))
				this.tip = false
			}
			this.setMe(mydata.data.me)
			this.$router.push('/')
		},
		notForceLogin(){
			mydata.forceLoginClose = true
			this.tip=false
			draw.socket.close()
		}
	}
}
</script>

<style type="text/css" scoped>
.tip {
	display: flex;
	color: red;
	align-items: center;
	justify-content: space-between;
}

.tip a {
	border: 1px solid #ea6f5a;
}

.tip p {
	width: 180px;
}

#container {
	display: flex;
	justify-content: center;
}

#main {
	margin-top: 10%;
	width: 400px;
	height: 400px;
	background-color: white;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}

#title {
	font-size: 20px;
	color: #969696;
	display: flex;
}

a {
	cursor: pointer;
	padding: 8px;
}

.choosen {
	font-weight: 700;
	color: #ea6f5a;
	border-bottom: 2px solid #ea6f5a;
}

b {
	padding: 8px;
}

form {
	height: 240px;
	width: 295px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

#np {
	display: flex;
	flex-direction: column;
}

input {
	height: 50px;
	border: 1px solid #c8c8c8;
	font-size: 16px;
}

#np div {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

#np input {
	padding-left: 35px;
}

#name {
	border-bottom: none;
	border-radius: 4px 4px 0 0;
}

#pwd {
	border-radius: 0 0 4px 4px;
}

#submit {
	border-radius: 4px;
	background-color: #187cb7;
	color: white;
	font-size: 18px;
	cursor: pointer;
}

.icon {
	width: 23px;
	height: 23px;
	fill: #969696;
	overflow: hidden;
	position: absolute;
	margin-left: 6px;
}
</style>