<template>
	<transition name="slide" v-if="this.topList">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getMusicList,getTopList} from 'api/rank.js'
	import {ERR_OK} from 'api/config.js'
	import {createSong} from 'common/js/song.js'
	import MusicList from '../../music-list/music-list.vue'
	export default {
		computed:{
			title() {
				return this.topList.topTitle
			},
			bgImage() {
				return this.topList.picUrl
			},
			...mapGetters([
				'topList'
			])
		},
		created(){
 				this._getMusicList()
		},
 		methods: {
			_getMusicList() {
				if (!this.topList.id) {
					this.$router.push('/rank')
				return
			}
			getMusicList(this.topList.id).then((res) => {
				if (res.code === ERR_OK) {
					this.songs = this._normalizeSongs(res.songlist)
				}
			})
			},
		_normalizeSongs(list) {
			let ret = []
			list.forEach((item) => {
				const musicData = item.data
			if (musicData.songid && musicData.albummid) {
					ret.push(createSong(musicData))
				}
			})
			return ret
		}
		},
		data() {
			return {
				songs: [],
				rank: true
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
