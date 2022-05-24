<template>
  <div>
    <router-view/>
    <play-controller></play-controller>
  </div>
</template>

<script>
import playController from '@/components/playController'
import {onMounted} from 'vue'
import { useStore } from 'vuex'
export default {
  components:{playController},
  setup() {
    onMounted(()=>{
      // 获取游览器中存储的用户信息
      let userData = localStorage.userData ? JSON.parse(localStorage.userData) : {}
      // 等价于 this.$store
      const store = useStore()
      store.commit('setUser', userData)

    })
    
  }












  
  // mounted() {
  //   // 获取游览器中存储的用户信息

  //   let userData = localStorage.userData ? JSON.parse(localStorage.userData) : {}
    
  //   this.$store.commit('setUser', userData)
  // },
}
</script>

<style lang="less">
*{
  margin:0;
  padding:0;
  // 使设定的宽度算上边框和内边距
  box-sizing:border-box;
  font-family:'微软雅黑'
}

.icon{
  // 设置图标大小 虽然是字体，但是不能用 font-size，要用宽度
  width:0.3rem;
  height:0.3rem;
}
</style>
