<!-- 底部音乐播放栏 -->
<template>
    <div class="playController" >
        <div class="left" @click="show=!show">
            <!-- 歌曲封面 -->
            <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
            <div class="content">
                <!-- 主要内容 -->
                <div class="title">{{playlist[playCurrentIndex].name}}</div>
                <div class="tips">横划可以切换上下首歌</div>
            </div>
        </div>
        <!-- 右侧图标 -->
        <div class="right">
            <svg v-if="paused" class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>

        <play-music :play="play" @back="show = !show" v-show="show" :playDetail="playlist[playCurrentIndex]"></play-music>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`" ><source src="" type="audio/mpeg"></audio>
    </div>
</template>

<script>
    import playMusic from '@/components/playMusic.vue'
    import {mapState,mapMutations} from 'vuex'
    import {ref,onMounted,onUpdated,computed} from 'vue'

    import { useStore } from 'vuex'


    //vue3实现 
    export default {
        components:{playMusic},
        setup(){
            let show = ref(false)
            let audio = ref(null)
            const store = useStore()

            let playlist = computed(()=>{
                return store.state.playlist
            })
            let playCurrentIndex = computed(()=>{
                return store.state.playCurrentIndex
            })
            let paused = computed(()=>{
                return store.state.paused
            })
            
            onMounted(()=>{      
                store.dispatch('reqLyric', {id:playlist.value[playCurrentIndex.value].id})
            })
            onUpdated(()=>{
                store.dispatch('reqLyric', {id:playlist.value[playCurrentIndex.value].id})
            })

            function play(){
                if(audio.value.paused){
                    audio.value.play()
                    store.commit('setPaused', false)
                    // 播放启动定时器
                    UpdateTime() 
                }else{
                    audio.value.pause()
                    store.commit('setPaused', true)
                    // 暂停取消定时器
                    clearInterval(store.state.id )
                }
            }
            function UpdateTime(){
                store.state.id = setInterval(()=>{
                    //   获取当前播放时间
                    store.commit('setCurrentTime',audio.value.currentTime)
                },100)
            }
            return{
                show,audio,playlist,playCurrentIndex,paused,play
            }
        }
}

















    // export default {
    //     data(){
    //         return{
    //             show:false
    //         }
    //     },
    //     components:{
    //         playMusic
    //     },
    //     computed:{
    //         ...mapState(['playlist','playCurrentIndex','paused']),
            
    //     },
    //     mounted(){
    //         this.$store.dispatch('reqLyric', {id:this.playlist[this.playCurrentIndex].id})
    //     },
    //     updated(){
    //         this.$store.dispatch('reqLyric', {id:this.playlist[this.playCurrentIndex].id})
    //     },

    //     methods:{
    //         play(){
    //             if(this.$refs.audio.paused){
    //                 this.$refs.audio.play()
    //                 this.setPaused(false)
    //                 // 播放启动定时器
    //                 this.UpdateTime() 
    //             }else{
    //                 this.$refs.audio.pause()
    //                 this.setPaused(true)
    //                 // 暂停取消定时器
    //                 clearInterval(this.$store.state.id )
    //             }
                
    //         },
    //         ...mapMutations(['setPaused']),
    //     UpdateTime(){
    //     this.$store.state.id = setInterval(()=>{
    //         //   获取当前播放时间
    //         this.$store.commit('setCurrentTime',this.$refs.audio.currentTime)
    //     },100)
    //     }
    //     }
    // }
</script>

<style scoped lang='less'>
.playController{
    background-color: #fff;
    width:7.5rem;
    height:1.2rem;
    position:fixed;
    left:0;
    bottom:0;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-top: 1px solid #ccc;
    .left{
        display:flex;
        padding:0 0.2rem;
        img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.4rem;
        }
        .content{
            padding:0 0.2rem;
            .tips{
                font-size: 0.2rem;
                color:#999;
                
            }
        }

    }
    .right{
        display:flex;
        .icon{
            margin: 0 0.2rem;
            width: 0.4rem;
            height: 0.4rem;
        }
    }

}

</style>