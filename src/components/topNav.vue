// 首页头部导航
<template>
    <div class="topNav">
        <div class="topLeft">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
  
        <div class="topCenter">
          <span class="navBtn" @click="$router.push('/me')">我的</span>
          <span class="navBtn active">发现</span>
          <span class="navBtn">云村</span>
          <span class="navBtn">视频</span>
        </div>
  
        <div class="topRight">
          <svg class="icon search" aria-hidden="true" @click="$router.push('/searchview')">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
      </div>
</template>

<script>
export default {


}
</script>

<style lang="less" scoped>
    .topNav{
        width: 7.5rem;
        height: 1rem;
        /* 弹性盒模型 */
        display: flex;
        /* 均匀排列每个元素，首个元素放置于起点，末尾元素放置于终点 */
        justify-content: space-between;

        /* Flexible Box 布局模块的子属性 垂直居中 */
        align-items: center;

        padding:0 0.2rem;
    }

    .topNav.icon{
        width: 0.5rem;
        height: 0.5rem;
    }
    .topNav .search{
        width: 0.45rem;
        height: 0.45rem;
    }
    .topNav .topCenter{
        width: 4.5rem;
        display: flex;
        /* 均匀排列每个元素 每个元素周围分配相同的空间 */
        justify-content: space-around;
    }

    .topNav .topCenter .active{
        font-weight: 900;
    }

</style>