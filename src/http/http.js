import axios from "axios";
import qs from "qs";

import { message } from "antd";

import conf from "../config"
import TokenManager from "./token_manager";


//开发环境 和 测试环境
let apiRootURL = conf.prod.apiRootURL;
if (process.env.NODE_ENV === 'development') {
    apiRootURL = conf.dev.apiRootURL;
}
const statusOk = "success"
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = apiRootURL;


// http request 拦截器
axios.interceptors.request.use(
    config => {  
        let accessToken = TokenManager.getTokens().accessToken;
        if(accessToken){
            config.headers.Authorization = accessToken
        }
        return config
    },
    error => {
        console.log("before axios request find error",error)
        return Promise.reject(error);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const statusCode = JSON.parse(JSON.stringify(error)).response.status
        // 后续需要更细的处理，token过期或者没有对应接口的权限
        if (statusCode === 401 || statusCode === 403) {
            TokenManager.clearAccessToken()
        }
        message.error(error.message)
        return Promise.reject(error);
    }
)

export default class Http {

    static handleResponse(res,resolve,reject) {
        const status = res.data.status
        if(status !== statusOk){
            message.error(res.data.errDesc);
            reject(res.data)
        }else{
            message.success("操作成功");
            resolve(res.data)
        }   
    }

    static get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then(res => {
                this.handleResponse(res,resolve,reject)
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
                this.handleResponse(res,resolve,reject)
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
                this.handleResponse(res,resolve,reject)
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
                this.handleResponse(res,resolve,reject)
            }).catch(err => {
                console.log("Http axios delete find error" + err)
                // reject(err)
            })
        })
    }
}
