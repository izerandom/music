<template>
	<div class="homepage" ref="homepage">
		<scroll ref="scroll" class="homepage-content" v-bind:data="discList" >
			<div> 
				<div v-if="img.length" class="slider-wrapper" ref="sliderWrapper">
					<slider>
						<div  v-for="item in img"  :key="item.id">
							<a v-bind:href="item.linkUrl">
								<img @load="loadImage" :src="item.picUrl" />
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h5 class="list-title">热门歌单</h5>
					<ul>
						<li @click="selectItem(item)" v-for="item in discList" :key="item.id"  class="item">
							<img    v-lazy="item.imgurl" />
								<p  v-html="item.dissname"></p>
								<p  v-html="item.creator.name"></p>
						</li>
					</ul>
					<div class="loading-container" v-show="!discList.length">
						<loading></loading>
					</div>
				</div>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template> 

<script>
	import Slider from '../../CommonComponen/slider/slider.vue'
	import {getHomepage, getDiscList} from '../../api/homepage.js'
	import {ERR_OK} from 'api/config'
	import Scroll from '../../CommonComponen/scroll/scroll.vue'
	import Loading from '../../CommonComponen/loading/loading.vue'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from 'common/js/mixin.js'
	export default {
		mixins:[
			playlistMixin
		],
		data() {
			return {
				img:[],
				discList:[]
			};
		},
		created(){
			setTimeout(() => {  
				this._getHomepage()
				this._getDiscList()
			}, 800)
		},
		methods:{
			handlePlaylist(playList){
				const bottom =playList.length >0 ? '55px' : ''
				this.$refs.homepage.style.bottom=bottom
				console.log("bottom refresh")
				this.$refs.scroll.refresh()
			},
			_getHomepage(){
				getHomepage().then((res) => {
					if (res.code === ERR_OK) {
						this.img=res.data.slider
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					if (res.code === ERR_OK) {
					this.discList = res.data.list
					}
				})
			},
			loadImage(){
				if(!this.checkLoaded){
					this.$refs.scroll.refresh()
					this.checkLoaded=true
				}	
			},
			selectItem(item){
				this.$router.push({
					path:'/homepage/${item.dissid}'
				})
				this.setDisc(item)
			},
			...mapMutations({
				setDisc: 'SET_DISC'
			})
		},
		components:{
			Slider,
			Scroll,
			Loading
		}
	}

</script>
	
<style scoped>
	.homepage{
		position: fixed;
		width: 100%;
		bottom: 0;
		top: 84px;
	}
	.homepage-content{
		height: 100%;
		overflow: hidden;
	}
	.slider-wrapper{
		position: relative;
		width: 100%;
	}
	.list-title{
		font-size: 15px;
		margin: 10px 0 10px 10px;
	}
	.recommend-list{
		margin-left: 5px;
	}
	li{
		list-style: none;
		display: inline-block;
	}
	.item{
		width: 48.5%;
		background-color: white;
		margin: 5px 5px 5px 0px;
	}
	img{
		width: 100%;
		height: 75%;
	} 
	 p{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
		width: 100%;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		margin-top: 50%;
		transform: translateY(-50%);
	}
</style>
