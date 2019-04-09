<template>
	<scroll class="result" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @beforeScroll="listScroll" @scrollToEnd="more" ref="result">
		<ul class="result-list" >
			<li class="result-item" v-for="(item,index) in result" :key="item" @click="selectItem(item)">
					<i
						:class="item.type==='singer'?'icon-image':'icon-music'" 
						:style="index==0&&item.type==='singer'?'background-image:url(https://y.gtimg.cn/music/photo_new/T001R68x68M000'+item.singermid+'.jpg?max_age=2592000)':''"
					 ></i>
					<h6 class="name" v-html="getname(item)"></h6>
					<p class="singer" v-html="getsinger(item)"></p>
			</li>	
			<loading v-show="hasMore"></loading>
		</ul>	
		<null-search :title="this.query" v-show="!hasMore && !result.length"></null-search>
	</scroll>
</template>

<script>
	import {search} from 'api/search.js'
	import {ERR_OK} from 'api/config.js'
	import Singer from 'common/js/singer.js'
	import {mapMutations,mapActions} from 'vuex'
	import Scroll from '../../../CommonComponen/scroll/scroll.vue'
	import Loading from '../../../CommonComponen/loading/loading.vue'
	import {createSong} from 'common/js/song.js'
	import {getSongVkey} from 'api/song.js'
	import NullSearch from '../../../CommonComponen/null-search/null-search.vue'
	import {debounce,throttle} from 'common/js/util.js'
	export default{
		
		props:{
			query:{
				type:String,
				default:""
			},
			showSinger:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				page:1,
				result:[],
				pullup:true,
				hasMore:true,
				beforeScroll:true
			}
		},
		components:{
			Scroll,
			Loading,
			NullSearch
		},
		methods:{
			...mapMutations({
			  setSinger: 'SET_SINGER',
			}),
			...mapActions([
				'insertSong'
			]),
			scrollrefresh(){
				this.$refs.result.refresh()
			},
			listScroll(){
				this.$emit('listScroll')
			},
			selectItem:throttle(function(item){
				if(item.type==='singer'){
					const singer =new Singer({
						id:item.singermid,
						name:item.singername
					})
					this.$router.push({
						path:`/search/${singer.id}`
					})
					this.setSinger(singer)
				}else{
					const song=createSong(item)
					getSongVkey(song.mid).then((res) => {
						if (res.code === ERR_OK) {
							const url=`http://dl.stream.qqmusic.qq.com/C400${song.mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
							if(res.data.items[0].vkey==''){
								alert(song.name+"——"+song.singer+"为付费歌曲，请前往QQ音乐支持正版");
							}else{
								this.insertSong({
									song:song,
									url:url	
								})
							}
						}
					})
				}
			},500),
			search(){
				this.page=1
				this.hasMore=true
				this.$refs.result.scrollTo(0,0)
				search(this.query,this.page,this.showSinger).then((res)=>{
					if(res.code===ERR_OK){
						console.log(res.data)
						this.result=this._Result(res.data)
						this.checkMore(res.data)
					}
				})
			},
			more(){
				if(!this.hasMore){
					return
				}
				this.page++
				search(this.query,this.page,this.showSinger).then((res)=>{
					if(res.code===ERR_OK){
						if(res.data.zhida.type===2){
							 delete res.data.zhida
						}
						this.result=this.result.concat(this._Result(res.data))
						this.checkMore(res.data)
					}
				})
			},
			checkMore(data){
				const song =data.song
				if(!song.list.length||(song.curnum+song.curpage*20>song.totalnum)){
					this.hasMore=false
				}
			},
			_Result(data){
				let ret=[]
				if(data.zhida && data.zhida.singerid){
					ret.push({...data.zhida,...{type:'singer'}})
				}
				if(data.song){
					ret=ret.concat(data.song.list)
				}
				return ret
			},
			getname(item){
				if(item.type==='singer'){
					return item.singername
				}else{
					 return item.songname
				}
			},
			getsinger(item){
				if(item.type==='singer'){
					return `单曲: ${item.songnum} 专辑: ${item.albumnum}`
				}else{
					 return item.singer[0].name
				}
			}
		},
		watch:{
			query(newQuery) {
				if(newQuery!=''){
					this.result=[]
					this.search(newQuery)
				}
			}
		}
	}
</script>

<style scoped>
	.result{
		position: fixed;
		width: 100%;
		top: 153px;
		bottom: 0;
		overflow: hidden;
	}
	.result-item{
		position: relative;
		height: 55px;
		padding-left: 56px;
		overflow: hidden;
		border-bottom:1.5px solid rgba(204,204,204,0.6) ;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.icon-image{
		position: absolute;
		top: 8px;
		left: 8px;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		background-size: 100% 100%;
	}
	.icon-music{
		display: inline-block;
		position: absolute;
		top: 18px;
		left: 18px;
		width: 22px;
		height: 20px;
		background-repeat: no-repeat;
		background-size: 22px 30px;
		background-image: url(../search_sprite.png);
	}
	.name{
		display: inline-block;
		margin: 10px 0 2px;
		line-height: 18px;
		font-size: 16px;
		font-weight: 400;
		color: #000;
	}
	.singer{
		color: grey;
		font-size: 5.5px;
	}
</style>
