<template>
	<div class="header">
		<div class="icon" ></div>
		<span class="title">{{title}}</span>
		<span class="title" style="float: right;margin-right: 10px;"></span>
	</div>
</template>

<script>
	export default {
		data(){
			return{
			title:"欢迎使用",
			author:"别催我"
			}
		}
	}
</script>

<style scoped>
	.header{
		position: relative;
		height: 44px;
		background: #31c27c;
	}
	.icon{
		display: inline-block;
		width: 40px;
		height: 100%;
		background-size: 100% 100%;
		background-image: url(icon.png);
	}
	.header span{
		vertical-align: top;
		font-size: larger;
		color: white;
		margin-left: -10px;
		line-height: 44px;
	}
</style>
