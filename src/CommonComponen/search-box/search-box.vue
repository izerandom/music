<template>
	<div class="search-area">
		<div class="search-box">
			<div class="input"><input v-model="query" type="text" :placeholder="placeholder" ref="input"></div>
			<div class="cleararea" v-show="query" @click="clear">
				<svg width="30" height="30" class="svg">
					<circle stroke="#000000" fill="#b1b1b1" cx="14.975" cy="15" r="10.89253" id="svg_1" fill-opacity="0.69" stroke-opacity="0"/>
					<path stroke="#000000" fill="#ffffff" stroke-width="null" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="0" d="m7.98001,10.98521l3.43066,-3.80645l3.64433,4.0435l3.64433,-4.0435l3.43068,3.80645l-3.64433,4.04353l3.64433,4.04353l-3.43068,3.80648l-3.64433,-4.04353l-3.64433,4.04353l-3.43066,-3.80648l3.6443,-4.04353l-3.6443,-4.04353z" id="svg_2"/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
	import {debounce} from 'common/js/util.js'
	export default{
		props:{
			placeholder:{
				type:String,
				default:""
			}
		},
		data(){
			return{
				query:''
			}
		},
		methods:{
			clear(){
				this.query=''
			},
			setQuery(query){
				this.query=query
			},
				
			blur(){
				this.$refs.input.blur()
			}
		},
		created(){
			this.$watch('query',debounce((newQuery)=>{
				this.$emit('query',newQuery)
			},500))
		}
	}
</script>

<style scoped>
	.search-area{
		display: flex;
		width: 100%;
		height: 65px;
		background-color: #eeeeee;
	}
	.search-box{
		background-color: white;
		width: 95%;
		height: 60%;
		margin: auto auto;
	}
	.cleararea{
		position: relative;
		margin-left: 90%;
		width: 10%;
		height: 100%;
		text-align: center;
	}
	.svg{
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.input{
		height: 100%;
		width: 90%;
		float: left;
	}
	input{
		height: 100%;
		width: 100%;
		border-style:none;
		outline: none;
		font-size: 15px;
	}
	::-moz-placeholder { color: rgba(178,178,178,0.8); }
	::-webkit-input-placeholder { color:rgba(178,178,178,0.8); }
	::-ms-input-placeholder { color:rgba(178,178,178,0.8); }
</style>
