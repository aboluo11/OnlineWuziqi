import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import draw from '../util/draw'

Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		ifLogin:true,
		players:[],
		me:undefined,
		state:null
	},
	mutations:{
		reverseLR(state){
			state.ifLogin = !state.ifLogin
		},
		setLR(state,ifLogin){
			state.ifLogin = ifLogin
		},
		setPlayers(state,payload){
			state.players = payload.players
		},
		setMe(state,me){
			state.me = me
		},
		setState(state,type){
			if(type==='play'){
				draw.wait = false
			}
			state.state = type
		},
		win(state){
			state.me.winGames+=1
			state.me.totalGames+=1
		},
		defeat(state){
			state.me.totalGames+=1
		}
	},
	actions:{
		gameOver(context){
			context.commit('setState',null)
		}
	}
})