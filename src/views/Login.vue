// 登录组件
<template>
    <div class="login-bg">
        <div class="back" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
        </div>
        <div class="login-contain">
            
            <div class="login-header">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wangyiyunyinle-"></use>
                </svg>
                <!-- <p>欢迎登录</p> -->
            </div>
            <div class="form-group">
                <div class="form-item">
                    <label for="username">
                        <img src="../assets/imgs/user.png">
                    </label>
                    <input v-model="phone" id="username" type="text" placeholder="请输入手机号" autocomplete="off">
                </div>
                <div class="form-item">
                    <label for="password">
                        <img src="../assets/imgs/password.png" alt="">
                    </label>
                    <input v-show="loginType == 0" v-model="password" id="password" type="password" placeholder="请输入密码" autocomplete="off">
                    <input v-show="loginType == 1" v-model="captcha" id="password" type="password" placeholder="请输入验证码" autocomplete="off">
                    <button v-show="loginType == 1"  @click="playNode()">发送验证码</button>
                </div>
            </div>

            <div class="button-group">
                <button class="login-btn" id="doLogin" @click="loginEvent()">登录</button>
            </div>
        
            <div class="order-login">
                <p class="order-login-line">其他登录方式</p>
                <div class="order-login-box">
                    <div v-show="loginType != 0" @click="loginType = 0">
                        <a href="#">
                            <svg class="icon" aria-hidden="true" style="width: 45px;height: 45px;">
                                <use xlink:href="#icon-mima"></use>
                            </svg>
                            <p>手机密码登录</p>
                        </a>
                    </div>
                    <div v-show="loginType != 1">
                        <a href="#" @click="loginType = 1">
                            <svg class="icon" aria-hidden="true" style="width: 45px;height: 45px;">
                                <use xlink:href="#icon-duanxin"></use>
                            </svg>
                            <p>短信登录</p>
                        </a>
                    </div>
                    <div>
                        <a href="#">
                            <img src="../assets/imgs/wechat-login.png" alt="" style="width: 45px;height: 45px;fill:#ffffff">
                            <p>微信登录</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {nodePlay,nodeLogin} from '@/api/index.js'
    import {ref,reactive} from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from "vue-router";

    // vue3实现
    export default {
        setup(){
            let phone = ref('')
            let password = ref('')
            // 登录方式：0是手机密码登录；1是验证码登录
            let loginType = ref(0)
            // 验证码
            let captcha = ref('')
            const store = useStore()
            const router = useRouter();
            async function loginEvent(){
                 // 手机密码登录
                if(loginType.value == 0){
                    let result = await store.dispatch('phoneLogin',{phone:phone.value,password:password.value})
                    if(result.data.code == 200){
                        router.push('/me')
                    }

                // 短信验证码登录
                }else if(loginType.value == 1){
                    console.log(phone.value,captcha.value);
                    let result = await store.dispatch('nodeLogin',{phone:phone.value,captcha:captcha.value})
                    console.log(result);
                    if(result.data.code == 200){
                        router.push('/me')
                    }
                }
            }
            function playNode(){
                nodePlay(phone.value)
            }
            return{
                phone,password,loginType,captcha,loginEvent,playNode
            }
        }
    }
















    //vue2实现 
    // export default {
    //     data(){
    //         return{
    //             phone:'',
    //             password:'',
    //             // 登录方式：0是手机密码登录；1是验证码登录
    //             loginType:0,
    //             // 验证码
    //             captcha:''
    //         }
    //     },
    //     methods: {
    //         loginEvent:async function(){
    //             // 手机密码登录
    //             if(this.loginType == 0){
    //                 let result = await this.$store.dispatch('phoneLogin',{phone:this.phone,password:this.password})
    //                 if(result.data.code == 200){
    //                     this.$router.push('/me')
    //                 }

    //             // 短信验证码登录
    //             }else if(this.loginType == 1){
    //                 console.log(this.phone,this.captcha);
    //                 let result = await this.$store.dispatch('nodeLogin',{phone:this.phone,captcha:this.captcha})
    //                 console.log(result);
    //                 if(result.data.code == 200){
    //                     this.$router.push('/me')
    //                 }
    //             }
    //         },
    //         // 发送验证码
    //         playNode(){
    //             nodePlay(this.phone)
    //         }
            

    //     },
        

    // }
</script>

<style scoped lang="less">

    .form-item{
        button{
            width: 1.8rem !important;
            height: 0.6rem !important;
            border:1px solid #ffffff !important;
            background-color: #fff !important;
            color: black !important;
            Border-radius:0.4rem !important;
            margin-top: 0.1rem !important;
            
        }
    }
    .login-bg{
        .back{
            .icon{
                margin: 0.2rem;
                width: 0.6rem;
                height: 0.6rem;
                fill:#fff;
            }
        }
    }
    .login-contain{
        .icon{
            width: 8rem;
            height: 2rem;
        }
    }


a, li {
    list-style: none;
}
a {
    text-decoration: none;
    color: black;
}
.login-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left:0;
    top:0;
    z-index:1000;
    background: orangered;
    color: #ffffff;
    background-size: 100% 100%;
}
.login-contain {
    margin: 0 auto;
}
.login-header {
    padding: 5%;
    position: relative;
}
.login-header{
    padding-top: 2rem;
    .icon{
        position: absolute;
        width: 4rem;
        height: 4rem;
        left: 1.7rem;
        top: -0.5rem;
    
    }
}
.login-header p {
    
    font-size: 0.3rem;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 0.1em 0.15em 0.1em #74C3CA
}
.login-logo {
    padding: 5%;
}
.login-logo img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}
.login-logo p {
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    letter-spacing: 2px;
    margin-top: 2%;
}
.form-group {
    padding: 5%;
}
.form-group .form-item {
    margin-top: 5%;
    padding:0 10px;
    border-radius: 20px;
    background-color: rgba(0,0,0,0.1);
}
.form-group .form-item input {
    outline: none;
    border: 0;
    background-color: transparent !important;
    color: #ffffff;
    height: 40px;
    font-size: 18px;
    width: 55%;
    margin-left: 12%;
    /* 设置谷歌默认填充颜色 */
    box-shadow: 0 0 0px 1000px #E53E00 inset !important; 
    /* text-fill-color: white; */
    -webkit-text-fill-color: white;
}
.form-group .form-item input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item label img {
    width: 25px;
    position: absolute;
    margin-top: 5px;
}
.form-group .form-item button {
    outline: none;
    background: transparent;
    border: 1px #00cc99 dashed;
    color: #ffffff;
    height: 30px;
    border-radius: 5px;
    float: right;
    padding: 1%;
}
.button-group {
    padding: 5%;
}
.button-group button {
    outline: none;
    border: 0;
    width: 90%;
    height: 35px;
    margin-top: 4%;
    border-radius: 20px;
    margin-left: 4%;
    color: #ffffff;
    font-size: 18px;
}
.button-group .login-btn {
    background-color: #ffffff;
    color: #74C3CA;
}

.order-login {
    padding: 5%;
}
.order-login-line {
    display: block;
    position: relative;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
}
.order-login-line:before,
.order-login-line:after {
    content: '';
    position: absolute;
    top: 50%;
    background: #ffffff;
    width: 20%;
    height: 1px;
}
.order-login-line:before {
    left: 10%;
}
.order-login-line:after {
    right: 10%;
}
.order-login-box {
    display: flex;
    width: 100%;
    justify-content:center;
    margin-top: 20px;
}
.order-login-box div{
    flex: 1;
    text-align: center;
}
.order-login-box div p{
    text-align: center;
    font-size: 14px;
    color: #ffffff;
}

</style>