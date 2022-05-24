// 设置自适应屏幕宽度
function remSize(){
    // 获取根元素的宽度
    var diviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if(diviceWidth >= 750){
        diviceWidth = 750
    }
    if(diviceWidth <= 320){
        diviceWidth = 320
    }
    document.documentElement.style.fontSize = (diviceWidth/7.5) + 'px'
    // 设计稿是750px
    // 设置一半的宽度是375px
    // 1rem == 100px 的设计稿宽度
    // 表达一半的宽度就是3.75rem

    // 设置body里的字体大小
    document.querySelector('body').style.fontSize = 0.3 + "rem"
}

remSize()

// 当窗口发生变化时调用
window.onresize = function(){
    remSize()
}