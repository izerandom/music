import * as types from './mutation-types.js'
import {playMode} from 'common/js/config.js'
import {shuffle} from 'common/js/util.js'
import {getSongVkey} from 'api/song.js'
import {ERR_OK} from 'api/config.js'

function findIndex(list,song){
	return list.findIndex((item)=>{
		return item.id === song.id
	})
}
export const selectPlay = function ({commit,state},{list,index,url,set}){
	commit(types.SET_SEQUENCE_LIST,list)
	commit(types.SET_PLAYLIST,list)
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_URL,url)
	commit(types.SET_FULL_SCREEN,set)
	commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function ({commit},{list,set}){
	let randomList =shuffle(list)
	getSongVkey(randomList[0].mid).then((res) => {
		if (res.code === ERR_OK) {
			let url= `http://dl.stream.qqmusic.qq.com/C400${randomList[0].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
			commit(types.SET_URL,url)
		}
	})
	commit(types.SET_SEQUENCE_LIST,list)
	commit(types.SET_PLAYLIST,randomList)
	commit(types.SET_CURRENT_INDEX,0)
	commit(types.SET_PLAY_MODE,playMode.random)
	commit(types.SET_FULL_SCREEN,set)
	commit(types.SET_PLAYING_STATE,true)
}
