// 首页第二个轮播图（发现好歌单）组件
<template>
  <div class="musicList">
        <div class="musicList-top">
          <div class="title">发现好歌单</div>
          <div class="more">查看更多</div>
        </div>

        <div class="mlist" >
          <!-- 轮播组件 -->
          <swiper
          style="z-index:0"
            :slidesPerView="3.2"
            :spaceBetween="10"
            :pagination="{
              clickable: true,
            }"
            class="mySwiper"
          >
          
            <swiper-slide v-for="(item,i) in state.musicList" :key="i">
              <router-link :to="{path:'/listview',query:{id:item.id}}">
              <!-- 图片 -->
              <img :src="item.picUrl" :alt="item.name">
              <!-- 歌单简介 -->
              <div class="name">{{item.name}}</div>
              <div class="count">

                <!-- 播放图标 -->
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang1"></use>
                </svg>

                <!-- 播放量 -->
                <span> {{changValue(item.playCount)}}</span>
              </div>
            </router-link>
            </swiper-slide>
          
          </swiper> 
        </div>
  </div> 
</template>
<script>
    import { Navigation, Scrollbar, A11y } from 'swiper';
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/css";
    import {getMusicList} from '@/api/index.js'
    import {ref,reactive,onMounted} from 'vue'
    import store from '@/store/index.js'

// vue3 实现
  export default{
      components: {
        Swiper,
        SwiperSlide,
      },
        setup(){
        let state = reactive({musicList:[]});

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
        onMounted(async ()=>{
          let result =await getMusicList()
          state.musicList = result.data.result

          
        })
        return{
          state,
          changValue
        }
      }
  }
  








    // vue2 实现
  // export default {
  //   components: {
  //     Swiper,
  //     SwiperSlide,
  //   },
  //   data(){
  //     return{
  //       musicList:[]
  //     }
  //   },
  //   methods: {
  //     // 转换单位
  //     changValue(num){
  //       let res = 0
  //       if(num>=10000000){
  //         res =  num/10000000
  //         res = res.toFixed(2) + "亿"
  //       }else if(num>=10000){
  //         res =  num/10000
  //         res = res.toFixed(2) + "万"
  //       }
  //       return res
  //     }
  //   },

  //   // 调用 getMusicList 方法 获取获取歌单信息
  //   mounted:async function(){
  //     let result = await getMusicList()
  //     this.musicList = result.data.result
  //     console.log(result)
  //   },
  // };
  
</script>

<style lang="less" scoped>
  .musicList{
    .mlist{
      z-index:1;
    }
    
  }
  

.musicList{
    width: 7.5rem; 
    padding: 0 0.4rem;
    .musicList-top{
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: center;
        .title{
            font-size: 0.3rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            font-size: 0.24rem;
            height: 0.5rem;
            width: 1.2rem;
            text-align: center;
            line-height: 0.5rem;
        }
    }
    
}

.swiper {
    width: 100%;
    height: 3rem;
    display:block;
     
}  

.swiper-slide{
  /* background-color: orange; */
  display: flex;
  flex-direction: column;
  position: relative;
  img{
    width: 100%;
    height:auto;
    border-radius:0.1rem
  }
  .name{
    height: 0.6rem;
    width: 100%;
    font-size: 0.15rem;
    line-height: 0.3rem;
    color: #333;
  }
  .count{
    position: absolute;
    right: 0.03rem;
    top: 0.1rem;
    font-size: 0.2rem;
    color: #ccc;
    display: flex;
    align-items: center;
    .icon{
      fill: #ccc;
    }
    span{
      width: 1rem
    }
  }
}
</style>