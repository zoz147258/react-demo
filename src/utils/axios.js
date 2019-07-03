
import axios from "axios";


// axios.defaults.baseURL = "0.0.0.0";  // 基本路径 


// 前端 数据请求  配置 header  添加 token  



let token = "";
// axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] = token;   // 请求头  token 空 
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
import { Toast } from 'antd-mobile';

const load = (msg)=>{
    Toast.loading(msg, 10, () => {
        console.log('Load complete !!!');
      });
}
const info = (msg)=>{
  if(msg){
    Toast.info(msg, 1);
  }else{
    Toast.success("加载成功",1);
  }
    
}
// axios 拦截器 
//  添加一个请求拦截器  request 
axios.interceptors.request.use(function (config) {
    let userInfo = window.sessionStorage.userInfo;
    if(userInfo){
        userInfo = JSON.parse(userInfo);
        token = userInfo.token;
    }
    // config.headers.common['token'] = token;
    Toast.hide();
    load("加载中");
    return config;
  }, function (error) {
    // Do something with request error
    info("未知错误-req");
    Toast.hide();
    return Promise.reject(error);
});


// 添加一个响应拦截器 response 
axios.interceptors.response.use(function (response) {
    console.log(response);

    Toast.hide();
    info(response.data.msg);
    if(response.data.code =="401"){
        router.push({name:'login'});
    }
    return response;
  }, function (error) {
    info("未知错误-res");
    Toast.hide();
    return Promise.reject(error);
  })

export default axios;