// 首页中间四图标组件
<template>
    <div class='iconList'>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fanjutuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-diantai"></use>
            </svg>
            <span>私人FM</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
        
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .iconList{
        display: flex;
        justify-content: space-between;
        padding: 0.4rem;
    }
    .iconList .iconItem{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .iconList .icon{
        width: 1.2rem;
        height: 1.2rem;
    }
    .iconList span{
        font-size: 0.23rem;
    }

</style>