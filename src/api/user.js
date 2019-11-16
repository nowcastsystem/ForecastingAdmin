import request from '@/utils/request'
import store from '@/store'

export function login(data) {
  return request({
    url: '/dev-api/user/login',
    // baseURL: 'http://localhost:8010',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/dev-api/user/info',
    method: 'get',
    authorization: token,
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/dev-api/user/logout',
    method: 'post'
  })
}

export function sendAnalyzeRequest(token) {
  const username = store.getters.username
  return request({
    url: '/dev-api/testpredict',
    method: 'get',
    params: {username}
    // baseURL: 'http://localhost:8010',
    // authorization: token,
    // params: { token }
  })
}

export function sendAnalyzeOnDateRequest(token, fromDate, toDate) {
  return request({
    url: '/dev-api/predictOnDate',
    method: 'get',
    // baseURL: 'http://localhost:8010',
    authorization: token,
    params: { token, fromDate, toDate }
  })
}
