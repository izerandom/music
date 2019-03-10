<template>
	<div  class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>   //better-scroll初始化组件
	import BScroll from 'better-scroll'
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return{
				time:0
			}
		},		
		props: {
			probeType: {  //是否允许滚动
				type: Number,
				default: 1
			},
			click: {   //滚动条点击
				type: Boolean,
				default: true
			},
			listenScroll: {
				type: Boolean,
				default: false
			  },
			data: {    //初始化数据
				type: Array,
				default: null
			},
			refreshDelay: {
				type: Number,
				default: 20
			}
		},
		computed: {
			...mapGetters([
				'nextready'
			])
		},	
		mounted() {
			setTimeout(() => {  //dom渲染完之后加载
				this._initScroll()
			}, 20)
		},
		methods: {
			_initScroll(){  //Scroll初始化
			if (!this.$refs.wrapper) {
				return
			}
			this.scroll = new BScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click
			})
			if (this.listenScroll) {
				let me = this
				this.scroll.on('scroll', (pos) => {
					me.$emit('scroll', pos)
				})
			}

			if (this.pullup) {
				this.scroll.on('scrollEnd', () => {
					if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
					this.$emit('scrollToEnd')
					}
				})
			}

			if (this.beforeScroll) {
				this.scroll.on('beforeScrollStart', () => {
					this.$emit('beforeScroll')
				})
			}
		},
			//better-scroll自带方法代理
			disable() {		
				this.scroll && this.scroll.disable()
			},
			enable() {  
				this.scroll && this.scroll.enable()
			},
			refresh() {  //刷新scroll
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {  //监听滚动，重新计算滚动条长度
			data() {
				setTimeout(() => {
					this.refresh()
				}, 20)
			}
		}
	}
</script>
<style>
</style>
