<template>
	<transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer.js'
	import {ERR_OK} from 'api/config.js'
	import {createSong} from 'common/js/song.js'
	import MusicList from '../../music-list/music-list.vue'
	export default {
		computed:{
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created(){
			setTimeout(() => {  
				this._getDetail()
			}, 800)
		},
		methods: {
			_getDetail() {
				if (!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.data.list)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		data() {
			return {
				songs: []
			}
		},
		components: {
		  MusicList
		}
	}
</script>

<style scoped>
	.slide-enter-active, .slide-leave-active{
		transition: all 0.3s;
	}
	.slide-enter, .slide-leave-to{
		transform: translate3d(100%, 0, 0)
	}
</style>
