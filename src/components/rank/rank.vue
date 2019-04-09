<template>
	<div class="rank" ref="rank">
		<scroll :data="topList" class="toplist" ref="toplist">
		  <ul>
			<li  class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
				<div class="icon">
					<img width="100" height="100" v-lazy="item.picUrl"/>
				</div>
					
				<ul class="songlist" >
					<li  >
					<span class="title" v-for="title in item.topTitle" :key="title.id" >{{title}}</span>		
					<div class="topsong" v-for="(song,index) in item.songList" :key="index" >
						<span>{{index + 1}}</span>
						<span class="sname">{{song.songname}}&nbsp;- {{song.singername}}</span>
					</div>
					</li>
				</ul>
			</li>
		  </ul>
		  <div class="loading-container" v-show="!topList.length">
			<loading></loading>
		  </div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getTopList} from '../../api/rank.js'
	import {ERR_OK} from 'api/config'
	import Scroll from '../../CommonComponen/scroll/scroll.vue'
	import Loading from '../../CommonComponen/loading/loading.vue'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from 'common/js/mixin.js'
	export default {
		mixins:[
			playlistMixin
		],
		created(){
			setTimeout(() => {  
				this._getTopList()
			}, 800)
			
		},
		methods:{
			handlePlaylist(playList){
				const bottom =playList.length >0 ? '55px' : ''
				this.$refs.rank.style.bottom=bottom
				console.log("bottom refresh")
				this.$refs.toplist.refresh()
			},
			_getTopList() {
				getTopList().then((res) => {
					if (res.code === ERR_OK) {
						this.topList = res.data.topList
					}
				})
			},
			selectItem(item) {
				this.$router.push({
				  path: `/rank/${item.id}`
				})
				this.setTopList(item)
			},
			...mapMutations({
			  setTopList: 'SET_TOP_LIST'
			})
		},
		data(){
			return{
				topList:[]
			}
		},
		components:{
			Scroll,
			Loading
		},
	}
</script>

<style scoped>
    .rank{
		position: fixed;
		width: 100%;
		top: 88px;
		bottom: 0;
	}
    .toplist{
		height: 100%;
		overflow: hidden;
	}
    .item{
        display: flex;
        margin: 0 10px;
        padding-top: 10px;
        height: 100px;
	}
    .icon{
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
	}
    .topsong{
        line-height: 20px;
		list-style: none;
		display: flex;
		margin-left: 10px;
		margin-top: 5px;
	}
	.songlist{
        flex: 1;
        display: flex;
		flex-direction: column;
        padding: 0 0 0 10px;
        height: 100px;
        overflow: hidden;
        background: white;
		font-size: 12px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #757576;
	}
	.title{
		font-size: 15px;
		color: #000000;
	}
	.sname{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 5px;
		color: rgba(0,0,0,0.6);
	}
    .loading-container{
        position: absolute;
        width: 100%;
        margin-top: 50%;
        transform: translateY(-50%);
	}
</style>
