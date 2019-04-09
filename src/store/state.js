import {playMode} from 'common/js/config.js'

const state={
	singer:{},
	disc:{},	
	topList:{}, 
	playing:false, 
	fullScreen:false,
	playList:[],
	url:[],
	sequenceList:[],
	mode:playMode.sequence,
	currentIndex:-1
	
}
export default state