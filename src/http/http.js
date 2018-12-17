import axios from "axios";
import qs from "qs";

import { message } from "antd";

import conf from "../config"
import LocalStorage from "./localStorage";
import TokenManager from "./token";


let storage = new LocalStorage(window.localStorage)
let tokenManager = new TokenManager(storage)
//开发环境 和 测试环境
let apiRootURL = conf.prod.apiRootURL;
if (process.env.NODE_ENV === 'development') {
    apiRootURL = conf.dev.apiRootURL;
}

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = apiRootURL;


// http request 拦截器
axios.interceptors.request.use(
    config => {  
        //在发送请求之前做什么
        let accessToken = tokenManager.getTokens().accessToken;
        if(accessToken){
            config.headers.Authorization = `bearer ${accessToken}`
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        console.log("before axios request find error" + error)
        return Promise.reject(error);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log("before axios response find error" + error)
        message.error(error.message)
        return Promise.reject(error);
    }
)

export default class Http {
    static get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then(res => {
                if(res.data.status!=="success"){
                    message.error(res.data.errDesc);
                    reject(res.data)
                }else{
                    resolve(res.data)
                }   
            }).catch(err => {
                console.log("Http axios get find error" + err)
                message.error(err.message)
                // reject(err)
            })
        })
    }

    static post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            ).then(res => {
                if(res.data.status!=="success"){
                    message.error(res.data.errDesc);
                    reject(res.data)
                }else{
                    resolve(res.data)
                }   
            }).catch(err => {
                console.log("Http axios post find error" + err)
                // reject(err)
            })
        })
    }

    static postJson(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, JSON.stringify(params), {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(res => {
                if(res.data.status!=="success"){
                    message.error(res.data.errDesc);
                    reject(res.data)
                }else{
                    resolve(res.data)
                }     
            })
            .catch(err => {
                console.log("Http axios postJson find error" + err)
                // reject(err)
            })
        })
    }

    static delete(url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params
            }).then(res => {
                if(res.data.status!=="success"){
                    message.error(res.data.errDesc);
                    reject(res.data)
                }else{
                    resolve(res.data)
                }   
            }).catch(err => {
                console.log("Http axios delete find error" + err)
                // reject(err)
            })
        })
    }
}
