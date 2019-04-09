<template>
    <div class="playlist" @click="hide" v-show="showlist">
		<div class="list-wrapper" @click.stop>
			<div class="list-header">
				<span v-html="'当前列表共有'+this.playList.length+'首歌'"></span>
					<svg width="40" height="40" @click.stop="deleteAll" class="delete">
						<g class="layer">
							<path d="m31.78098,10.61616l-5.70478,0l0,-1.36496c0,-1.6085 -1.27942,-2.91683 -2.85239,-2.91683l-6.33618,0c-1.57297,0 -2.85239,1.30833 -2.85239,2.91683l0,1.36496l-5.70478,0c-0.54832,0 -0.99696,0.45876 -0.99696,1.01947c0,0.56071 0.44863,1.01947 0.99696,1.01947l1.51759,0l0,17.85209c0,1.95965 1.55635,3.55683 3.47826,3.55683l13.4644,0c1.91637,0 3.47826,-1.59151 3.47826,-3.55683l0,-14.58978c0,-0.56071 -0.44863,-1.01947 -0.99696,-1.01947c-0.54832,0 -0.99696,0.45876 -0.99696,1.01947l0,14.58978c0,0.83823 -0.66464,1.51788 -1.48435,1.51788l-13.46994,0c-0.81972,0 -1.48435,-0.67965 -1.48435,-1.51788l0,-17.85209l19.93905,0c0.55386,0 1.00249,-0.45876 1.00249,-1.01947c0,-0.56071 -0.44863,-1.01947 -0.99696,-1.01947l-0.00002,0l0.00002,0l-0.00001,0zm-7.69316,0l-8.0587,0l0,-1.36496c0,-0.48141 0.38216,-0.87788 0.85849,-0.87788l6.34172,0c0.47078,0 0.85849,0.3908 0.85849,0.87788l0,1.36496l0,0l-0.00001,0l0.00001,0z" id="svg_3" fill="gray"/>
							<path d="m14.5,14.3c-0.715,0 -1.3,0.50856 -1.3,1.13014l0,14.23972c0,0.62158 0.585,1.13014 1.3,1.13014c0.715,0 1.3,-0.50856 1.3,-1.13014l0,-14.23972c0,-0.62158 -0.585,-1.13014 -1.3,-1.13014z" id="svg_1" fill="gray"/>
							<path id="svg_5" d="m20.05,14.15c-0.715,0 -1.3,0.50856 -1.3,1.13014l0,14.23972c0,0.62158 0.585,1.13014 1.3,1.13014c0.715,0 1.3,-0.50856 1.3,-1.13014l0,-14.23972c0,-0.62158 -0.585,-1.13014 -1.3,-1.13014z" fill="gray"/>
							<path id="svg_6" d="m25.15,14.35c-0.715,0 -1.3,0.50856 -1.3,1.13014l0,14.23972c0,0.62158 0.585,1.13014 1.3,1.13014c0.715,0 1.3,-0.50856 1.3,-1.13014l0,-14.23972c0,-0.62158 -0.585,-1.13014 -1.3,-1.13014z" fill="gray"/>
						</g>
					</svg>
			</div>
			<scroll ref="listContent" :data="sequenceList" class="list-content" >
				<ul>
					<li class="item" ref="list" v-for="(item,index) in sequenceList" :key="index" @click="selectitem(item,index)">
						<span class="song" :class="current(item)">{{item.name}}
						&nbsp;-&nbsp;{{item.singer}}</span>
						<span class="clear" @click.stop="deleteOne(item)">
							<svg width="40" height="40">
								<g class="layer">
									<path d="m31.78098,10.61616l-5.70478,0l0,-1.36496c0,-1.6085 -1.27942,-2.91683 -2.85239,-2.91683l-6.33618,0c-1.57297,0 -2.85239,1.30833 -2.85239,2.91683l0,1.36496l-5.70478,0c-0.54832,0 -0.99696,0.45876 -0.99696,1.01947c0,0.56071 0.44863,1.01947 0.99696,1.01947l1.51759,0l0,17.85209c0,1.95965 1.55635,3.55683 3.47826,3.55683l13.4644,0c1.91637,0 3.47826,-1.59151 3.47826,-3.55683l0,-14.58978c0,-0.56071 -0.44863,-1.01947 -0.99696,-1.01947c-0.54832,0 -0.99696,0.45876 -0.99696,1.01947l0,14.58978c0,0.83823 -0.66464,1.51788 -1.48435,1.51788l-13.46994,0c-0.81972,0 -1.48435,-0.67965 -1.48435,-1.51788l0,-17.85209l19.93905,0c0.55386,0 1.00249,-0.45876 1.00249,-1.01947c0,-0.56071 -0.44863,-1.01947 -0.99696,-1.01947l-0.00002,0l0.00002,0l-0.00001,0zm-7.69316,0l-8.0587,0l0,-1.36496c0,-0.48141 0.38216,-0.87788 0.85849,-0.87788l6.34172,0c0.47078,0 0.85849,0.3908 0.85849,0.87788l0,1.36496l0,0l-0.00001,0l0.00001,0z" id="svg_3" fill="gray"/>
									<path d="m14.5,14.3c-0.715,0 -1.3,0.50856 -1.3,1.13014l0,14.23972c0,0.62158 0.585,1.13014 1.3,1.13014c0.715,0 1.3,-0.50856 1.3,-1.13014l0,-14.23972c0,-0.62158 -0.585,-1.13014 -1.3,-1.13014z" id="svg_1" fill="gray"/>
									<path id="svg_5" d="m20.05,14.15c-0.715,0 -1.3,0.50856 -1.3,1.13014l0,14.23972c0,0.62158 0.585,1.13014 1.3,1.13014c0.715,0 1.3,-0.50856 1.3,-1.13014l0,-14.23972c0,-0.62158 -0.585,-1.13014 -1.3,-1.13014z" fill="gray"/>
									<path id="svg_6" d="m25.15,14.35c-0.715,0 -1.3,0.50856 -1.3,1.13014l0,14.23972c0,0.62158 0.585,1.13014 1.3,1.13014c0.715,0 1.3,-0.50856 1.3,-1.13014l0,-14.23972c0,-0.62158 -0.585,-1.13014 -1.3,-1.13014z" fill="gray"/>
								</g>
							</svg>
						</span>
					</li>	
				</ul>
			</scroll>
			<div @click="hide" class="list-close">
				<span class="close">关闭</span>
			</div>
		</div>
    </div>
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import Scroll from '../../CommonComponen/scroll/scroll.vue'
	import {playMode} from 'common/js/config'
	import {getSongVkey} from 'api/song.js'
	import {ERR_OK} from 'api/config.js'
	export default {
		data(){
			return {
				showlist:false
			}
		},
		computed:{
			...mapGetters([
				'sequenceList',
				'currentSong',
				'mode',
				'playList'
			])
		},
		methods:{
			show(){
				this.showlist=true
				setTimeout(()=>{
					this.$refs.listContent.refresh()
				},20)
			},
			hide(){
				console.log(this.showlist)
				this.showlist=false
			},
			current(item){
				if(this.currentSong.id === item.id){
					return `now-play`
				}
				return 
			},
			selectitem(item,index){
				if (this.mode === playMode.random) {
					index = this.playList.findIndex((song) => {
						return song.id === item.id
					})
				}
				getSongVkey(item.mid).then((res) => {
					if (res.code === ERR_OK) {
						const url=`http://dl.stream.qqmusic.qq.com/C400${item.mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
					if(res.data.items[0].vkey==''){
						alert(item.name+"——"+item.singer+"为付费歌曲，请前往QQ音乐支持正版");
						return 
					}else{
						this.clickPlay({
							index:index,
							url:url
						})
					}
				}
				})
			},
			scrollToCurrent(current) {
				const index = this.sequenceList.findIndex((song) => {
					return current.id === song.id
				})
				this.$refs.listContent.scrollToElement(this.$refs.list[index], 300)
			},
			deleteOne(item){
				const bool=item.mid===this.currentSong.mid?true:false
				this.deleteSong({
					song:item,
					reset:bool
				})
				if(!this.playList.length){
					this.hide()
				}
			},
			deleteAll(){
				this.hide()
				this.deleteList()
			},
			...mapActions([
				'clickPlay',
				'deleteSong',
				'deleteList'
			]),
			...mapMutations({
				setCurrentIndex:'SET_CURRENT_INDEX',
				SetPlayingState:'SET_PLAYING_STATE',
				setPlayMode:'SET_PLAY_MODE',
				setPlayList:'SET_PLAYLIST'
			})
		},
		watch: {
			currentSong(newSong, oldSong) {
				if (!this.showlist || newSong.id === oldSong.id) {
				return
				}
				setTimeout(() => {
					this.scrollToCurrent(newSong)
				}, 20)
			}
		},
		components:{
			Scroll
		}
	}
</script>

<style scoped>
	.playlist{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 200;
		background-color: rgba(0,0,0,0.3);
	}
	.list-wrapper{
		transform: translate3d(0, 100%, 0);
	}
	.list-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 50%;
		background-color: rgba(51,51,51,0.8);
	}
	.list-header{
		width: 100%;
		height: 10%;
		border-bottom: 1px solid ;
		border-color: rgba(153,153,153,0.3);
		color: white;
		text-align: center;
		font-size: 15px;
		line-height: 40px;
	}
	.list-content{
		overflow: hidden;
		height: 80%;
		width: 100%;
	}
	.list-content .item{
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 0 0 20px;
		overflow: hidden;
		border-bottom: 1px solid;
		border-color: rgba(153,153,153,0.3);
	}
	.list-close{
		height: 10%;
		bottom: 0;
		width: 100%;
		text-align: center;
		background-color: rgba(127,127,127,0.3);
	}
	.close{
		line-height: 30px;
		color: white;
		font-size: 15px;
	}
	.song{
		color: white;
		font-size: 15px;
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.now-play{
		color: #00FF00;
	}
	.clear{
		float: left;
		margin-right: 10px;
		height: 100%;
		color: white;
		font-size: 20px;
		line-height: 40px;
	}
	.delete{
		float: right;
		margin-right: 10px;
		height: 100%;
		color: white;
		font-size: 20px;
		line-height: 40px;
	}
</style>
