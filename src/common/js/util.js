function getRandomInt(min,max){
	return Math.floor(Math.random() * (max-min+1) + min)
}

export function shuffle(arr) {
	let _arr = arr.slice()
	for (let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}
export function debounce(func,delay){  //函数防抖 需要停止
	let timer
	return function(...args){
		if(timer){
			clearTimeout(timer)
		}
		timer=setTimeout(()=>{
			func.apply(this,args)
		},delay)
	}
}

export function throttle(func,delay){ //函数节流  固定次数
	let timer
	return function(...args){
		if(!timer){
		timer=setTimeout(()=>{
				timer=null
				func.apply(this,args)
			},delay)
		}
	}
}
