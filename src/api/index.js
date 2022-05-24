// 接口，通过ajax请求获取到后端数据

import axios from 'axios'

let baseUrl = 'http://localhost:3000'
// let baseUrl = 'https://neteasecloudmusicapi.vercel.app/#/'
// 获取轮播图的api
// type:资源类型,对应以下类型,默认为 0 即 PC
// 0: pc  1: android  2: iphone  3: ipad
export function getBanner(type=1){
    return axios.get(`${baseUrl}/banner?type=${type}`)
}

// 获取推荐歌单   limit 取出数量，默认10
export function getMusicList(limit=10){
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

// 获取歌单详情
export function getPlaylistDetail(id){
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}


// 获取歌词
export function getLyric(id){
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}


// 获取搜索结果
export function searchMusic(keyword){
    return axios.get(`${baseUrl}/search?keywords=${keyword}`)
}

// 手机密码登录
export function phoneLogin(phone,password){
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`)
}
// 发送验证码
export function nodePlay(phone){
    return axios.get(`${baseUrl}/captcha/sent?phone=${phone}`)
}
// 验证验证码
export function nodeLogin(phone,captcha){
    return axios.get(`${baseUrl}/captcha/verify?phone=${phone}&captcha=${captcha}`)
}
// 获取用户基本信息
export function getNodeLogin(phone,captcha){
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&captcha=${captcha}`)
}
// 获取用户详情
export function userDetail(uid){
    return axios.get(`${baseUrl}/user/detail?uid=${uid}`)
}


export default {
    getBanner,getMusicList,getPlaylistDetail,getLyric,searchMusic,phoneLogin,userDetail,nodePlay,nodeLogin,getNodeLogin
}