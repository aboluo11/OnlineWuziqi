<template>
  <div class="hello">
    <div id="main">
      <div id="left">
        <cv/>
        <div id="footer">
          <a id="ready" @click='ready' v-bind:style="{visibility:state?'hidden':'visible'}">准备</a>
          <a id="myMessage" @click='myMessage'>我的信息</a>
        </div>
      </div>
      <div id="rankingList">
        <table style="text-align:center" v-if="players.length">
          <tr>
            <th colspan="2">英雄榜</th>
          </tr>
          <tr style="height:40px" v-for="player in players" :key="player.name">
            <td width="100px">{{player.name}}</td>
            <td width="100px">{{calcu(player)}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import cv from './Canvas.vue'
  import {mapState,mapActions,mapMutations} from 'vuex'
  import draw from '../util/draw'
  import axios from 'axios'

  export default {
    components:{
      cv
    },
    computed:{
      ...mapState(['players','me','state'])
    },
    methods:{
      ...mapActions(['gameOver']),
      ...mapMutations(['setPlayers']),
      calcu(player){
        if(player.totalGames===0) return '0.00%'
          let rate = player.winGames/player.totalGames
        rate = (rate*100).toFixed(2)+'%'
        return rate
      },
      ready(){
        if(!this.me){
          alert('请先登录!')
          return
        }
        draw.replay()
        const socket = draw.socket
        socket.send(JSON.stringify({type:'ready',id:this.me.id}))
      },
      myMessage(){
        if(!this.me){
          alert('请先登录')
        }else{
          alert("胜场:"+this.me.winGames+"\n总场次:"+this.me.totalGames+"\n胜率:"+(this.me.winGames/this.me.totalGames*100).toFixed(2)+"%")
        }
      }
    },
    created(){
      axios.get('/api/getPlayers').then(function(response){
        const data = response.data
        this.setPlayers(data)
      }.bind(this))
      setInterval(function(){
        axios.get('/api/getPlayers').then(function(response){
          const data = response.data
          this.setPlayers(data)
        }.bind(this))
      }.bind(this),31*1000)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #rankingList {
    margin-left: 50px;
  }
  #main {
    margin-top: 10px;
    display: flex;
  }
  #footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 80px;
  }
  a {
    width: 100px;
    text-align: center;
    border-radius: 0.3rem;
    background-color: #0066ff;
    color: white;
    font-size: 16px;
    text-decoration: none;
    padding: 0.2rem 0;
    cursor: pointer;
  }
  #rankingList {
    margin-top: 50px;
  }
</style>
