import axios, { AxiosRequestConfig } from 'axios'

import config from '../config'

type AxiosRequestConfigCustom = AxiosRequestConfig & {
  crossdomain: boolean
}

export const PostRequest = (url: string, data?: Object) =>
  axios.request({
      method: 'post',
      url: `${config.BASE_URL}${url}`,
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(data),
  });

export const GetRequest = (url: string) =>
  axios.request({
    method: 'get',
    url: `${config.BASE_URL}${url}`,
    headers: {
      'Content-type': 'application/json',
    },
  });