<template>
	<div class="progress-circle">
		<svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1">
			<circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
			<circle  class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"  />
		</svg>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			radius: {
			type: Number,
			default: 100
			},
			percent: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				dashArray: Math.PI * 100
			}
		},
		computed: {
			dashOffset() {
				return (1 - this.percent) * this.dashArray 
			}
		}
	}
</script>

<style scoped>
	.progress-circle{
		position: relative;
		width: 25px;
		height: 25px;
	}
	circle{
		stroke-width: 15px;
		transform-origin: center;
	}
	.progress-background{
        transform: scale(0.9);
        stroke: white;
	}
	.progress-bar{
        transform: scale(0.9) rotate(-90deg);
        stroke: #00bf00;
	}
</style>