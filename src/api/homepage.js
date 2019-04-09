import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHomepage() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})

	return jsonp(url, data, options)
}
export function getDiscList() {   //歌单
      const url = '/api/getDiscList'
	//const url='http://973369559.com/getdisc.php'
	const data = Object.assign({}, commonParams, {
		platform: 'yqq.json', // 加引号
		hostUin: 0,
		sin: 0,
		ein: 61,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		 rnd: Math.random(),
		format: 'json'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getSongList(disstid) {  //歌单详情
	    const url = '/api/getSongList'
	 //const url='http://973369559.com/discsong.php'
	const data = Object.assign({}, commonParams, {
		disstid,
		type: 1,
		jsonp: 1,
		utf8: 1,
		onlysong: 0,
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		format:'json'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}