function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 定义洗牌函数
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
