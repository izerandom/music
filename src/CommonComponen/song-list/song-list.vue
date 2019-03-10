<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" class="item" v-for="(song, index) in songs" :key="index">
		<span class="rank" :class="getRankCls(index)" v-if="index<9">{{index + 1}}&nbsp;&nbsp;</span>
		<span class="rank" :class="getRankCls(index)" v-else>{{index + 1}}</span>
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
		selectItem(item,index){
			this.$emit('select', item, index)
		}

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
		margin-right: 20px;
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