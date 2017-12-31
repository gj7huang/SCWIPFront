import Axios from 'axios'

Axios.defaults.xsrfCookieName = 'csrftoken'

const axios = Axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: false,
  auth: {
    username: 'open159259',
    password: 'as112233'
  }
})

export {
  axios
}
