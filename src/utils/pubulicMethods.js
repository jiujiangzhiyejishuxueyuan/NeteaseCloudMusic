import {Message} from "view-design";

export default {
    playMusic(ids) {
        if (ids) {
            let musics = JSON.parse(window.localStorage.getItem('musics')) || {}
            let echoTime = 100
            musics = musics.ids || []
            if (typeof ids === 'object') {
                musics = [...ids, ...musics]
                musics.forEach(item => {
                    let lastIndex = musics.lastIndexOf(item)
                    if (musics.indexOf(item) !== lastIndex) {
                        musics.splice(lastIndex, 1)
                    }
                })
                musics = {
                    ids: musics,
                    type: 'adds',
                    count: ids.length
                }
                echoTime = 1000
            } else {
                let index = musics.indexOf(ids)
                if (index !== -1) {
                    musics.splice(index, 1)
                }
                musics.unshift(ids)
                musics = {
                    ids: musics,
                    type: 'add',
                    index
                }
                echoTime = 100
            }
            window.localStorage.setItem('musics', JSON.stringify(musics))
            setTimeout(() => {
                let state = JSON.parse(window.localStorage.getItem('musics')).state
                if (state) {
                    Message.success('添加到播放器成功')
                } else {
                    window.open('/music/player')
                }
            }, echoTime)
        }
    },
    onShow(el,callback) {
        el = typeof el === 'string' ? document.querySelector(el) : el
        let observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                callback()
                observer.unobserve(el)
            }
        })
        observer.observe(el)
    }
}