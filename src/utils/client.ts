import axios from 'axios'

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'localhost:5505',
  timeout: 15000,
  transformResponse: [
    function (data) {
      console.log(data)

      return data
    },
  ],
})

client.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export { client }
