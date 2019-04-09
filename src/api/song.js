import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from './config'
import axios from 'axios'
// 获取歌曲的vkey
export function getSongVkey(songmid) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    const data = Object.assign({}, {
        callback: 'musicJsonCallback',
        loginUin: 3051522991,
        format: 'jsonp',
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 3051522991,
        guid: 5931742855,
        songmid: songmid,
        filename: `C400${songmid}.m4a`
    })
 
    return jsonp(url, data)
}
//歌词
export function getLyric(mid) {
      const url = '/api/lyric'
 //const url='http://973369559.com/getlyric.php'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, { params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch(()=>{
		console.log("api未获取到歌词")
		return "暂无歌词"
	})
}