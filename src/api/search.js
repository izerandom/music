import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida) {
	const url='/api/search'
	//const url='http://973369559.com/search.php'
	const data = Object.assign({}, commonParams, {
		w: query,
		p: page,
		n: 20,
		perpage:20,
		catZhida: zhida ? 1 : 0,
		zhidaqu: 1,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		remoteplace: 'txt.mqq.all',
		uin: 0,
		needNewCode: 1,
		platform: 'h5',
		format: 'json'
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}