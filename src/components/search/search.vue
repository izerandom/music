<template>
	<div class="search" ref="search">
		<search-box ref="SearchBox" @query="querychange" :placeholder="placeholder">
		</search-box>
		<search-result :query="query" @listScroll="blur"  v-show="query" ref="result"></search-result>
		<div class="hot" v-show="!query">
			<div class="title">热门搜索</div> 
			<ul>
				<li @click="addQuery(item.k)" class="hotItem" v-for="item in hotkey" :key="item">
					<span>{{item.k}}</span>
				</li>
			</ul>
		</div>  
		<router-view></router-view>
    </div>
</template>

<script>
	import SearchBox from '../../CommonComponen/search-box/search-box.vue'
	import {getHotKey} from 'api/search.js'
	import {ERR_OK} from 'api/config.js'
	import SearchResult from './search-result/search-result.vue'
	import {playlistMixin} from 'common/js/mixin.js'
	export default {
		mixins:[
			playlistMixin
		],
		data() {
			return {
				hotkey:[],
				query:'',
				placeholder:'搜索歌曲、歌单、歌手',
				searchhistory:["111"]
			};
		},
		created(){
			this._getHotKey()
		},
		methods:{
			handlePlaylist(playList){
				const bottom =playList.length >0 ? '55px' : ''
				this.$refs.result.$el.style.bottom=bottom
				this.$refs.result.scrollrefresh()
			},
			blur(){
				this.$refs.SearchBox.blur()
			},
			_getHotKey(){
				getHotKey().then((res)=>{
					if(res.code===ERR_OK){
						this.hotkey=res.data.hotkey.slice(0,10)
					}
				})
			},
			addQuery(query){
				this.$refs.SearchBox.setQuery(query)
			},
			querychange(query){
				this.query=query
			}
		},
		components:{
			SearchBox,
			SearchResult
		}
	}
</script>
<style scoped>
	.search{
		position: fixed;
		background-color: white;
		width: 100%;
		height: 100%;
	}
	
	.hot{
		width: 100%;
		height:100%;
		padding: 10px 0 0 10px;
		background-color: white;
	}	
    .title{
        font-size: 10px;
		padding-bottom: 10px;
	}
	.hotItem{
		display: inline-block;
		font-size: 14px;
		padding: 0 10px;
		height: 30px;
		line-height: 30px;
		color: #000;
		border: 1px solid rgba(0,0,0,.6);
		border-radius: 99px;
		word-break: keep-all;
		margin-bottom: 10px;
		margin-right: 14px;
	}
	
</style>
