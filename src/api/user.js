import { request } from '@/utils/libs/api.request'

export const login = (params) => {
  return request({
    url: '/api-sso/api/v1/login',
    params,
    method: 'get'
  })
}

export const getUserInfo = (params, isDebounce) => {
  return request({
    url: '/api-vip/api/user/get',
    params,
    method: 'get',
    isDebounce
  })
}

export const getJurisdiction = (params) => {
  return request({
    url: '/api-sso/api/v1/getIndexMenuAndButton',
    params,
    method: 'get'
  })
}
export const logout = (params) => {
  return request({
    params
  })
}
