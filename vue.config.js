
// 这行放在头部
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
 
 
css: {
        extract: IS_PROD,
        requireModuleExtension=true,// 去掉文件名中的 .module,修改为false会导致vant-ui样式出不来
        loaderOptions={
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                // `globalVars` 定义全局对象，可加入全局变量
                globalVars: {
 
                }
            }
        }
    }


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  pages:{
      index:{
          entry:'src/main.js',
          title:"老刘音乐"
      }
  }
},)

