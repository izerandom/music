import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from './config'

export function getSingerList() {  //歌手列表
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

	const data = Object.assign({}, commonParams, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq'
	})
	return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {  //歌手详情
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

	const data = Object.assign({}, commonParams, {
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		begin: 0,
		num: 100,
		songstatus: 1,
		singermid: singerId
	})

	return jsonp(url, data, options)
}