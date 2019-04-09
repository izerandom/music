<template>
	<div v-show="playList.length>0" class="player">
	<transition name="narmal">
		<div class="normal-player" v-show="fullScreen">
			<div class="background" :style="bgstyle">
			</div>
			<div class="top">
				<div class="change" @click="back()">
					<svg width="20" height="20" >
						<g class="layer">
							<path stroke="#00ff00" transform="rotate(90 10.266813278198242,11.98347568511963) " id="svg_1" d="m10.84703,11.98348l-5.74563,-9.9l10.33082,9.9l-10.33082,9.9l5.74563,-9.9z" fill="#999999"/>
						</g>
					</svg>
				</div>
				
				<div class="title" v-html="this.set===true?currentSong.name:''"  ref="name"></div>
				<div class="subtitle" v-html="this.set===true?currentSong.singer:''" ref="singer"></div>
			</div>
			<div class="middle"
				@touchstart.prevent="middleTouchStart"
				@touchmove.prevent="middleTouchMove"
				@touchend="middleTouchEnd"
			>
				<div class="middle-l" ref="middleL">
					<div class="cd-wrapper" ref="cd">
						<div class="cd" :style="bgstyle" :class="{'pause':!this.playing }" ></div>
					</div>
					<div class="cd-lyric-wrapper">
						<div class="cd-lyric" ref="cdlyric">{{cdlyric}}</div>	
					</div>
				</div>
				
				<scroll class="middle-r" ref="lyricList"   :data="currentLyric && currentLyric.lines">
					<div class="lyric-wrapper" ref="lyric">
					  <div v-if="currentLyric">
						<p ref="lyricLine"
						   class="lyric-text"
						   :class="{'current':currentLineNum===index}"
						   v-for="(line,index) in currentLyric.lines" :key="index">{{line.txt}}</p>
					  </div>
					</div>
				</scroll>
			</div>
			<div class="middle-bottom">
				<div class="dot-wrapper">
					<span class="dot" :class="{'active':currentShow==='cd'}"></span>
					<span class="dot" :class="{'active':currentShow==='lyric'}"></span>
				</div>
				<div class="progress-wrapper">
					<span class="time-left">{{format(currentTime)}}</span>
					<div class="progress-bar"><progressbar :percent="percent" @percentChange="onProgressBarChange"></progressbar></div>
					<span class="time-right">{{format(currentSong.duration)}}</span>
				</div>
			</div>	
			<div class="bottom" ref="bottom">
				<div class="flex" >
					<svg width="50" height="50" v-if="iconMode=='random'" :class="disable" @click="changeMode">
						<g class="layer">
							<path stroke="white"  d="m18.766167,21.480358c0.353215,0.541879 0.704388,1.246653 1.06475,2.041187c0.052063,-0.121341 0.101064,-0.239357 0.153128,-0.364023c0.521656,-1.246653 1.11273,-2.657865 1.775263,-4.024197c0.105148,-0.221073 0.2154,-0.40724 0.322589,-0.616678c-0.497155,-0.950781 -1.045353,-1.861669 -1.706866,-2.646229c-1.022895,-1.226707 -2.359191,-2.08108 -3.844532,-2.062796l-6.437498,0l0,5.990585l6.438519,0c0.895288,0.028257 1.462882,0.500324 2.234647,1.682151zm13.948933,4.901841l0,3.749933c-0.941226,-0.003324 -2.501089,-0.003324 -2.943119,-0.003324c-1.306692,-0.049866 -2.164208,-0.728046 -3.056433,-1.908211c-0.385882,-0.516946 -0.755431,-1.163543 -1.119876,-1.883278c-0.273589,0.624989 -0.549219,1.269924 -0.829953,1.941455c-0.340965,0.811156 -0.692138,1.645582 -1.058624,2.466711c-0.090856,0.201127 -0.192941,0.408902 -0.288901,0.613353c1.485341,2.539848 3.545422,4.730634 6.331329,4.757229l2.965578,0l0,3.749933l3.588298,-3.367626l3.594423,-3.374275l-3.594423,-3.37095l-3.588298,-3.37095zm-5.999552,-4.674119c0.892225,-1.18349 1.749742,-1.858344 3.056433,-1.908211c0.442029,0 2.001892,0 2.943119,-0.003324l0,3.749933l3.588298,-3.367626l3.594423,-3.37095l-3.594423,-3.372613l-3.588298,-3.369288l0,3.746609l-2.965578,0c-3.361668,0.033244 -5.679004,3.208054 -7.187825,6.352945c-1.537404,3.178135 -2.652176,6.530801 -3.795531,8.281102c-0.772786,1.178503 -1.339359,1.655556 -2.234647,1.682151l-6.438519,0l0,5.990585l6.438519,0c1.485341,0.018284 2.821637,-0.834427 3.844532,-2.064458c1.033103,-1.22172 1.808951,-2.744299 2.505173,-4.276852c1.368964,-3.088376 2.505173,-6.291444 3.834323,-8.070002z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="none"/>
						</g>
					</svg>
					<svg width="50" height="50" v-if="iconMode=='sequence'" :class="disable" @click="changeMode">
						<g class="layer">		
							<title transform="translate(16.536890029907227,15.512113571166992) scale(1.3921568393707275,1.3817955255508423) translate(-16.536890029907227,-15.512113571166992) " stroke="#ffffff">Layer 1</title>
							<path stroke="#ffffff" fill-opacity="0" id="svg_2" d="m28.74136,14.89913c-4.36176,2.39135 -5.68637,2.85821 -5.86626,2.06754c-0.3514,-1.54452 -2.36113,-1.23414 -6.00682,0.92767c-4.57209,2.71114 -7.37977,8.02143 -6.8784,13.00943c0.1946,1.93605 0.59622,4.12485 0.89249,4.86399c0.29627,0.73914 -0.25565,0.28557 -1.22649,-1.00792c-4.85668,-6.47079 -4.51837,-14.4625 0.88212,-20.83815c2.15328,-2.54209 8.44458,-6.03961 10.86399,-6.03961c0.6854,0 1.34953,-0.57662 1.47583,-1.28138c0.20655,-1.15255 0.75041,-0.99777 5.40943,1.53952c2.84889,1.55149 5.38414,3.01197 5.6339,3.2455c0.24976,0.23354 -2.08114,1.81457 -5.17979,3.51342l0,0zm-8.40894,20.55574c4.36176,-2.39135 5.68637,-2.85821 5.86626,-2.06754c0.3514,1.54452 2.36113,1.23414 6.00682,-0.92766c4.57209,-2.71114 7.37977,-8.02144 6.87841,-13.00943c-0.1946,-1.93605 -0.59622,-4.12484 -0.89249,-4.86398c-0.29627,-0.73914 0.25565,-0.28558 1.22649,1.00792c4.85668,6.47079 4.51837,14.4625 -0.88212,20.83815c-2.15328,2.54209 -8.44458,6.03961 -10.86398,6.03961c-0.68541,0 -1.34953,0.57663 -1.47583,1.28138c-0.20656,1.15255 -0.75041,0.99777 -5.40943,-1.53951c-2.84888,-1.55149 -5.38414,-3.01197 -5.6339,-3.2455c-0.24976,-0.23354 2.08114,-1.81457 5.17979,-3.51342l0,0z" fill="#000000"/>
						</g>
					</svg>
					<svg width="50" height="50" v-if="iconMode=='loop'" :class="disable" @click="changeMode">
						<g class="layer">
							<path stroke="#ffffff" fill-opacity="0" id="svg_2" d="m8.27851,18.27822c0.00096,-0.34974 0.32818,-2.49409 0.72741,-4.76525c1.24488,-7.08188 1.26319,-7.11313 2.84376,-4.85598l0.93513,1.33543l2.73477,-1.32081c3.61725,-1.747 7.93347,-2.39328 11.90108,-1.78195c1.68421,0.25951 3.47128,0.68131 3.97127,0.93732c0.99268,0.50827 0.92904,0.94477 -0.6531,4.48005c-0.86714,1.93763 -0.95037,1.99285 -2.44825,1.62446c-2.54944,-0.62698 -6.70067,-0.4295 -8.7049,0.41412l-1.87916,0.791l1.31903,1.31722c0.72547,0.72449 1.13644,1.42521 0.91328,1.55716c-0.22317,0.13196 -2.93839,0.38915 -6.03381,0.57151c-4.64418,0.27363 -5.62778,0.22045 -5.62651,-0.30429l0,0zm23.91389,19.52618l-2.01182,-2.54937l1.83177,-1.69469c1.88531,-1.7442 3.24503,-4.19304 3.84406,-6.92318l0.34185,-1.55797l-1.97168,0.30163c-1.08442,0.16592 -1.97835,0.14436 -1.9865,-0.04789c-0.03808,-0.89756 5.11779,-9.74545 5.61894,-9.64259c0.78799,0.16172 8.78264,6.78652 8.78264,7.27774c0,0.21924 -0.84021,0.52718 -1.86712,0.68428l-1.86712,0.28564l-0.18428,3.04622c-0.23635,3.9069 -2.38813,8.41599 -5.38401,11.28228c-1.19991,1.14802 -2.39614,2.0873 -2.65829,2.0873c-0.26216,0 -1.38196,-1.14724 -2.48846,-2.5494l0,0zm-18.16072,7.1457c0,-0.28189 0.31607,-1.09728 0.70237,-1.812c0.70088,-1.29673 0.69682,-1.30302 -1.9161,-2.96287c-4.08811,-2.59695 -7.12681,-7.20639 -8.08262,-12.26063l-0.31335,-1.657l2.23421,-0.29298c4.60557,-0.60396 4.64762,-0.5857 5.57,2.4175c0.62242,2.02656 1.38794,3.24104 3.03813,4.81985c1.21332,1.16085 2.37557,2.01038 2.58278,1.88786c0.2072,-0.12252 0.5071,-0.84645 0.66645,-1.60874c0.15935,-0.7623 0.49164,-1.386 0.73841,-1.386c0.56655,0 5.90178,8.0484 5.98648,9.03084c0.05657,0.65616 -2.82751,1.79225 -10.34387,4.07467c-0.47928,0.14553 -0.86289,0.03419 -0.86289,-0.2505l0,0z" fill="#000000"/>
							<text stroke="#000000" transform="matrix(1,0,0,0.8067117812630435,0,2.684853398876399) " stroke-opacity="0" xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_3" y="35.69767" x="24.9" stroke-width="0" fill="#ffffff">1</text>
						</g>
					</svg>
				</div>
				<div class="flex" >
					<svg width="50" height="50" :class="disable" @click="prev">
						<g class="layer">
							<path  transform="rotate(180 25.03957748413086,24.95196533203125) " stroke="white"  d="m28.083397,24.951971l-17.830295,-14.800006l11.742657,0l17.830295,14.800006l-17.830295,14.799994l-11.742657,0l17.830295,-14.799994z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="none"/>
						</g>
					</svg>
				</div>
				<div class="flex" >
					<svg width="50" height="50" v-if="playIcon" :class="disable" @click="toggleplaying">
						<g class="layer">
							<line  y2="40.1" x2="20" y1="10.1" x1="20" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="white" fill="none"/>
							<line  y2="40.100001" x2="30.1" y1="10.100001" x1="30.1" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="white" fill="none"/>
						</g>
					</svg>
					<svg width="50" height="50" v-if="!playIcon" @click="toggleplaying">
						<g class="layer">
							<path fill="#ffffff" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" d="m11.6495,37.24513l14.8,-24.375l14.8,24.375l-29.6,0z" id="svg_2" transform="rotate(90 26.449501037597656,25.0576286315918) " stroke="#ffffff"/>
						</g>
					</svg>
				</div>
				<div class="flex" >
					<svg width="50" height="50" :class="disable" @click="next(true)">
						<g class="layer">
							<path  stroke="white"  d="m28.083397,24.951971l-17.830295,-14.800006l11.742657,0l17.830295,14.800006l-17.830295,14.799994l-11.742657,0l17.830295,-14.799994z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="none"/>
						</g>
					</svg>
				</div>
				<div class="flex">
					<svg width="50" height="50" :class="disable" @click="showplaylist">
						<g class="layer">
							<path id="svg_5" d="m104.89901,299.18906c-0.07445,-0.00886 -0.10595,-0.09614 -0.09073,-0.16148c0.02618,-0.10321 0.12862,-0.17453 0.23139,-0.18612c0.03899,-0.00322 0.08199,-0.00267 0.1141,0.0219c0.02636,-0.01047 0.00781,-0.05175 0.01262,-0.07649c0,-0.30451 0,-0.60902 0,-0.91353c0.06628,-0.00966 0.02348,0.08419 0.03517,0.12263c-0.00044,0.33612 0.00275,0.67228 -0.00336,1.00837c-0.03232,0.12561 -0.17433,0.20519 -0.29919,0.18472zm0.01259,-0.05491c0.10172,-0.03234 0.19638,-0.09985 0.24477,-0.19688c0.00423,-0.05999 -0.07083,-0.04751 -0.10476,-0.02725c-0.05975,0.02994 -0.11599,0.06927 -0.16259,0.11732c-0.03094,0.02844 -0.07033,0.11584 0.00348,0.11088l0.0102,-0.00144l0.0089,-0.00262l0,0l0,0z" stroke-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="#000000" fill="#00bf00"/>
							<path stroke="#000000" id="svg_11" d="m7.06331,33.1l35.97338,0l0,6.90001l-35.97338,0l0,-6.90001z" stroke-opacity="0" fill="#00bf00"/>
							<path stroke="#000000" id="svg_14" d="m20.11331,10.04999l22.97338,0l0,6.90001l-22.97338,0l0,-6.90001z" stroke-opacity="0" fill="#00bf00"/>
							<path id="svg_15" stroke="#000000" d="m7.01331,21.64999l35.97338,0l0,6.90001l-35.97338,0l0,-6.90001z" stroke-opacity="0" fill="#00bf00"/>
							<path transform="rotate(90 14.528643608093262,13.751625061035158) " id="svg_16" d="m8.4715,19.05162l6.05714,-10.6l6.05714,10.6l-12.11428,0z" stroke-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="#000000" fill="#00bf00"/>
						</g>
					</svg>
				</div>
			</div>
		</div>
		</transition>
		<transition name="mini">
		<div class="mini-player" v-show="!fullScreen" >
			<div class="icon" @click="open">
				<img ref="minicd" class="minicd" :class="{'minipause':!this.playing }" width="40" height="40" :src="currentSong.image">
			</div>
			<div class="text" @click="open">
				<p class="name" v-html="currentSong.name"></p>
				<p class="desc" v-html="currentSong.singer"></p>
			</div>
			<div class="control">
				<progress-circle :radius="radius" :percent="percent">
					<span class="mini" @click="toggleplaying">
						<svg width="25" height="25"  v-if="!playIcon">
							<g class="layer">
								<path stroke="#00bf00" transform="rotate(90 13.997964859008789,13.254626274108888) " id="svg_5" d="m7.41225,19.05463l6.58571,-11.6l6.58571,11.6l-13.17143,0z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" fill="#00bf00"/>
							</g>
						</svg>
						<svg width="25" height="25" v-if="playIcon">
							<g class="layer">
								<line stroke-width="2" stroke="#00bf00" id="svg_2" y2="20.02656" x2="14" y1="5.22656" x1="14.1" fill="none"/>
								<line stroke-width="2" stroke="#00bf00" id="svg_4" y2="20" x2="11.05" y1="5.2" x1="11.15" fill="none"/>
							</g>
						</svg>
					</span>
				</progress-circle>			
				<span class="mini-next" :class="disable">
					<svg width="25" height="25"  @click="next(false)">
						<g class="layer">
							<path stroke="#000000" transform="rotate(90 12.511499404907227,12.522054672241213) " stroke-opacity="0" id="svg_1" d="m4.1615,19.85955l8.35,-14.675l8.35,14.675l-16.7,0z" fill="#00bf00"/>
						</g>
					</svg>
				</span>		
				<span class="mini-list" @click="showplaylist">
					<svg width="25" height="25" >
						<g class="layer">
							<path stroke="#000000" id="svg_1" d="m9.08899,3.10791l12.87338,0l0,3.9l-12.87338,0l0,-3.9z" stroke-opacity="0" fill="#00bf00"/>
							<path stroke="#000000" id="svg_3" d="m3.0133,10.07656l18.97339,0l0,4l-18.97339,0l0,-4z" stroke-opacity="0" fill="#00bf00"/>
							<path stroke="#000000" id="svg_4" d="m3.1133,17.17656l18.87339,0l0,3.9l-18.87339,0l0,-3.9z" stroke-opacity="0" fill="#00bf00"/>
							<path id="svg_5" d="m104.89901,299.18906c-0.07445,-0.00886 -0.10595,-0.09614 -0.09073,-0.16148c0.02618,-0.10321 0.12862,-0.17453 0.23139,-0.18612c0.03899,-0.00322 0.08199,-0.00267 0.1141,0.0219c0.02636,-0.01047 0.00781,-0.05175 0.01262,-0.07649c0,-0.30451 0,-0.60902 0,-0.91353c0.06628,-0.00966 0.02348,0.08419 0.03517,0.12263c-0.00044,0.33612 0.00275,0.67228 -0.00336,1.00837c-0.03232,0.12561 -0.17433,0.20519 -0.29919,0.18472zm0.01259,-0.05491c0.10172,-0.03234 0.19638,-0.09985 0.24477,-0.19688c0.00423,-0.05999 -0.07083,-0.04751 -0.10476,-0.02725c-0.05975,0.02994 -0.11599,0.06927 -0.16259,0.11732c-0.03094,0.02844 -0.07033,0.11584 0.00348,0.11088l0.0102,-0.00144l0.0089,-0.00262l0,0l0,0z" stroke-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="#000000" fill="#00bf00"/>
							<path transform="rotate(90 5.78249979019165,5.248554706573487) " id="svg_9" d="m2.8825,7.78605l2.9,-5.075l2.9,5.075l-5.8,0z" stroke-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" stroke="#000000" fill="#00bf00"/>
						</g>
					</svg>
				</span>	
			</div>
		</div>
		</transition>
		<playlist  ref="playlist"></playList>
		<audio ref="audio" :src="url" @canplay="ready" @error="error" @timeupdate="updatetime" @ended="end">
		</audio>
	</div>
	
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import progressbar from '../../CommonComponen/progress-bar/progress-bar.vue'
	import {getSongVkey} from 'api/song.js'
	import {ERR_OK} from 'api/config.js'
	import {addClass} from 'common/js/dom'
	import ProgressCircle from '../../CommonComponen/progress-circle/progress-circle.vue'
	import {playMode} from  'common/js/config.js'
	import {shuffle} from 'common/js/util.js'
	import Lyric from 'lyric-parser'
	import Scroll from '../../CommonComponen/scroll/scroll.vue'
	import {debounce} from 'common/js/util.js'
	import playlist from '../playlist/playlist.vue'
	export default{
		data() {
			return {
				songReady: false,
				currentTime:0,
				radius:25,
				currentLyric:null,
				currentLineNum:0,
				currentShow:"cd",
				cdlyric:'',
				defaultlyric:[
					{lines:"暂无歌词"}
				],
				set:true
			}	
		},
		computed: {
			...mapGetters([
				'fullScreen',
				'playList',
				'currentSong',
				'url',
				'playing',
				'currentIndex',
				'mode',
				'sequenceList'
			]),
			bgstyle() {
					return this.set===true?`background-image:url(${this.currentSong.image})`:''
				
			},
			iconMode(){
				return  this.mode === playMode.sequence ? "sequence" : 
				this.mode === playMode.loop ? "loop" : "random" 
			},
			playIcon(){
				return this.playing;
			},
			disable(){
				return this.songReady? '':'disable';
			},
			percent(){
				return this.currentTime /this.currentSong.duration;
			}
		},
		created(){
			this.touch={}
		},
		methods: {
			showplaylist(){
				this.$refs.playlist.show()
			},
			changeMode(){
				const mode = (this.mode +1)%3;
				this.setPlayMode(mode);
				let list = null ;
				if(mode ===playMode.random ){
					 list = shuffle(this.playList);
				}else{
					list=this.sequenceList;
				}
				this.resetCurrentIndex(list);
				this.setPlayList(list);
			},
			resetCurrentIndex(list){
				let index = list.findIndex((item)=>{
					return item.id ===this.currentSong.id
				})
				 this.setCurrentIndex(index);
			},
			updatetime(e){
				this.currentTime=e.target.currentTime;
			},
			format(interval){
				interval =interval | 0 ;
				const minute = interval/60 | 0 ;
				const second = this._pad(interval % 60) ;
				return `${minute}:${second}`;
			},
			_pad(num, n=2){
				let len =num.toString().length;
				while(len<n){
					num='0'+num;
					len++;
				}
				return num;
			},
			onProgressBarChange(percent){
				const currentTime=this.currentSong.duration*percent
				this.$refs.audio.currentTime=this.currentSong.duration*percent;
				if(!this.playing){
					this.toggleplaying();
				}
				if(this.currentLyric){
					this.currentLyric.seek(currentTime * 1000)
					console.log("快进歌词")
				}
			},
			back(){
				this.setFullScreen(false)
			},
			open(){
				this.setFullScreen(true)
			},
			ready(){
				this.songReady=true;
			},
			error(){
				this.songReady=true;
			},
			end(){
				if(this.mode===playMode.loop){
					this.loop();
				}else{
					this.next(2);
				}
			},
			loop(){
				this.$refs.audio.currentTime=0;
				this.$refs.audio.play();
				if(this.currentLyric){
					this.currentLyric.seek()
				}
			},
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				seturl:'SET_URL',
				setPlayMode:'SET_PLAY_MODE',
				setPlayList:'SET_PLAYLIST'
			}),
			...mapActions([
				'selectPlay'
			]),
			toggleplaying(){
				if(!this.songReady){
					return
				}
				this.setPlayingState(!this.playing)
				if(this.currentLyric){
					this.currentLyric.togglePlay()
					
				}
			},
			next(bool){
				if(!this.songReady){
					return
				}
				if(this.playing){
					this.setPlayingState(!this.playing)
				}
				
				
				if(bool=="2"){
					bool=this.fullScreen;
				}
				if(this.playList.length===1){
					setTimeout(()=>{
						this.$refs.cd.style[`transform`]=`translate3d(0,0,0)`
						this.$refs.cd.style[`transition-duration`]=`1000ms`
						this.$refs.lyric.style[`opacity`]=1
						this.$refs.cdlyric.style[`opacity`]=1
						this.setPlayingState(true);
					},1000)
					this.loop()
				}else{
					let index=this.currentIndex+1;
					if(index==this.playList.length){
						index=0;
					}
					this.songReady=false;
					getSongVkey(this.playList[index].mid).then((res) => {
						if (res.code === ERR_OK) {
							const url=`http://dl.stream.qqmusic.qq.com/C400${this.playList[index].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
							
							if(res.data.items[0].vkey==''){
								this.songReady=true;
								this.setCurrentIndex(index);
								this.next(bool);
							}
							else{
								this.$refs.lyric.style[`opacity`]=0
								this.$refs.cdlyric.style[`opacity`]=0
								this.$refs.cd.style[`transform`]=`scale(0.4,0.4) translate3d(0,0,0)`
								this.$refs.cd.style[`transition-duration`]=`600ms`
								setTimeout(()=>{
									this.$refs.cd.style[`transform`]=`scale(0.4,0.4) translate3d(0,-200%,0)`
									this.$refs.cd.style[`transition-duration`]=`400ms`
								},600)
								setTimeout(()=>{
									this.$refs.cd.style[`transform`]=`translate3d(0,0,0)`
									this.$refs.cd.style[`transition-duration`]=`1000ms`
									this.setPlayingState(true);
									this.setCurrentIndex(index);
									this.seturl(url);
								},1000)
							}
						}
					})
				}
			},
			prev(){
				if(!this.songReady){
					return
				}
				if(this.playing){
					this.setPlayingState(!this.playing)
				}
				
				if(this.playList.length===1){
					setTimeout(()=>{
						this.$refs.cd.style[`transform`]=`translate3d(0,0,0)`
						this.$refs.cd.style[`transition-duration`]=`1000ms`
						this.$refs.lyric.style[`opacity`]=1
						this.$refs.cdlyric.style[`opacity`]=1
						this.setPlayingState(true);
					},1000)
					this.loop()
				}else{
					let index=this.currentIndex-1;
					if(index<0){
						index=this.playList.length-1;
					}
					this.songReady=false;
					getSongVkey(this.playList[index].mid).then((res) => {
						if (res.code === ERR_OK) {
							const url=`http://dl.stream.qqmusic.qq.com/C400${this.playList[index].mid}.m4a?fromtag=38&guid=5931742855&vkey=${res.data.items[0].vkey}`;
							if(res.data.items[0].vkey==''){
								this.songReady=true;
								this.setCurrentIndex(index);
								this.prev();
							}else{
								this.$refs.lyric.style[`opacity`]=0
								this.$refs.cdlyric.style[`opacity`]=0
								this.$refs.cd.style[`transform`]=`scale(0.4,0.4) translate3d(0,0,0)`
								this.$refs.cd.style[`transition-duration`]=`600ms`
								setTimeout(()=>{
									this.$refs.cd.style[`transform`]=`scale(0.4,0.4) translate3d(0,-200%,0)`
									this.$refs.cd.style[`transition-duration`]=`400ms`
								},600)
								setTimeout(()=>{
									this.$refs.cd.style[`transform`]=`translate3d(0,0,0)`
									this.$refs.cd.style[`transition-duration`]=`1000ms`
									this.setPlayingState(true);
									this.setCurrentIndex(index);
									this.seturl(url);
								},1000)
							}
						}
					})
				}		
			},
			getLyric: debounce(function(){
				this.cdlyric=''
					if(!this.currentSong.mid){
						return
					}
				
				this.currentSong.getLyric().then((lyric)=>{
					console.log("获取歌词成功")
					this.currentLyric=new Lyric(lyric,this.handleLyric)
					if(this.currentLyric.state==0){
						this.cdlyric='此歌曲为没有填词的纯音乐，请您欣赏'
					}
					this.$refs.lyric.style[`opacity`]=1
					this.$refs.cdlyric.style[`opacity`]=1
					if(this.playing){
						this.currentLyric.play()
					}
					setTimeout(()=>{
						console.log("歌词Scroll刷新")
						this.$refs.lyricList.refresh()
					},1800)
					
				}).catch(()=>{
					console.log("暂无歌词")
					this.currentLyric=null
					this.$refs.lyric.style[`opacity`]=1
					this.$refs.cdlyric.style[`opacity`]=1
					this.cdlyric='网络延迟，暂无歌词'
					this.currentLineNum=0
				})
			},2000),
			handleLyric({lineNum,txt}){
				this.currentLineNum=lineNum
				if(lineNum>=5){
					let lineEL=this.$refs.lyricLine[lineNum-5]
					this.$refs.lyricList.scrollToElement(lineEL,1000)
				}else{
					this.$refs.lyricList.scrollTo(0,0,1000)
				}
				this.cdlyric=txt
			},
			middleTouchStart(e){
				this.touch.initiated=true
				const touch =e.touches[0]
				this.touch.startX=touch.pageX
				this.touch.startY=touch.pageY
			},
			middleTouchMove(e){
				if(!this.touch.initiated){
					return
				}
				const touch=e.touches[0]
				const deltaX =touch.pageX-this.touch.startX
				const deltaY =touch.pageY-this.touch.startY
				if(Math.abs(deltaY)>Math.abs(deltaY)){
					return
				}
				const left =this.currentShow==='cd' ? 0 : -window.innerWidth
				const width=Math.min(0,Math.max(-window.innerWidth,left+deltaX))
				this.touch.percent=Math.abs(width/window.innerWidth)
				this.$refs.lyricList.$el.style[`transform`]=`translate3d(${width}px,0,0)`
				this.$refs.lyricList.$el.style[`transition-duration`]=`0`
				this.$refs.middleL.style.opacity=1-this.touch.percent
				this.$refs.middleL.style[`transition-duration`]=`0`
			},
			middleTouchEnd(e){
				let width
				let opacity
				if(this.currentShow==='cd'){
					if(this.touch.percent>0.1){
						width=-window.innerWidth
						opacity=0
						this.currentShow='lyric'
					}else{
						width=0
						opacity=1
					}
				}else{
					if(this.touch.percent<0.9){
						width=0
						this.currentShow='cd'
						opacity=1
					}else{
						width=-window.innerWidth
						opacity=0
					}
				}
				this.$refs.middleL.style.opacity=opacity
				this.$refs.lyricList.$el.style[`transform`]=`translate3d(${width}px,0,0)`
				this.$refs.lyricList.$el.style[`transition-duration`]=`1000ms`
			}
		},
		watch:{
			url(newurl,oldurl){
				if (!newurl) {
				return
				}
				if(newurl===oldurl){
				return 	
				}
				if(this.currentLyric){
					this.currentLyric.stop()	
				}
				this.getLyric()
				setTimeout(()=>{
				this.$refs.audio.play()
				},100)
			},
			playing(newPlaying){
				this.$nextTick(()=>{
					setTimeout(()=>{
						const audio = this.$refs.audio
						newPlaying? audio.play() : audio.pause()
					},100)
				})
			}
		},
		components:{
			progressbar,
			ProgressCircle,
			Scroll,
			playlist
		}
	}
</script>

<style scoped>
	.normal-player{
		position: fixed;
		z-index: 150;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: black;
	}
	.mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 55px;
	  background-color: white;
	  }
	.background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
		background-size:cover;
		filter: brightness(50%) blur(50px);
	}
    .top{
		height:20%;
		width: 100%;
		text-align: center;
	} 
	.change{
		margin: 1% 0% 0 1%;
		text-align: left;
	}
	.title{
		color: lavender;
		font-size: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.subtitle{
		color: silver;
		font-size: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-top: 5px;
	}
	.subtitle:after{
		content:" — ";	
	}
	.subtitle:before{
		content:" — ";	
	}
    .middle{
		height: 55%;
        width: 100%; 
        white-space: nowrap; 
        font-size: 0; 
		overflow: hidden;
	}
	.middle-l{
		display: inline-block;
        vertical-align: top;
        width: 100%;
		height: 100%;
	}
	.middle-r{
		display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
	}
	.middle-bottom{
		height: 10%;
		width: 100%;
	}
    .cd-wrapper{
		margin: 0 auto;
		width: 75%;
	}
	.cd{
		width: 80%;
		padding-top:80%;
		border: 10px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		background-clip: padding-box;
		animation: 25s linear infinite rotate; 
		margin: 0 auto;
		background-size: 100% 100%;
		z-index: -1;
	}
	.cd-lyric-wrapper{
		width: 100%;
		margin-top: 50px;
	}
	.cd-lyric{
		width: 100%;
		height: 100%;
		color: #cccccc;
		text-align: center;
		font-size: 16px;
	}
	.lyric-wrapper{
		width: 80%;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
	}
	.lyric-text{
	  line-height: 32px;
	  color: #cccccc;
	  font-size: 16px;
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	.pause{
		animation-play-state:paused;
	}
	.minicd{
		animation: 15s linear infinite rotate; 
	}
	.minipause{
		animation-play-state:paused;
	}
	@keyframes rotate{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
	.progress-wrapper{
		height: 20%;
		display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
		color: lavender;
		font-size: 15px;
		padding-top:5%;
	}
	.progress-bar{
		flex: 1;
	}
	.time-left{
		text-align: left;
		margin-right: 10%;
	}
	.time-right{
		text-align: right;
		margin-left: 10%;
	}
    .bottom{
        display: flex;
		padding: 0 5%;
		height: 15%;
		margin-top: -5%;
	}
	.flex{
		flex: 1;
		padding-top: 10%;
	}
	.flex svg{	
		display: block;
		margin: 0 auto;	
	}
	.icon{
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
	}
    img{
		border-radius: 50%;
	}
    .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
		overflow: hidden;
	}
    .name{
		letter-spacing:1px;
		margin-bottom: 2px;
		font-size: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.desc{
		font-size: 10px;
		letter-spacing:1px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.mini{
		width: 25px;
		height: 25px; 
		border-radius: 50%;
		border: 3px solid #00bf00; 
		position: absolute;
		left:-3px;
		top: -3px;
	}
	.mini-next{
		position: absolute;
		width: 25px;
		height: 25px; 
		border-radius: 50%; 
		border: 3px solid #00bf00; 
		margin-left: 40px;
		margin-top: -28px;
	} 
	.mini-list{
		position: absolute;
		width: 25px;
		height: 25px;
		margin-top: -25px;
		margin-left: 80px;
	}
    .control{
		width: 100px;
		height: 100%;
		padding: 30px 10px 0 0;
	}
	.disable{
		opacity: 0;
	}
	.lyc{
		color: lavender;;
		text-align: center;
		position: relative;
		margin-top: 10%;
	}	
	.current{
		color: lightgreen;
	}
	.dot-wrapper{
		text-align: center;
		font-size: 0;
		padding-top: 5%;
	}
	.dot{
		display: inline-block;
		vertical-align: middle;
		margin: 0 4px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #cccccc;
	}
	.active{
		width: 20px;
		border-radius: 5px;
		background: white;
	}
</style>
