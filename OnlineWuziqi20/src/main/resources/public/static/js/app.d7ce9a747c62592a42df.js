webpackJsonp([1],{1:function(e,t,i){"use strict";var n=i(4),s=i.n(n),a=i(19);t.a={preI:null,preJ:null,ctx:null,canvas:null,chesses:[],socket:null,wait:!1,drawChess:function(e,t){function i(e,t,i){a.beginPath(),a.arc(40*e+1,40*t+1,12,0,360),a.fillStyle=i?"black":"white",a.fill()}var n=e[0],s=e[1];if(0==this.chesses[n][s]){var a=this.ctx,o=this.preI,r=this.preJ;o&&(a.clearRect(40*o-19,40*r-19,40,40),a.beginPath(),a.moveTo(40*o-19,40*r+1),a.lineTo(40*o+21,40*r+1),a.moveTo(40*o+1,40*r-19),a.lineTo(40*o+1,40*r+21),a.strokeStyle="black",a.stroke(),i(o,r,!t)),i(n,s,t),a.moveTo(40*n-14,40*s-14),a.lineTo(40*n+16,40*s-14),a.lineTo(40*n+16,40*s+16),a.lineTo(40*n-14,40*s+16),a.lineTo(40*n-14,40*s-14),a.strokeStyle="green",a.stroke(),this.preI=n,this.preJ=s,this.chesses[n][s]=t?1:2,this.wait=t===!0}},drawLine:function(){var e=this.ctx;e.strokeStyle="black";for(var t=0;t<16;t++)e.beginPath(),e.moveTo(0,40*t+1),e.lineTo(602,40*t+1),e.moveTo(40*t+1,0),e.lineTo(40*t+1,602),e.stroke()},onclick:function(){var e=this;this.canvas.onclick=function(t){if("play"===a.a.state.state&&!e.wait){var i=t.offsetX,n=t.offsetY,o=Math.round((i-1)/40),r=Math.round((n-1)/40);if(e.drawChess([o,r],!0),e.ifwin(o,r))return void e.socket.send(s()({type:"win",coo:[o,r]}));e.socket.send(s()({type:"coo",coo:[o,r]}))}}},init:function(e){this.canvas=e,this.ctx=e.getContext("2d"),this.preI=null,this.preJ=null,this.drawLine();for(var t=0;t<16;t++){this.chesses[t]=[];for(var i=0;i<16;i++)this.chesses[t][i]=0}this.onclick()},replay:function(){this.preI=null,this.preJ=null,this.chesses=this.chesses.map(function(e){return e.map(function(e){return 0})}),this.ctx.clearRect(0,0,602,602),this.drawLine(),this.onclick()},ifwin:function(e,t){var i=this.chesses;e:for(var n=t-4;n<=t;n++){for(var s=n;s<n+5;s++)if(s<0||s>=16||1!=i[e][s])continue e;return!0}e:for(var a=e-4;a<=e;a++){for(var o=a;o<a+5;o++)if(o<0||o>=16||1!=i[o][t])continue e;return!0}e:for(var r=e-4,c=t-4;r<=e;r++,c++){for(var l=r,u=c;l<r+5;l++,u++)if(l<0||l>=16||c<0||c>=16||1!=i[l][u])continue e;return!0}e:for(var d=e-4,v=t+4;d<=e;d++,v--){for(var f=d,p=v;f<d+5;f++,p--)if(f<0||f>=16||v<0||v>=16||1!=i[f][p])continue e;return!0}}}},19:function(e,t,i){"use strict";var n=i(6),s=i(2),a=i(3),o=(i.n(a),i(1));n.a.use(s.c),t.a=new s.c.Store({state:{ifLogin:!0,players:[],me:void 0,state:null},mutations:{reverseLR:function(e){e.ifLogin=!e.ifLogin},setLR:function(e,t){e.ifLogin=t},setPlayers:function(e,t){e.players=t.players},setMe:function(e,t){e.me=t},setState:function(e,t){"play"===t&&(o.a.wait=!1),e.state=t},win:function(e){e.me.winGames+=1,e.me.totalGames+=1},defeat:function(e){e.me.totalGames+=1}},actions:{gameOver:function(e){e.commit("setState",null)}}})},24:function(e,t,i){"use strict";var n=i(6),s=i(89),a=i(83),o=i.n(a),r=i(84),c=i.n(r);n.a.use(s.a),t.a=new s.a({routes:[{path:"/",name:"Hello",component:o.a},{path:"/login",name:"Login",component:c.a}],mode:"history"})},25:function(e,t,i){i(79);var n=i(5)(i(44),i(87),"data-v-7ca92acd",null);e.exports=n.exports},43:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(6),s=i(25),a=i.n(s),o=i(24);i(1);n.a.config.productionTip=!1,new n.a({el:"#app",router:o.a,template:"<App/>",components:{App:a.a}})},44:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(4),s=i.n(n),a=i(8),o=i.n(a),r=i(3),c=(i.n(r),i(19)),l=i(2),u=i(1);t.default={store:c.a,computed:o()({},i.i(l.a)(["ifLogin","me","state"]),{visibilityLogin:function(){var e=this.$route;return{visibility:e?"/"===e.path?"visible":this.ifLogin?"hidden":"visible":"hidden"}},visibilityRegister:function(){var e=this.$route;return{visibility:e?"/"===e.path?"visible":this.ifLogin?"visible":"hidden":"hidden"}}}),methods:o()({},i.i(l.b)(["setLR","setMe","setPlayers","setState"]),{route:function(e){this.setLR("login"===e),this.$router.push("/login")},logout:function(){u.a.socket.send(s()({type:"logout"}))}})}},45:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(i(2),i(1));t.default={mounted:function(){var e=document.getElementById("canvas");n.a.init(e)}}},46:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(4),s=i.n(n),a=i(8),o=i.n(a),r=i(82),c=i.n(r),l=i(2),u=i(1),d=i(3),v=i.n(d);t.default={components:{cv:c.a},computed:o()({},i.i(l.a)(["players","me","state"])),methods:o()({},i.i(l.d)(["gameOver"]),i.i(l.b)(["setPlayers"]),{calcu:function(e){if(0===e.totalGames)return"0.00%";var t=e.winGames/e.totalGames;return t=(100*t).toFixed(2)+"%"},ready:function(){if(!this.me)return void alert("请先登录!");u.a.replay(),u.a.socket.send(s()({type:"ready",id:this.me.id}))},myMessage:function(){this.me?alert("胜场:"+this.me.winGames+"\n总场次:"+this.me.totalGames+"\n胜率:"+(this.me.winGames/this.me.totalGames*100).toFixed(2)+"%"):alert("请先登录")}}),created:function(){v.a.get("/api/getPlayers").then(function(e){var t=e.data;this.setPlayers(t)}.bind(this)),setInterval(function(){v.a.get("/api/getPlayers").then(function(e){var t=e.data;this.setPlayers(t)}.bind(this))}.bind(this),31e3)}}},47:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(4),s=i.n(n),a=i(8),o=i.n(a),r=i(92),c=(i.n(r),i(3)),l=(i.n(c),i(2)),u=i(1),d={data:null,forceLoginClose:!1};t.default={data:function(){return{name:"",password:"",tip:!1}},computed:o()({},i.i(l.a)(["ifLogin","state","me"])),methods:o()({},i.i(l.b)(["reverseLR","setMe","setState","win","defeat"]),i.i(l.d)(["gameOver"]),{submit:function(e){var t=this;e.preventDefault();var i=new WebSocket("ws://120.25.229.44:8081/ws");u.a.socket=i,i.onopen=function(){i.send(s()({type:t.ifLogin?"login":"register",name:t.name,pwd:t.password})),setInterval(function(){i.send(s()({type:"ping"}))},4e3)},i.onmessage=function(e){var n=JSON.parse(e.data);switch(d.data=n,n.type){case"login":"success"===n.message?t.jump():"hasLogin"===n.message?t.tip=!0:"wrong"===n.message&&(alert("用户名或密码错误"),d.forceLoginClose=!0,i.close());break;case"register":"success"===n.message?(alert("注册成功!"),t.jump()):(alert("用户已存在"),d.forceLoginClose=!0,i.close());break;case"ready":t.setState("ready"),alert("等待其他玩家");break;case"play":t.setState("play"),alert("开始游戏!");break;case"coo":u.a.drawChess(n.coo,!1);break;case"defeat":u.a.drawChess(n.coo,!1),t.gameOver(),t.defeat(),alert("你输了!");break;case"win":t.gameOver(),t.win(),alert("你赢了!");break;case"drop":t.gameOver(),t.win(),alert("对方掉线,你赢了!");break;case"forceLogin":d.forceLoginClose=!0,alert("您在其他页面登录!"),i.close()}},i.onclose=function(e){d.forceLoginClose?d.forceLoginClose=!1:alert("您已掉线!"),t.setMe(null),t.setState(null),u.a.replay()}},jump:function(){this.tip&&(u.a.socket.send(s()({type:"forceLogin",id:d.data.me.id})),this.tip=!1),this.setMe(d.data.me),this.$router.push("/")},notForceLogin:function(){d.forceLoginClose=!0,this.tip=!1,u.a.socket.close()}})}},77:function(e,t){},78:function(e,t){},79:function(e,t){},80:function(e,t){},82:function(e,t,i){i(78);var n=i(5)(i(45),i(86),"data-v-0fb85f46",null);e.exports=n.exports},83:function(e,t,i){i(80);var n=i(5)(i(46),i(88),"data-v-b1698746",null);e.exports=n.exports},84:function(e,t,i){i(77);var n=i(5)(i(47),i(85),"data-v-0d062118",null);e.exports=n.exports},85:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{attrs:{id:"container"}},[i("div",{attrs:{id:"main"}},[i("div",{attrs:{id:"title"}},[i("a",{class:!!e.ifLogin&&"choosen",on:{click:e.reverseLR}},[e._v("登录")]),e._v(" "),i("b",[e._v(".")]),e._v(" "),i("a",{class:!e.ifLogin&&"choosen",on:{click:e.reverseLR}},[e._v("注册")])]),e._v(" "),i("form",[i("div",{attrs:{id:"np"}},[i("div",[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true",id:"nameIcon"}},[i("use",{attrs:{"xlink:href":"#icon-user"}})]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{id:"name",placeholder:"用户名",type:"text"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),i("div",[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true",id:"nameIcon"}},[i("use",{attrs:{"xlink:href":"#icon-password"}})]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{id:"pwd",placeholder:"密码",type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})])]),e._v(" "),e.tip?i("div",{staticClass:"tip"},[i("p",[e._v("您已在其他页面登录,确定登录吗?")]),e._v(" "),i("a",{on:{click:e.jump}},[e._v("是")]),e._v(" "),i("a",{on:{click:e.notForceLogin}},[e._v("否")])]):e._e(),e._v(" "),e.tip?e._e():i("input",{attrs:{type:"submit",id:"submit"},domProps:{value:e.ifLogin?"登录":"注册"},on:{click:e.submit}})])])])])},staticRenderFns:[]}},86:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("canvas",{attrs:{id:"canvas",width:"602px",height:"602px"}})},staticRenderFns:[]}},87:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{staticStyle:{"background-color":"#444444",height:"65px",width:"100%"},attrs:{id:"header"}},[e.me?e.me?i("div",{staticClass:"login",attrs:{id:"welcome"}},[i("p",{staticClass:"font"},[e._v("welcome "+e._s(e.me.name))]),e._v(" "),i("a",{style:{visibility:"play"===e.state?"hidden":"visible"},on:{click:e.logout}},[e._v("退出登录")])]):e._e():i("div",{staticClass:"login",attrs:{id:"login"}},[i("a",{style:e.visibilityLogin,on:{click:function(t){e.route("login")}}},[e._v("登录")]),e._v(" "),i("a",{style:e.visibilityRegister,on:{click:function(t){e.route("register")}}},[e._v("注册")])])]),e._v(" "),i("router-view")],1)},staticRenderFns:[]}},88:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"hello"},[i("div",{attrs:{id:"main"}},[i("div",{attrs:{id:"left"}},[i("cv"),e._v(" "),i("div",{attrs:{id:"footer"}},[i("a",{style:{visibility:e.state?"hidden":"visible"},attrs:{id:"ready"},on:{click:e.ready}},[e._v("准备")]),e._v(" "),i("a",{attrs:{id:"myMessage"},on:{click:e.myMessage}},[e._v("我的信息")])])],1),e._v(" "),i("div",{attrs:{id:"rankingList"}},[e.players.length?i("table",{staticStyle:{"text-align":"center"}},[e._m(0),e._v(" "),e._l(e.players,function(t){return i("tr",{key:t.name,staticStyle:{height:"40px"}},[i("td",{attrs:{width:"100px"}},[e._v(e._s(t.name))]),e._v(" "),i("td",{attrs:{width:"100px"}},[e._v(e._s(e.calcu(t)))])])})],2):e._e()])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("tr",[i("th",{attrs:{colspan:"2"}},[e._v("英雄榜")])])}]}},92:function(e,t){!function(e){function t(){var e,t;e=document.createElement("div"),e.innerHTML=i,i=null,(t=e.getElementsByTagName("svg")[0])&&(t.setAttribute("aria-hidden","true"),t.style.position="absolute",t.style.width=0,t.style.height=0,t.style.overflow="hidden",o(t,document.body))}var i='<svg><symbol id="icon-user" viewBox="0 0 1024 1024"><path d="M791.296 679.663616l-56.064 0c-61.923328 0-112.128-50.148352-112.128-112.001024l0-35.984384c24.80128-29.452288 42.595328-64.28672 53.653504-101.095424 1.150976-6.206464 7.118848-9.269248 11.114496-13.534208 21.462016-21.438464 25.678848-57.613312 9.582592-83.373056-2.19136-3.908608-6.131712-7.302144-5.915648-12.140544 0-32.840704 0.166912-65.73568-0.050176-98.547712-0.87552-39.622656-12.214272-80.831488-40.025088-110.170112-22.450176-23.707648-53.269504-37.81632-85.083136-43.860992-40.185856-7.656448-82.235392-7.272448-122.037248 2.843648-34.49344 8.696832-66.905088 28.875776-86.94272 58.790912-17.738752 26.00448-25.515008 57.585664-26.8288 88.704-0.49152 33.414144-0.110592 66.910208-0.218112 100.40832 0.766976 6.700032-4.929536 11.2384-7.499776 16.789504-15.166464 27.480064-8.48896 64.914432 15.878144 84.901888 6.185984 4.268032 7.33696 12.032 9.580544 18.731008 10.621952 33.086464 28.251136 63.685632 50.535424 90.345472l0 37.18656c0 61.852672-50.205696 112.002048-112.128 112.002048l-56.066048 0c0 0-101.61664 28.00128-168.193024 168.00256l0 56.000512c0 30.952448 25.076736 56.000512 56.064 56.000512l784.897024 0c30.989312 0 56.064-25.048064 56.064-56.000512l0-56.000512C892.91264 707.662848 791.296 679.663616 791.296 679.663616z"  ></path></symbol><symbol id="icon-password" viewBox="0 0 1024 1024"><path d="M906.581333 757.312 634.965333 485.674667c9.706667-28.288 15.253333-58.517333 15.253333-90.112 0-153.173333-124.138667-277.333333-277.312-277.333333-153.173333 0-277.333333 124.16-277.333333 277.333333 0 153.194667 124.16 277.333333 277.333333 277.333333 67.136 0 128.682667-23.872 176.682667-63.552l16.618667 16.618667 0 110.016 4.458667 0 38.208 0 41.344 0 0 42.666667 0 42.666667 48.448 0 37.312 0 0 21.333333 0 42.666667 42.666667 0 85.333333 0 42.666667 0 0-42.666667 0-85.333333L906.581333 757.312zM372.906667 630.229333c-129.621333 0-234.666667-105.088-234.666667-234.666667 0-129.6 105.066667-234.666667 234.666667-234.666667s234.645333 105.066667 234.645333 234.666667S502.528 630.229333 372.906667 630.229333zM863.978667 842.645333l-85.333333 0 0-64-0.448 0-42.218667 0L698.666667 778.645333l0-42.666667 0-42.666667-48.448 0-41.344 0 0-85.333333-0.341333 0-28.501333-28.501333c14.037333-15.786667 26.496-33.002667 36.672-51.690667l247.274667 247.253333L863.978667 842.645333zM341.333333 277.333333c-47.125333 0-85.333333 38.208-85.333333 85.333333s38.208 85.333333 85.333333 85.333333 85.333333-38.208 85.333333-85.333333S388.458667 277.333333 341.333333 277.333333zM341.333333 405.333333c-23.552 0-42.666667-19.114667-42.666667-42.666667s19.114667-42.666667 42.666667-42.666667 42.666667 19.114667 42.666667 42.666667S364.885333 405.333333 341.333333 405.333333z"  ></path></symbol></svg>',n=function(){var e=document.getElementsByTagName("script");return e[e.length-1]}(),s=n.getAttribute("data-injectcss"),a=function(e,t){t.parentNode.insertBefore(e,t)},o=function(e,t){t.firstChild?a(e,t.firstChild):t.appendChild(e)};if(s&&!e.__iconfont__svg__cssinject__){e.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}!function(t){if(document.addEventListener)if(~["complete","loaded","interactive"].indexOf(document.readyState))setTimeout(t,0);else{var i=function(){document.removeEventListener("DOMContentLoaded",i,!1),t()};document.addEventListener("DOMContentLoaded",i,!1)}else document.attachEvent&&function(e,t){var i=e.document,n=!1,s=function(){n||(n=!0,t())},a=function(){try{i.documentElement.doScroll("left")}catch(e){return void setTimeout(a,50)}s()};a(),i.onreadystatechange=function(){"complete"==i.readyState&&(i.onreadystatechange=null,s())}}(e,t)}(t)}(window)}},[43]);
//# sourceMappingURL=app.d7ce9a747c62592a42df.js.map