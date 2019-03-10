<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
		<slot>
		</slot>
    </div>
    <div class="dots">
		<span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="item"></span>
    </div>
  </div>
</template>

<script>    //轮播图组件
	import {addClass} from 'common/js/dom'
	import BScroll from 'better-scroll'

	export default {
		props: {
			loop: { //循环轮播
				type: Boolean,
				default: true
			},
			autoPlay: { //自动轮播
				type: Boolean,
				default: true
			},
			interval: {  //轮播定时器
				type: Number,
				default: 4000
			}
		},
		data() {
		  return {
			dots:[],
			currentPageIndex:0
			}
			
		},
		mounted(){
			setTimeout(() =>{  //dom初始化结束后加载
				this._setSliderWidth()
				this._initSlider() 
				this._initDots()
				if (this.autoPlay) {
					this._play()
				}
			}, 20)
		window.addEventListener('resize', () => {   //同上，避免网络延迟导致图片未加载的问题
			if (!this.slider) {
			return
		}
			this._setSliderWidth(true)
			this.slider.refresh()
		})
		},
		activated() {
			if (this.autoPlay) {
				this._play()
			}
		},
		deactivated() {
			clearTimeout(this.timer)
		},
		beforeDestroy() {
			clearTimeout(this.timer)
		},
		methods: {
			_setSliderWidth(isResize) { //动态获取宽度
				this.children = this.$refs.sliderGroup.children
				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth
				for (let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					addClass(child, 'slider-item')
					child.style.width = sliderWidth + 'px'
					width += sliderWidth
				}
				if (this.loop&& !isResize) {
					width += 2 * sliderWidth
				}
				this.$refs.sliderGroup.style.width = width + 'px'
			},
			_initSlider() {  //初始化slider
				this.slider = new BScroll(this.$refs.slider, {
				  scrollX: true,
				  scrollY: false,
				  momentum: false,
				  snap: true,
				  snapLoop: this.loop,
				  snapThreshold: 0.3,
				  snapSpeed: 400
				})
				this.slider.on('scrollEnd', () => { 
				  let pageIndex = this.slider.getCurrentPage().pageX
				  if (this.loop) {
					pageIndex -=1
				}
				this.currentPageIndex = pageIndex
				  if (this.autoPlay) {
					this._play()
				  }
				})
				this.slider.on('beforeScrollStart', () => {
					if (this.autoPlay) {
						clearTimeout(this.timer)
					}
				})
			},
			_initDots() {
				this.dots = new Array(this.children.length-2)
			},
			_play(){
				let pageIndex = this.currentPageIndex +1
				if (this.loop) {
				  pageIndex += 1
				}
				this.timer = setTimeout(() => {
				  this.slider.goToPage(pageIndex, 0, 400)
				}, this.interval)
			}
		}
	}
</script>

<style scoped >
	.slider{	 
		min-height: 1px;
	}
    .slider-group{
      position: relative;
      overflow: hidden;
	}
    .slider-item{
        float: left;
        overflow: hidden;
        text-align: center;
	}
    a{
		display: block;
		width: 100%;
		overflow: hidden;
		text-decoration: none;
	}
    img{
		display: block;
		width: 100%;
	}
	.dots{
		position: absolute;
		right: 0;
		left: 0;
		bottom: 10px;
		text-align: center;
		font-size: 0;
	}
    .dot{
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color:#757576;
	}
    .active{
		background-color: #FFFFFF;
	}
</style>
