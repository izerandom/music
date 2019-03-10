<template>
	<div class="tab">
    <router-link tag="div" class="tab-item" to="/homepage">
		<div class="bottom">
			<span class="tab-link" >首页</span>
		</div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
		<div class="bottom">
			<span class="tab-link" >排行榜</span>
		</div>
    </router-link>
	 <router-link tag="div" class="tab-item" to="/singer">
		<div class="bottom">
			<span class="tab-link" >歌手</span>
		</div>
	</router-link>
    <router-link tag="div" class="tab-item" to="/search">
		<div class="bottom">
			<span class="tab-link"  >搜索</span>
		</div>
    </router-link>
  </div>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
		},
	}
</script>

<style scoped>
	.tab{
		display: flex;
		height: 38px;
		line-height: 38px;
		font-size: 15px;
		background-color: white;
	}
    .tab-item{
		flex: 1;
		text-align: center;
	}
    .tab-link{
        color: black;
	}
	.router-link-active .tab-link{
		color: #31C27C;	
		
		}
	.router-link-active .bottom{
		border-bottom:2px solid #31C27C;
	}
</style>
