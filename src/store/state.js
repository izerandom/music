import {playMode} from 'common/js/config.js'

const state={
	singer:{},
	disc:{},
	topList:{},
	playing:false,
	fullScreen:false,
	playList:[],
	url:[],
	nextready:true, //判断是否允许播放或切换歌曲 歌曲歌词全部加载完时为true
	sequenceList:[],
	mode:playMode.sequence,
	currentIndex:-1
	
}
export default state