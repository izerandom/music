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
export const clickPlay = function ({commit,state},{index,url}){
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_URL,url)
	commit(types.SET_PLAYING_STATE,true)
}
export const randomPlay = function ({dispatch,commit},{list,set}){
	let randomList =shuffle(list)
	commit(types.SET_PLAYLIST,randomList)
	commit(types.SET_PLAY_MODE,playMode.random)
	commit(types.SET_FULL_SCREEN,set)
	commit(types.SET_SEQUENCE_LIST,list)
	commit(types.SET_CURRENT_INDEX,0)
	getSongVkey(randomList[0].mid).then((res) => {
		if (res.code === ERR_OK) {
			let url= `http://dl.stream.qqmusic.qq.com/C400${randomList[0].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
			if(res.data.items[0].vkey==''){
				console.log(res.data.items[0])
				dispatch('next')
			}else{
				commit(types.SET_URL,url)
				commit(types.SET_PLAYING_STATE,true)
			}	
		}
	})
	
}
export const insertSong =function({commit,state},{song,url}){
	let playlist =state.playList.slice()
	let sequenceList =state.sequenceList.slice()
	let currentIndex =state.currentIndex
	//记录当前歌曲
	let currentSong =playlist[currentIndex]
	//查找列表中是否已存在该歌曲
	let findindex=findIndex(playlist,song)
	//插入下一曲 索引++
	currentIndex++
	playlist.splice(currentIndex,0,song)
	//已存在歌曲
	if(findindex>-1){
		if(currentIndex>findindex){
			playlist.splice(findindex,1)
			currentIndex--
		}else{
			playlist.splice(findindex+1,1)
		}
	}
	let currentSIndex=findIndex(sequenceList,currentSong)+1
	let findsindex=findIndex(sequenceList,song)
	sequenceList.splice(currentSIndex,0,song)
	if(findsindex>-1){
		if(currentSIndex>findsindex){
			sequenceList.splice(findsindex,1)
		}else{
			sequenceList.splice(findsindex+1,1)
		}
	}
	commit(types.SET_SEQUENCE_LIST,sequenceList)
	commit(types.SET_PLAYLIST,playlist)
	commit(types.SET_CURRENT_INDEX,currentIndex)
	commit(types.SET_FULL_SCREEN,false)
	commit(types.SET_PLAYING_STATE,true)
	commit(types.SET_URL,url)
}
export const deleteSong = function ({commit, state,dispatch}, {song,reset}) {
	console.log(song,reset)
	let playlist = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	let pIndex = findIndex(playlist, song)
	playlist.splice(pIndex, 1)
	let sIndex = findIndex(sequenceList, song)
	sequenceList.splice(sIndex, 1)
	if (currentIndex > pIndex || currentIndex === playlist.length) {
		currentIndex--
	}
	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	if (!playlist.length) {
		commit(types.SET_PLAYING_STATE, false)
	} else {
		if(reset===true){
			getSongVkey(playlist[currentIndex].mid).then((res) => {
				if (res.code === ERR_OK) {
					let url= `http://dl.stream.qqmusic.qq.com/C400${playlist[currentIndex].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
					if(res.data.items[0].vkey==''){
						dispatch('next')
					}else{
						commit(types.SET_URL,url)
						commit(types.SET_PLAYING_STATE, true)
					}	
				}
			})
		}
	}
}
export const deleteList = function ({commit}) {
	commit(types.SET_CURRENT_INDEX, -1)
	commit(types.SET_PLAYLIST, [])
	commit(types.SET_SEQUENCE_LIST, [])
	commit(types.SET_PLAYING_STATE, false)
}
export const next = function ({state,commit,dispatch}) {
	console.log("next")
	let index=state.currentIndex+1
	let playlist = state.playList.slice()
	if(index==playlist.length){
		index=0
	}
	getSongVkey(playlist[index].mid).then((res) => {
		if (res.code === ERR_OK) {
			let url= `http://dl.stream.qqmusic.qq.com/C400${playlist[index].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
			if(res.data.items[0].vkey==''){
				commit(types.SET_CURRENT_INDEX,index)
				dispatch('next')
			}else{
				commit(types.SET_URL,url)
				commit(types.SET_CURRENT_INDEX,index)
				commit(types.SET_PLAYING_STATE,true)
			}	
		}
	})
}
