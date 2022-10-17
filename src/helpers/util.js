export function friendlyDate(dateStr) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    //1分钟内
    case space < 1000 * 60:
      str = '刚刚'
      break
    //1小时内
    case space < 1000 * 3600:
      str = Math.floor(space / (1000 * 60)) + '分钟前'
      break
    //1天内
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space / (1000 * 3600*24)) + '天前'
  }
  return str
}
