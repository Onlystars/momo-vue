import {request, requestWithoutToken, loginRequest} from '@/network/request'

// 获取验证码
export function getImageApi(){
    return requestWithoutToken({
        url: '/api/user/image',
        responseType: 'blob',
        method: 'get',
    })
}

// 登录
export function webLoginApi(data){
    return loginRequest({
        url: '/api/user/login',
        method: 'post',
        params: data
    })
}