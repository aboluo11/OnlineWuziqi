<template>
	<canvas id="canvas" width="602px" height="602px"/>
</template>

<script type="text/javascript">
	import {mapState,mapMutations} from 'vuex'
	import draw from '../util/draw'

	export default {
		mounted(){
			const canvas = document.getElementById("canvas")
			draw.init(canvas)
		}
	}
</script>

<style type="text/css" scoped="">
	#canvas {
		margin-left: 50px;
		background-color: #FFE4B5;
	}
</style>