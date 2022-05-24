<!-- 音乐播放页面 -->
<template>
    <div class='playMusic'>
        <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
        <div class="playTop">
            <div class="back" @click="$emit('back')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fanhui"></use>
                </svg>
            </div>
            <div class="center">
                <div class="title">
                    <!-- <marquee behavior="scroll" direction="left">{{playDetail.al.name}}</marquee> -->
                    {{playDetail.name}}
                </div>
                <!-- <div class="author"></div>  -->
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true" @click="play">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>

        </div>
        <div class="playContent" v-show="!isLyric" @click="isLyric=!isLyric">
            <img class="needle" :class="{active:!paused}" src="@/assets/imgs/2.png" alt="">
            <img class="disc" src="@/assets/imgs/1.png" alt="">
            <!-- 歌曲封面 -->
            <img class="playImg"  :class="{active:!paused}" :src="playDetail.al.picUrl" alt="">
        </div>
        <!-- 歌词界面 -->
        <div class="playLyric" v-show="isLyric" ref="playLyric" @click="isLyric=!isLyric">
            <!-- currentTime*1000当前的时间   item.pre 下一次循环的时间    item.time这次循环的时间    &&前后都成立-->
            <p ref="p" :class="{active:(currentTime*1000 >= item.time && currentTime*1000 <= item.pre )}" v-for="(item,i) in lyricList" :key="i">
            {{item.lyric}}
            </p>
                

        </div>

        <div class="progress"></div>
        <!-- 底部播放栏 -->
        <div class="playFooter">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            

            <!-- 播放 -->
            <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <!-- 暂停 -->
            <svg v-else class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>

            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-liebiao"></use>
            </svg>

        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {ref,watch,watchEffect,getCurrentInstance,onUpdated,computed} from 'vue'
    import { useStore } from 'vuex'

    //vue3实现 
    export default {
        props:['playDetail','play'],
        setup(){
            const store = useStore()
            let paused = computed(()=>{
                return store.state.paused
            })
            let currentTime = computed(()=>{
                return store.state.currentTime
            })
            let lyricList = computed(()=>{
                return store.getters.lyricList
            })
            // 控制唱片和歌词的出现
            let isLyric = ref(false)
            let p = ref([])
            const playLyric = ref([])

          
            onUpdated(()=>{
                p.value.forEach((item)=>{
                    // 寻找出拥有active类的p元素
                    if(item.getAttribute('class') == 'active'){
                        let offsetTop = item.offsetTop;
                        // 顶部到可视窗口的距离 = 当前元素相对于其 offsetParent 元素的顶部内边距的距离。 - 150
                        playLyric.value.scrollTop = offsetTop - 150
                    }
                })

            })
            function goPlay(num){
                    let index = store.state.playCurrentIndex + num
                    if(index <= 0){
                        index = store.state.playlist.length - 1
                    }else if(index == store.state.playlist.length){
                        index = 0
                    }
                    store.commit('setPlayIndex',index)
                }
            return{
                isLyric,goPlay,p,playLyric,paused,currentTime,lyricList
            }
        }
    }






















    // vue2实现
    // export default {
    //     data(){
    //         return{
    //             // 判断显示歌词还是唱片
    //             isLyric:true
    //         }
    //     },
    //     updated(){
    //     },
    //     props:['playDetail','play'],
    //     computed:{
    //         ...mapState(['paused','lyric','currentTime','playlist','playCurrentIndex']),
            
    //     },
    //     watch:{
    //         // 监视当前时间变化
    //         currentTime:function(){
    //             // this.$refs.p 是一个包含有很多p元素的数组
    //             this.$refs.p.forEach((item,i)=>{
    //                 // 寻找出拥有active类的p元素
    //                 if(item.getAttribute('class') == 'active'){
    //                     let offsetTop = item.offsetTop;
    //                     // 顶部到可视窗口的距离 = 当前元素相对于其 offsetParent 元素的顶部内边距的距离。 - 150
    //                     this.$refs.playLyric.scrollTop = offsetTop - 150
    //                 }
    //             })           
    //         }
    //     },
    //     methods: {
    //         goPlay(num){
    //             let index = this.playCurrentIndex + num
    //             if(index <= 0){
    //                 index = this.playlist.length - 1
    //             }else if(index == this.playlist.length){
    //                 index = 0
    //             }
    //             this.$store.commit('setPlayIndex',index)
    //         },
    //     },
    // }
</script>

<style lang='less'>
    .playMusic{
        z-index:2;
        position:fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color:#fff;
        .bg{
            position:absolute;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-size:auto 100%;
            background-position:center;
            filter:blur(60px);
            
        }
        .playTop{
            display:flex;
            align-items:center;
            justify-content: space-between;
            width:7.5rem;
            height:1.2rem;
            position:absolute;
            left:0;
            color:#fff;
            padding:0 0.4rem;
            .icon{
                fill:#fff;
                width:0.4rem;
                height:0.4rem;

            }
            marquee{
                width: 5rem;

            }
            

        }
        .playContent{
                position: absolute;
                width: 7.5rem;
                height: 7.5rem;
                left:0;
                top:1.5rem;
                .needle{
                    width: 2.2rem;
                    height:auto;
                    position:absolute;
                    left:3.5rem;
                    top:0rem;
                    /* 设置旋转原点 */
                    transform-origin: 0.37rem 0.37rem;
                    /* 设置旋转角度 */
                    transform:rotate(-20deg);
                    transition:all 1s;
                    z-index: 10;
                }
                .needle.active{
                    width: 2.2rem;
                    height:auto;
                    position:absolute;
                    left:3.5rem;
                    top:0rem;
                    /* 设置旋转原点 */
                    transform-origin: 0.3rem 0;
                    /* 设置旋转角度 */
                    transform:rotate(7deg);
                    transition:all 1s;
                    z-index: 10;
                }
                .disc{
                    width: 5.5rem;
                    height: auto;
                    position:absolute;
                    left:calc(50% - 2.75rem);
                    top:2.5rem;
                }
                .playImg{
                    width:3.5rem;
                    height:3.5rem;
                    border-radius: 3.5rem;
                    position:absolute;
                    left:calc(50% - 1.75rem);
                    top:3.5rem;
                    // 添加动画
                    animation: rotate 10s linear infinite; 
                    // 动画状态暂停
                    animation-play-state: paused;
                }
                // 定义动画
                @keyframes rotate{
                    0%{
                        transform: rotateZ(0deg);/*从0度开始*/
                    }
                    100%{
                        transform: rotateZ(360deg);/*360度结束*/
                    }
                }
                .playImg.active{
                    width:3.5rem;
                    height:3.5rem;
                    border-radius: 3.5rem;
                    position:absolute;
                    left:calc(50% - 1.75rem);
                    top:3.5rem;
                    display: block;
                    animation: rotate 10s linear infinite; 
                    //动画状态播放
                    animation-play-state: running;


                }
                


            }
            .playFooter{
                width: 7.5rem;
                height: 1.5rem;
                position:absolute;
                left: 0;
                bottom: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:0 0.4rem;
                .icon{
                    fill:#fff;
                    width: 0.5rem;
                    height: 0.5rem;
                    
                }
                .play{
                    width: 1rem; 
                    height: 1rem;   
                }



            }
            .playLyric{
                position: absolute;
                width: 7.5rem;
                height: 8rem;
                left:0;
                top:calc(50% - 4rem);
                // 溢出滚动
                overflow:scroll;
                text-align:center;
                color:#ccc;
                p{
                    padding: 0.2rem 0;
                }
                .active{
                    color:#fff;
                }
            }
    }

</style>