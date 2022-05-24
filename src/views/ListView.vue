// 歌单页面组件
<template>
    <div class='listView'>
        <listview-top :playlist="state.playlist"></listview-top>
        <play-list :playlist="state.playlist"></play-list>
    </div>
</template>

<script>
    import listviewTop from '@/components/listviewTop'
    import playList from '@/components/playList'
    import {getPlaylistDetail,pushPlaylist} from '@/api/index'
    import {onMounted,ref,reactive,onUpdated} from 'vue'
    import {useRoute} from 'vue-router'
    import store from '@/store/index.js'

    // vue3实现
    export default {
        name: 'ListView',
        components:{
            listviewTop,
            playList
        },
        setup(){
            const route = useRoute()
            // 歌单信息
            let state = reactive({
                list:[],
                playlist:{
                    // 防止一开始报错
                    creator:{},
                    tracks:[],
                    tags:[],
                    highquality:{}
                },
            })
            onMounted(async ()=>{
                let id = route.query.id
                // 调用api 获取歌单信息
                let result = await getPlaylistDetail(id)
                state.playlist = result.data.playlist
                // store.commit 调用actions中的pushPlaylist函数，传入state.playlist.tracks
                state.playlist.tracks.forEach((item,i) => {
                    store.commit('pushPlaylist',item)
                });
            })
            return{
                state,
            }
        }
    }
</script>

<style scoped>

</style>