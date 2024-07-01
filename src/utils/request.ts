import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

const serve: AxiosInstance = axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

serve.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const info =JSON.parse(localStorage.getItem('token') as string)
    const token = info?.token
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

serve.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export interface HttpData<T> {
  msg: string
  code: number
  data: T
}

const request = <T>(config:AxiosRequestConfig) => {
    const { method='get', data } = config;
    return serve.request<T,HttpData<T>>({
        ...config,
        [method.toLowerCase() === 'get'?'params':'data']:data

    })
}

export const get = <T>(url: string, data?: Object) => {
    return request<T>({
        url,
        method: 'get',
        data
    })
}

export  const post = <T>(url: string, data?: Object) => {
    return request<T>({
        url,
        method: 'post',
        data
    })
}

export const put = <T>(url: string, data?: Object) => {
    return request<T>({
        url,
        method: 'put',
        data
    })
}

export const del = <T>(url: string, data?: Object) => {
    return request<T>({
        url,
        method: 'delete',
        data
    })
}
export default request