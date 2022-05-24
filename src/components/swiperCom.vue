
// 首页顶部轮播图组件
<template>
<div class="swiptdiv">
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="orangered">
  <van-swipe-item v-for="(item,i) in state.imgs" :key="i"><img :src="item.pic"></van-swipe-item>
  </van-swipe>
</div>

</template>

<script>
import {ref,reactive,onMounted} from 'vue'
import { Swipe, SwipeItem } from 'vant'
import axios from 'axios'
import {getBanner} from '@/api'

// vue3实现
export default {
    name: 'swiperCom',
    components:{
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
    },
    setup(props,context) {
      let state = reactive({imgs:[
          {pic:require('../assets/imgs/1.jpg')},
          {pic:require('../assets/imgs/2.jpg')},
          {pic:require('../assets/imgs/3.jpg')},
        ]});

        onMounted(async ()=>{
          let res =await getBanner(1)
          state.imgs = res.data.banners
        })
        return {
         state
        }
    },

}
</script>

<style>
.swiptdiv{
  width:7.1rem;
  margin:0 auto
}
  /* 设置圆角 */
  .my-swipe{
    border-radius: 0.1rem;
  }

 .my-swipe .van-swipe-item {
   height:2.7rem;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe img{
    width: 100%;
  }

</style>