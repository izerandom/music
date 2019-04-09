<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" class="item" v-for="(song, index) in songs" :key="index">
		<span class="rank" :class="getRankCls(index)" >{{index + 1}}</span>
        <div class="content" >
          <h5 class="name">{{song.name}}</h5>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
	import {getSongVkey} from 'api/song.js'
	import {ERR_OK} from 'api/config.js'
	import {debounce,throttle} from 'common/js/util.js'
  export default {
	 
    props: {
      songs: {
        type: Array,
        default: ()=>[]
      },
	  rank:{
		type:Boolean,
		default:false
	  }
    },
    methods: {
		
		getDesc(song) {
			return `${song.singer}-${song.album}`;
		},
		getRankCls(index) {
			if(this.rank){
				if (index <= 2) {
					return 'top'
				}
			}
		},
		selectItem:throttle(function(item,index){
			this.$emit('select', item, index)
		},500)

	}
  }
</script>

<style scoped>

    .item{
		display: flex;
		box-sizing: border-box; 
		height: 60px;
		align-items: center;
		padding: 10px 0 0 15px;
		
	}
	.rank{
		margin-right: 5%;
		width: 5%;
		height: 100%;
		line-height: 60px;
	}
    .content{
        flex: 1;
		font-size: 18px;
		overflow: hidden;
		border-bottom: 0.5px solid #999999;
		padding-bottom: 5px;
	}
	.content p{
		margin-top: 5px;
		font-size: 10px;
		
	}
	.content h5,p{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.top{
		color: red;
	}
</style>