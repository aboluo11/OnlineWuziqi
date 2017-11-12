<template>
	<div id="app">
		<div style="background-color:#444444;height:65px;width:100%" id="header">
			<div id="login" v-if="!me" class="login">
				<a :style="visibilityLogin" @click="route('login')">登录</a>
				<a :style="visibilityRegister" @click="route('register')">注册</a>
			</div>
			<div id="welcome" v-else-if="me" class="login">
				<p class="font">welcome {{me.name}}</p>
				<a @click="logout" :style="{visibility:state==='play'?'hidden':'visible'}">退出登录</a>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import axios from 'axios'
	import store from './store/store'
	import {mapState,mapMutations} from 'vuex'
	import draw from './util/draw'

	export default {
		store,
		computed:{
			...mapState(['ifLogin','me','state']),
			visibilityLogin:function(){
				const route = this.$route
				const visibility = !route?'hidden':route.path==='/'?'visible':this.ifLogin?'hidden':'visible'
				return {visibility:visibility}
			},
			visibilityRegister:function(){
				const route = this.$route
				const visibility = !route?'hidden':route.path==='/'?'visible':this.ifLogin?'visible':'hidden'
				return {visibility:visibility}
			}
		},
		methods:{
			...mapMutations(['setLR','setMe','setPlayers','setState']),
			route:function(type){
				this.setLR(type==='login'?true:false)
				this.$router.push("/login")
			},
			logout(){
				draw.socket.send(JSON.stringify({
					type:'logout'
				}))
			}
		}
	}
</script>

<style type="text/css" scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	#header a {
		color: white;
		opacity: 0.7;
		padding: .5rem 2.5rem;
		border: solid 1px #fff;
	}
	.login {
		width: 20%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
	}
	#header {
		display: flex;
		justify-content: flex-end;
	}
	a {
		text-decoration: none;
		padding: 0.2rem 0;
		cursor: pointer;
	}
	.font {
		color: #5fcf80;
		font-size: 19px;
	}
</style>
