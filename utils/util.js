const formatTime = (date, mode = 0) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let today = new Date()
  let yearT = today.getFullYear()
  let monthT = today.getMonth() + 1
  let dayT = today.getDate()
  
  if (mode === 0) {
    if (year === yearT && month === monthT) {
      if (day === dayT) {
        return '今天'        
      } else if (day === dayT - 1) {
        return '昨天'
      } else if (day ===  dayT + 1) {
        return '明天'
      } else {
        return month + '月' + day + '日'
      }
    } else if (year === yearT && month !== monthT) {
      return month + '月' + day + '日'
    }
  }
  return year + '年' + month + '月' + day + '日'
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
