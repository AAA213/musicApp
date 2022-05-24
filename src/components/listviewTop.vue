<!-- 歌单详情的头部组件 -->
<template>
    <div class='listviewTop'>
        <!-- 背景图片 -->
        <img class="bg" :src="playlist.coverImgUrl" alt="">
        <div class="listviewTopNav">
            <div class="back" @click="$router.go(-1)">

                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="title">
                    歌单
                </div>
            </div>

            <div class="right">

                <svg class="icon search" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-diandian"></use>
                </svg>

            </div>
        </div>
        <div class="content">
            <div class="contentLeft">

                <img :src="playlist.coverImgUrl" alt="">

                <div class="count">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span> {{changValue(playlist.playCount)}}</span>
            </div>
            </div>

            <div class="contentRight">
                <h3>{{playlist.name}}</h3>
                <div class="author">
                    <img class="header" :src="playlist.creator.avatarUrl">
                    <span>{{playlist.creator.nickname}}</span>
                </div>
                <div class="description">
                    {{playlist.description}}
                </div>
            </div>
        </div>
        <!-- 图标列表 -->
        <div class="iconList">
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liaotian"></use>
                </svg>
                <!-- 评论数量 -->
                <span>{{playlist.commentCount}}</span>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{playlist.shareCount}}</span>

            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span>下载</span>

            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
                </svg>
                <span>多选</span>

            </div>
        </div>
    </div>
</template>

<script>

// vue3实现
export default {
    props:['playlist'],
    setup(){
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
        return {changValue}
    }
}


















// vue2实现
// export default {
//     name: 'listviewTop',
//     props:['playlist'],
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
//         }
//     },
// }
</script>

<style scoped lang="less">
    .listviewTop{
        width: 7.5rem;
        padding: 0 0.4rem;
        // height: 6rem;
        .bg{
            position: fixed;
            left:0;
            top:0;
            width:7.5rem;
            /* 高度自动 */
            height:auto;
            /* 降低层级 */
            z-index:-1;
            /* 设置滤镜 */
            filter:blur(40px)

            
        }
        .listviewTopNav{
            display: flex;
            justify-content:space-between;
            /* 上下居中 */
            align-items:center;
            height:1.2rem;
            font-size:0.35rem;
            .icon{
                width: 0.5rem;
                height: 0.4rem;
                fill:#fff
            }
            .title{
                margin-left: 0.4rem;
            }
            .search{
                margin-right: 0.5rem;
            }

            
        }
        .back,.right{
            display: flex;
            color: #fff;
        }
        .content{
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            .contentLeft{
                position: relative;
                img{
                    width: 2.8rem;
                    height: 2.8rem;
                    border-radius: 0.1rem;
                }
                .count{
                    position: absolute;
                    right: 0.03rem;
                    top: 0.1rem;
                    font-size: 0.2rem;
                    color: #aaa;
                    display: flex;
                    align-items: center;
                    font-weight: 900;
                    .icon{
                    fill: #ccc;
                    }
                    span{
                    width: 1rem
                    }
                }
            }
            .contentRight{
                width: 3.5rem;
                h3{
                    color: #fff;
                }
                .author{
                    display: flex;
                    align-items:center;
                    margin:0.2rem 0;
                    img.header{
                        width: 0.6rem;
                        height: 0.6rem;
                        border-radius: 0.3rem;
                        margin-right:0.2rem
                    }
                    span{
                        color: #ccc;
                        font-size: 0.26rem;
                    }

                }
                .description{
                    font-size: 0.24rem;
                    color: #ccc;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                

            }
        }
        .iconList{
            display: flex;
            justify-content: space-around;
            .iconItem{
                display: flex;
                flex-direction:column;
                align-items:center;
                .icon{
                    width: 0.55rem;
                    height: 0.55rem;
                    fill:#fff
                }
                span{
                    font-size: 0.28rem;
                    padding-top: 0.3rem;
                    color: #fff;
                }

            }

        }
        
        
    }

</style>