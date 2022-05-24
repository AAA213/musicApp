<!-- 搜索的头部组件 -->
<template>
    <div class='searchTop'>
        <div class="searchTopNav">
            <div class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>

            <div class="right">
                <input type="text" v-model='searchKeyword' :placeholder='placeholder' @keydown.enter = "saveKeyWord">
                <!-- 清空 -->
                <svg class="icon" v-show="searchKeyword != ''" aria-hidden="true" @click="deleteList">
                    <use xlink:href="#icon-shanchu2"></use>
                </svg>
            </div>
        </div>
        <!-- 历史纪录 -->
        <div class="history" v-show="searchSongs.length == 0">
            <div class="historyLeft">
                历史
            </div>
            <div class="historyRight">
                <!-- 删除记录 -->
                <svg class="icon" aria-hidden="true" @click="deleteKeyWord">
                    <use xlink:href="#icon-1"></use>
                </svg>
                <div @click="historySearch(item)" class="keywordItem" v-for="(item,i) in keywordList" :key='i'>{{item}}</div>
            </div>

           
        </div>
<div class='searchSongs' v-show="searchSongs.length !== 0">
        <div class="searchSongs-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    <div class="num">(共{{searchSongs.length}}首)</div>
                </div>
            
            </div>
            
            
        </div>
        <div class="list">
            <div class="playItem" v-for="(item,i) in searchSongs" :key="item.id" @click="setPlay(item,i)">
                <div class="left">
                    <div class="index">{{i+1}}</div>
                    <div class="content">
                        <div class="title">{{item.name}}</div>
                        <div class="author">
                            <span class="tag" v-for="(tag,index) in searchSongs.tags" :key="index">{{tag}}</span>
                            <!-- 作者 -->
                            <span>{{item.album.name}}</span>

                        </div>

                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true" @click="setPlay(item,i)">
                        <use xlink:href="#icon-24gf-playSquare"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-diandian"></use>
                    </svg>

                </div>
            </div>
        </div>
        
    </div>

        
    </div>
</template>

<script>
import {searchMusic} from '@/api/index.js'
import {mapState,mapMutations} from 'vuex'
import {ref,onBeforeMount,reactive, onUpdated} from 'vue'
import { useStore } from 'vuex'


// vue3实现
export default {
    setup(){
        let placeholder = ref('陈奕迅')
        let keywordList = ref([])
        let searchKeyword = ref('')
        // 搜索结果
        let searchSongs = ref([])

        async function saveKeyWord(){
            if(searchKeyword.value.trim() == ''){
                searchKeyword.value=''
            }else{
                keywordList.value.push(searchKeyword.value)
                // 去重
                keywordList.value = Array.from (new Set(keywordList.value))

                // 只保留前10个
                if(keywordList.value.length>10){
                     keywordList.value = keywordList.value.slice(keywordList.value.length-10,keywordList.value.length)
                }
                localStorage.keywordList = JSON.stringify(keywordList.value).trim()
                let result = await searchMusic(searchKeyword.value)
                searchSongs.value = result.data.result.songs  
            }   
        }
        // 删除历史记录
        function deleteKeyWord(){
            keywordList.value = []
        }
        function historySearch(keyword){
            searchKeyword.value = keyword
            saveKeyWord()
        }
        // 删除搜索列表
        function deleteList(){
            searchKeyword.value = ''
            searchSongs.value=[]
        }
        const store = useStore()
        function setPlay(item,i){
            item.al=item.album
            item.al.picUrl = item.album.artist.img1v1Url
            store.commit('pushPlaylist', item)
            store.commit('setPlayIndex', store.state.playlist.length-1) 
        }
        function setIndex(i){
            store.commit('setPlayIndex', i)
            if(store.state.paused == false){
                store.commit('setPaused', true)
            }
        }
        onBeforeMount(()=>{
           keywordList.value = localStorage.keywordList ? JSON.parse(localStorage.keywordList) : []
        })
        return{
            placeholder,keywordList,searchKeyword,searchSongs,
            saveKeyWord,deleteKeyWord,historySearch,deleteList,setPlay,setIndex
        }
    }
}



















// vue2实现
// export default {
//     data(){
//         return{
//             placeholder:'陈奕迅',
//             // 搜索历史
//             keywordList:[],
//             searchKeyword:'',
//             // 搜索结果
//             searchSongs:[]

//         }
//     },
//     updated() {
//         console.log(this.searchSongs);
//         console.log(this.$store.state.playlist);
        
//     },
//     methods:{
//         saveKeyWord:async function(){
//             if(this.searchKeyword.trim() == ''){
//                 this.searchKeyword=''

//             }else{
//                 this.keywordList.push(this.searchKeyword)
//                 // 去重
//                 this.keywordList = Array.from (new Set(this.keywordList))

//                 // 只保留前10个
//                 if(this.keywordList.length>10){
//                      this.keywordList = this.keywordList.slice(this.keywordList.length-10,this.keywordList.length)

//                 }
//                 localStorage.keywordList = JSON.stringify(this.keywordList).trim()
//                 let result = await searchMusic(this.searchKeyword)
//                 this.searchSongs = result.data.result.songs
//                 // console.log(this.searchSongs);

                
//             }
            
            
            
//         },
//         // 删除历史记录
//         deleteKeyWord(){
//             this.keywordList = []

//         },
//         historySearch(keyword){
//             this.searchKeyword = keyword
//             this.saveKeyWord()

//         },
//         // 删除歌曲列表
//         deleteList(){
//             this.searchKeyword = ''
//             this.searchSongs=[]
//         },
//         setPlay(item,i){
//             item.al=item.album
//             item.al.picUrl = item.album.artist.img1v1Url
//             this.$store.commit('pushPlaylist',item)
//             this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
//         },
//         ...mapMutations(['setPlayIndex','setPaused']),
//         setIndex(i){
//             console.log("1111111");
//             this.setPlayIndex(i)
//             if(this.paused == false){
//                 this.setPaused(true)
//             }
//         },
//     },
//     beforeMount() {
//         this.keywordList = localStorage.keywordList? JSON.parse(localStorage.keywordList) : []
//     },
// }
</script>

<style scoped lang="less">
.searchTop{
    width:7.5rem;
    padding: 0.2rem 0.4rem;
    
    .searchTopNav{
        display: flex;
        width: 100%;
        height: 1.2rem;
        align-items: center;
        position:fixed;
        top:0;
        left:0;
        padding: 0.2rem 0.4rem;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
        }
        .right{
            padding: 0 0.4rem;
            flex: 1;
            position: relative;
            input{
                border: none;
                outline:none;
                border-bottom: 1px solid #666;
                width: 100%;
                height: 0.5rem;
            }
            .icon{
                width: 0.3rem;
                height: 0.3rem;
                position: absolute;
                right:0.3rem;
                top:0.1rem;

            }
        }
    }
    .history{
        display: flex;
        margin-top:1.2rem;
        .historyLeft{
            width:1.1rem ; 
            height: 0.6rem;
            font-weight: 900;
            margin:0.2rem 0;
            line-height:0.6rem;
        }
        .historyRight{
            color: #666;
            display: flex;
            /* 自动换行 */
            flex-wrap:wrap;
            flex:1;
            position: relative;
            .keywordItem{
                background-color: #eee;
                height: 0.6rem;
                padding: 0 0.2rem;
                border-radius:0.4rem;
                line-height:0.6rem;
                margin:0.2rem 0.1rem;
            }
            .icon{
                weight:0.6rem;
                height:0.6rem;
                position: absolute;
                right: 0rem;
                top: 0.1rem;
            }
        }
    }

    .searchSongs{
        width: 7.5rem;
        height:cale(100vh - 1.2rem);
        
        /* padding:0 0.4rem ; */
        background-color: #fff;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        position: fixed;
        top:1.2rem;
        bottom:1.2rem;
        overflow: scroll;
        .searchSongs-top{
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
    


}



    
</style>