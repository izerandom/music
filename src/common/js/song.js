import {ERR_OK} from 'api/config.js'
import {Base64} from 'js-base64'
import {getLyric} from 'api/song.js'
import {getSongVkey} from 'api/song.js'
export default class Song {
	constructor({id, mid, singer, name, album, duration, image}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
	}
	getLyric() {
		if (this.lyric) {
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve, reject) => {
			getLyric(this.mid).then((res) => {
				if(res==="暂无歌词"){
					reject("暂无歌词")
				}else if (res.retcode === ERR_OK) {
					this.lyric = Base64.decode(res.lyric)
					resolve(this.lyric)
				}else{
					reject("暂无歌词")
				}
			})
		})
	}
}
	
export function createSong(musicData) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: musicData.singer[0].name,
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
	})	
	
}