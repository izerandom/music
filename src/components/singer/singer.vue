<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
		<router-view></router-view>
  </div>
</template>

<script>
	import ListView from '../../CommonComponen/listview/listview.vue'
	import {getSingerList} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import Singer from '../../common/js/singer.js'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from 'common/js/mixin.js'
  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
		mixins:[
			playlistMixin
		],
    data() {
      return {
        singers: []
      }
    },
    created() {
			setTimeout(() => {  
				this._getSingerList()
			}, 800)
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '55px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {  //获取点击的歌手，跳转
        this.$router.push({
          path:`/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {  //获取歌手数据
				getSingerList().then((res) => {
					if (res.code === ERR_OK) {
						this.singers = this._normalizeSinger(res.data.list)
					}
				})
			},
      _normalizeSinger(list) {  
        let map = {    //热门歌手
          hot: {
            title: HOT_NAME,  
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped >
  .singer{
		position: fixed;
		top: 88px;
		bottom: 0;
		width: 100%;
	}
	
</style>
