<template>
  <div class="music-list">
	  <div class="top">
		  <h3 class="title" v-html="title"></h3>	
		<div class="back" @click="back()">
			<svg width="30" height="30" >
				<g class="layer">
					<path stroke="#00ff00" transform="rotate(180 14.816317558288572,14.749400138854982) " id="svg_2" d="m15.73798,14.7494l-9.12683,-9.45l16.41033,9.45l-16.41033,9.45l9.12683,-9.45z" fill="#cccccccc"/>
				</g>
			</svg>
		</div>	
		<div class="play-wrapper" @click="random" ref="play" :style="top">
			<span>随机播放全部</span>
		</div> 
	</div>	
	<div class="bg-image" :style="bgStyle" ref="bgImage">
		<div class="filter" ref="filter"></div>
	</div>
	<div class="bg-layer" ref="layer"></div>
    <scroll :data="songs"  @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType"  class="list" ref="list">
    	<div>
		<div class="song-list-wrapper">
			<song-list @select="selectItem" :songs="songs" :rank="rank" ></song-list>
		</div>
		</div>
    </scroll>
	<div v-show="!songs.length" class="loading-container">
		<loading></loading>
	</div>
  </div>
</template>

<script>
	import {getSongVkey} from 'api/song.js'
	import {ERR_OK} from 'api/config.js'
	import Scroll from '../../CommonComponen/scroll/scroll.vue'
	import Loading from '../../CommonComponen/loading/loading.vue'
	import SongList from '../../CommonComponen/song-list/song-list.vue'
	import {mapGetters,mapActions,mapMutations} from 'vuex'
	
	const RESERVED_HEIGHT =40
	export default {
		data() {
			return {
				scrollY: 0,
				height:0,
			}
		},
		props: {
			bgImage: {
				type: String,
				default: ''
			},
			songs: {
				type: Array,
				default: ()=>[]
			},
			title: {
				type: String,
				default: ''
			},
			rank: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			bgStyle() {
				return `background-image:url(${this.bgImage})`
				
			},
			img(){
				return this.bgImage
			},
			top(){
				return `top :${this.height}px`
			},
			...mapGetters([
				'nextready'
			])
		},
		created() {
			this.probeType = 3
			this.listenScroll = true
		},
		mounted() {
			this.imageHeight = this.$refs.bgImage.clientHeight
			this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
			this.height=this.imageHeight-35
			this.$refs.list.$el.style.top = `${this.imageHeight}px`
			
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			scroll(pos) {
				this.scrollY = pos.y
			},
			random(){
				if(this.nextready){
					this.setnextready(false)
					this.randomPlay({
						list:this.songs,
						set:false
					})
				}else{
					console.log("频繁操作")
					return 
				}
				
			},
			selectItem(item,index){
				if(this.nextready){
					this.setnextready(false)
					getSongVkey(this.songs[index].mid).then((res) => {
						if (res.code === ERR_OK) {
							const url=`http://dl.stream.qqmusic.qq.com/C400${this.songs[index].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
						if(res.data.items[0].vkey==''){
							alert(this.songs[index].name+"——"+this.songs[index].singer+"为付费歌曲，请前往QQ音乐支持正版");
						}else{
							this.selectPlay({
								list:this.songs,
								index:index,
								url:url,
								set:false
							})
							console.log("musiclist接收到url并播放")
						}
					}
					})
				}else{
					console.log("频繁操作")
					return 
				}
			},
			...mapActions([
				'selectPlay',
				'randomPlay',
			]),
			...mapMutations({
				setnextready:'SET_NEXTREADY'
			}),
		},
		components: {
			Scroll,
			Loading,
			SongList
		},
		watch: {
			scrollY(newY){
				let translateY = Math.max(this.minTransalteY,newY)
				let zIndex=0
				let scale=1
				let blur=0
				this.$refs.layer.style[`transform`]=`translate3d(0,${translateY}px,0)`
				this.$refs.play.style[`transform`]=`translate3d(0,${translateY}px,0)`
				const percent = Math.abs(newY / this.imageHeight)
				if (newY > 0) {
					scale = 1 + percent
					zIndex = 10
				} else {
					blur = Math.min(20, percent * 20)
				}
				this.$refs.filter.style[`backdrop-filter`] = `blur(${blur}px)`
				if(newY<this.minTransalteY){
					zIndex=10
					this.$refs.bgImage.style.paddingTop = 0
					this.$refs.bgImage.style[`background-size`]='cover'
					this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
				}else{
					this.$refs.bgImage.style.paddingTop = '70%'
					this.$refs.bgImage.style.height = 0
				}
					this.$refs.bgImage.style.zIndex=zIndex
					this.$refs.bgImage.style[`transform`] = `scale(${scale})`
			},
			deep: true
		}
	}
</script>

<style scoped>
	.music-list{
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: white;
	}
	.bg-image{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 70%;
		transform-origin: top;
		background-size: 100% 100%;
	}
	.back{
		position:absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}
	.title{
		font-size: 18px;
		position: absolute;
		top: 0;
		left: 10%;
		z-index: 50;
		width: 80%;
		text-align: center;
		line-height: 30px;
		color: white;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.play-wrapper{
		height: 30px;
		position:absolute;
		min-width: 30%;
		left: 35%;
		border-radius: 20px;
		background: #31c27c; 
		text-align: center;
		line-height: 30px;
		font-size: 15px;
		color: #ffffff;
		z-index: 50;
	}
	.list{
		position: fixed;
		width: 100%;
		bottom: 0;
		top: 35%;
		
	}
	.song-list-wrapper{
		width: 100%;
		overflow: hidden;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top:50%;
		transform: translateY(-50%);
	}
	.bg-layer{
      position: relative;
      height: 100%;
      background: white;
	}
	.filter{
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
	}
</style>