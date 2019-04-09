<template>
	<div class="null-search">
		<h6>无匹配</h6>
		<p v-html="'很抱歉，没有找到与“'+this.title+'”相关的结果。'"></p>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped>
	.null-search{
		position: relative;
		padding: 210px 0 0;
		text-align: center;
		color: grey;
	}
	.null-search:before{
		content: "";
		position: absolute;
		top: 80px;
		-webkit-background-size: cover;
		width: 106px;
		height: 105px;
		margin-left: -53px;
		background-image: url(search_null.png);
	}
	.null-search h6{
		font-size: 18px;
	}
	.null-search p{
		font-size: 9px;
	}
</style>
