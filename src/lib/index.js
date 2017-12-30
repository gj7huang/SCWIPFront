import Axios from 'axios'

Axios.defaults.xsrfCookieName = 'csrftoken'

const axios = Axios.create({
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  },
  auth: {
    username: 'open159259',
    password: 'as112233'
  }
})

export {
  axios
}
