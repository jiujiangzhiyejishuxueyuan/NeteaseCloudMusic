import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('dataFormat', (value, t = 1) => {
    return t === 1 ? format(value, 'yyyy/MM/dd HH:mm') : format(value, 'yyyy/MM/dd')
})
Vue.filter('playCount', count => {
    if (count > 100000000) {
        count = parseInt(count / 100000000) + '亿'
    } else if (count >= 10000) {
        count = (count / 10000).toFixed(1) + '万'
    }
    return count
})
Vue.filter('sminute',s => {
    let m = parseInt(s/60)
    s = s%60
    if(m<10) {
        m = '0' + m
    }
    if(s<10) {
        s = '0' + s
    }
    return isNaN(m)||isNaN(s) ? '00:00':`${m}:${s}`
})
