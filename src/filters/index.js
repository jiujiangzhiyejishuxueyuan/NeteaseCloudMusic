import Vue from 'vue'

Vue.filter('playCount', count => {
    if (count>100000000) {
        count = parseInt(count/100000000) + '亿'
    } else if(count>=100000) {
        count = parseInt(count/10000) + '万'
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
