import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: 'https://xagateway.suntekcorps.com:8443/performance',
  timeout: 600000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJwb3NpdGlvbklkIjoxMDk1ODMsInJvbGVJZCI6MywiZGVwYXJ0bWVudElkIjozODQzNywibmFtZSI6IiVFNSVBRCU5OSVFNSVBRSU4NyVFOCVCRCVBOSIsImV4cCI6MTY3NTc3NTU0MSwidXNlcklkIjo3MTk2LCJqdGkiOiI3MmZlZDgwNzc2MzM0NjMwOWY5YmQ4Y2EwYTRhNTYzZCIsInVjSWQiOjEwMzAsInVzZXJuYW1lIjoiU1RHRjAyMTgifQ.tcldn8_Nrrh7CFyKiexyhVNBp6jIsWQ3J-8wXOfIIUMVqZg6jRGqzozmqrHi2XHw8OTSHGn2UqayCQOOReNhZA`
    config.headers['systemCode'] = 49
    config.headers['Content-Type'] = 'application/json'
    config['show_message'] = !(config.data && config.data.not_show_message)
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code === 200) {
       if (response.config.method === 'post') {
        // 屏蔽message
        if (response.config.show_message) {
          Message({
            message: response.data.message,
            type: 'success',
            duration: 5 * 1000
          })
        }
      }
      return response.data
    } else {
      if (res.message.indexOf('token不可用') > -1) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
      } else {
        if (response.config.show_message) {
          Message({
            message: res.message,
            type: 'error',
            duration: 5000
          })
        }
      }
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
  }
)

export default service
