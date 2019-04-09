<template>
  <div id="app">
		<Mainheader></Mainheader>
		<tab></tab>
		<keep-alive>
		<router-view></router-view>
		</keep-alive>
		<player></player>
  </div>
</template>

<script>
	import Mainheader from 'components/header/header.vue'
	import Tab from 'components/tab/tab.vue'
	import player from 'components/player/player.vue'
export default {
	components:{
		Mainheader,
		Tab,
		player
	}
}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	#app{
		height: 100%;
		width: 100%;
		position: relative;
	}
	body{
		background-color: #eeeeee;
	}
</style>
