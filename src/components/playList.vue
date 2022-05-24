// 歌单组件
<template>
    <div class='playlist'>
        <div class="playlist-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    <div class="num">(共{{playlist.tracks.length}}首)</div>
                </div>
            
            </div>
            <div class="btn">
                + 收藏 ({{changValue(playlist.subscribedCount)}})
            </div>
            
        </div>
        <div class="list">
            <div @click="setIndex(i)" class="playItem" v-for="(item,i) in playlist.tracks" :key="item.id">
                <div class="left">
                    <div class="index">{{i+1}}</div>
                    <div class="content">
                        <div class="title">{{item.name}}</div>
                        <div class="author">
                            <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
                            <span>{{item.al.name}}</span>

                        </div>

                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gf-playSquare"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-diandian"></use>
                    </svg>

                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
// import store from '@/store/index.js'
import { useStore } from 'vuex'
import {ref,onMounted} from 'vue'

// vue3实现
export default {
    props:['playlist'],
    setup(){
        const store = useStore()
        // 记录playlist当前长度
        let playListLength = ref(0)
        onMounted(()=>{
            playListLength.value = store.state.playlist.length
        })

        function changValue(num){
          let res = 0
          if(num>=10000000){
            res =  num/10000000
            res = res.toFixed(2) + "亿"
          }else if(num>=10000){
            res =  num/10000
            res = res.toFixed(2) + "万"
          }else{
            res = num
          }
          return res
        }
        function setIndex(i){
            store.commit('setPlayIndex', i+playListLength.value)
            if(store.state.paused == false){
                 store.commit('setPaused', true)
            }
        }
        return{
            playListLength,changValue,setIndex,

        }
    }


}
















// vue2实现
// export default {
//     data(){
//         return{
//             // 记录playlist当前长度
//             playListLength : 0
//         }
//     },
//     props:['playlist'],
//     computed:{
//         ...mapState(['paused']),
//     },
//     mounted(){
//         this.playListLength = this.$store.state.playlist.length
//         console.log(this.playListLength);
//     },
//     methods: {
//         changValue(num){
//           let res = 0
//           if(num>=10000000){
//             res =  num/10000000
//             res = res.toFixed(2) + "亿"
//           }else if(num>=10000){
//             res =  num/10000
//             res = res.toFixed(2) + "万"
//           }else{
//             res = num
//           }
//           return res
//         },
//         ...mapMutations(['setPlayIndex','setPaused']),
//         setIndex(i){
//             this.setPlayIndex(i+this.playListLength)
//             if(this.paused == false){
//                 this.setPaused(true)
//             }
//         },

//     },

// }
</script>

<style scoped lang="less">
    .playlist{
        width: 7.5rem;
        padding:0 0.4rem ;
        background-color: #fff;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        margin-top: 0.4rem;
        .playlist-top{
            display: flex;
            justify-content: space-between;
            height:1rem;
            align-items:center;
            .left{
                display: flex;
                align-items: center;
                .icon{
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .title{
                    font-size: 0.3rem;
                    font-weight: 900;
                    margin-left: 0.2rem;
                }
                .num{
                    font-size: 0.25rem;
                    color: #666;
                }
                .text{
                    display: flex;
                    align-items: center;
                }
            }
            .btn{
                font-size: 0.3rem;
                color: #fff;
                background-color:orangered;
                height: 0.8rem;
                /* line-height: 0.6rem; */
                padding: 0.1rem;
                display: flex;
                align-items: center;
                border-radius: 0.4rem;
            }

        }
        .list{
            .playItem{
                display: flex;
                justify-content: space-between;
                align-items:center;
                // height: 1.2rem;
                margin-top: 0.2rem;
                .left{
                    display: flex;
                    align-items:center;
                    color: #666;
                    .index{
                        width: 0.3rem;
                    }
                    .content{
                        margin-left: 0.4rem;

                    }
                    .title{
                        font-size: 0.3rem;
                        font-weight: 900;
                        color: #000;
                        margin-bottom: 0.1rem;
                        
                    }
                    .tag{
                        font-size: 0.2rem;
                        color: orangered;
                        border: 1px solid orangered;
                        border-radius: 0.05rem;
                        padding:0,0.1rem ;
                        /* color: #666; */

                    }
                    .author{
                        color: #666;

                    }
                }
                .right{
                    display:flex;
                    .icon{
                        margin: 0 0.2rem;

                    }
                }
                
                

            }
        }
    }
    

</style>