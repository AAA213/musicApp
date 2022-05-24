// 对Vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

import { createStore } from 'vuex'
import api from '@/api/index.js'
export default createStore({
  // 数据
  state: {
    // 播放歌单
    playlist:[{
      name: '形容', id: 1336856864,
      tracks:[],
      al:{
        id: 78232124,
        name: "初遇",
        pic: 109951163957708690,
        picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        pic_str: "109951163957708692"
        }}],
    // 歌曲索引
    playCurrentIndex:0,
    // 播放状态
    paused:true,
    // 歌词
    lyric:'',
    // 当前的音乐时间
    currentTime:0,
    intervalId:0,
    //用户信息
    user:{
      // 是否登录
      isLogin:false,
      // 账户信息
      account:{},
      // 用户详细信息
      userDetail:{} 
    }
    
  },
  getters: {
    // lyric的计算属性，裁剪出时间信息和歌词
    lyricList:function(state){
      let arr = state.lyric.toString().split(/\n/igs).map((item,i,arr)=>{
          // 裁剪出分钟 parseInt取整
          let min = parseInt(item.slice(1,3))
          // 裁剪出秒
          let sec = parseInt(item.slice(4,6))
          // 裁剪出毫秒
          let mill = parseInt(item.slice(7,10))
          // 歌词
          let lyric = item.split(/\]/g)[1]

          return {
            // 分，秒，毫秒
            min,sec,mill,lyric,
            // 总时间
            time:mill+sec*1000+min*60*1000
          }
      })
      arr.forEach((item,i)=>{
          // 下一句歌词的时间 
          if(i == arr.length-1){
            item.pre = item.pre
          }else{
            item.pre = arr[i+1].time
          }
      })
      return arr

  }
  },
  // 操作数据
  mutations: {
    setPlaylist:function(state,value){
      state.playlist = value
    },
    // 从末尾添加一首歌
    pushPlaylist:function(state,value){
      state.playlist.push(value)
    },
    // 更改歌曲索引
    setPlayIndex:function(state,value){
      state.playCurrentIndex = value

      // 更改歌曲时要暂停播放
      state.paused = true
    },
    // 切换播放状态
    setPaused:function(state,value){
      state.paused = value
    },
    // 修改歌词
    setLyric(state,value){
      state.lyric = value
    },
    // 修改当前音乐时间
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  // 响应动作
  actions: {
    // 异步获取歌词数据 根据歌曲id
    async reqLyric(content,payload){
    let result =await api.getLyric(payload.id)
    content.commit('setLyric',result.data.lrc.lyric)
    },

    // 异步获取手机密码登录信息
    async phoneLogin(content,payload){
      let result =await api.phoneLogin(payload.phone,payload.password)
      // 登录成功，切换登录状态，获取用户信息
      if(result.data.code == 200){
        content.state.user.isLogin = true
        content.state.user.account = result.data.account
        console.log(result.data.account);

        // 获取用户详细信息
        let userDetail = await api.userDetail(result.data.account.id)
        content.state.user.userDetail = userDetail.data;
        // 保存到游览器
        localStorage.userData=JSON.stringify(content.state.user)

        content.commit('setUser',content.state.user)
        

    }
      return result

    },
     // 异步获取验证码登录信息
     async nodeLogin(content,payload){
      let result1 =await api.nodeLogin(payload.phone,payload.captcha)
      let result2 =await api.getNodeLogin(payload.phone,payload.captcha)
      // console.log(result);
      // 登录成功，切换登录状态，获取用户信息
      if(result1.data.code == 200){
        content.state.user.isLogin = true
        content.state.user.account = result2.data.account
        // console.log(result.data.account);

        // 获取用户详细信息
        let userDetail = await api.userDetail(result2.data.account.id)
        content.state.user.userDetail = userDetail.data;
        // 保存到游览器
        localStorage.userData=JSON.stringify(content.state.user)

        content.commit('setUser',content.state.user)
        

    }
      return result2

    }

    
  },
  modules: {
  }
})
