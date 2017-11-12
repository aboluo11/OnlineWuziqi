import store from '../store/store'
export default {
	preI:null,
	preJ:null,
	ctx:null,
	canvas:null,
	chesses:[],
	socket:null,
	wait:false,
	drawChess(coo,ifBlack) {
		const i = coo[0]
		const j = coo[1]
		if(this.chesses[i][j]!=0) return
		const ctx = this.ctx
		const preI = this.preI
		const preJ = this.preJ
		if(preI){
			ctx.clearRect(preI * 40 -19, preJ * 40 -19,40,40);
			ctx.beginPath();
			ctx.moveTo(preI*40-19,preJ*40+1);
			ctx.lineTo(preI*40+21,preJ*40+1);
			ctx.moveTo(preI*40+1,preJ*40-19);
			ctx.lineTo(preI*40+1,preJ*40+21);
			ctx.strokeStyle = "black";
			ctx.stroke();
			drawArc(preI,preJ,!ifBlack);
		}
		function drawArc(i,j,ifBlack) {
			ctx.beginPath();
			ctx.arc(i * 40 + 1, j * 40 + 1, 12, 0, 360);
			if(ifBlack){
				ctx.fillStyle = "black";
			}else {
				ctx.fillStyle = "white";
			}
			ctx.fill();
		}
		drawArc(i,j,ifBlack);
		ctx.moveTo(i * 40 - 14, j * 40 - 14);
		ctx.lineTo(i * 40 + 16, j * 40 - 14);
		ctx.lineTo(i * 40 + 16, j * 40 + 16);
		ctx.lineTo(i * 40 - 14, j * 40 + 16);
		ctx.lineTo(i * 40 - 14, j * 40 - 14);
		ctx.strokeStyle = "green";
		ctx.stroke();
		this.preI = i;
		this.preJ = j;
		this.chesses[i][j] = ifBlack?1:2
		this.wait = ifBlack===true?true:false
	},
	drawLine() {
		const ctx = this.ctx
		ctx.strokeStyle = 'black'
		for (let i = 0; i < 16; i++) {
			ctx.beginPath();
			ctx.moveTo(0, 40 * i + 1);
			ctx.lineTo(602, 40 * i + 1);
			ctx.moveTo(40 * i + 1, 0);
			ctx.lineTo(40 * i + 1, 602);
			ctx.stroke();
		}
	},
	onclick(){
		this.canvas.onclick = (e)=>{
			if(store.state.state!=='play'||this.wait) return
				const x = e.offsetX;
			const y = e.offsetY;
			const i = Math.round((x - 1) / 40);
			const j = Math.round((y - 1) / 40);
			this.drawChess([i, j], true);
			if(this.ifwin(i,j)){
				this.socket.send(JSON.stringify({
					type:'win',
					coo:[i,j]
				}))
				return
			}
			this.socket.send(JSON.stringify({
				type:'coo',
				coo:[i,j]
			}))
		}
	},
	init(canvas){
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.preI = null
		this.preJ = null
		this.drawLine()
		for(let i=0;i<16;i++){
			this.chesses[i] = []
			for(let j=0;j<16;j++){
				this.chesses[i][j] = 0
			}
		}
		this.onclick()
	},
	replay(){
		this.preI = null
		this.preJ = null
		this.chesses = this.chesses.map((x)=>x.map((y)=>0))
		this.ctx.clearRect(0,0,602,602)
		this.drawLine()
		this.onclick()
	},
	ifwin(x,y) {
		let chesses = this.chesses
		loop1:
		for(let i=y-4;i<=y;i++){
			for(let j=i;j<i+5;j++){
				if(j<0||j>=16||chesses[x][j]!=1){
					continue loop1
				}
			}
			return true
		}
		loop2:
		for(let i=x-4;i<=x;i++){
			for(let j=i;j<i+5;j++){
				if(j<0||j>=16||chesses[j][y]!=1){
					continue loop2
				}
			}
			return true
		}
		loop3:
		for(let i=x-4,k=y-4;i<=x;i++,k++){
			for(let j=i,m=k;j<i+5;j++,m++){
				if(j<0||j>=16||k<0||k>=16||chesses[j][m]!=1){
					continue loop3
				}
			}
			return true
		}
		loop4:
		for(let i=x-4,k=y+4;i<=x;i++,k--){
			for(let j=i,m=k;j<i+5;j++,m--){
				if(j<0||j>=16||k<0||k>=16||chesses[j][m]!=1){
					continue loop4
				}
			}
			return true
		}
	}
}