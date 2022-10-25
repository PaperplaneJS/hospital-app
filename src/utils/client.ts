import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

client.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

client.interceptors.response.use(
  function (response) {
    return response?.data?.data || null
  },
  function (error) {
    return error?.data || {}
  }
)

export { client }
