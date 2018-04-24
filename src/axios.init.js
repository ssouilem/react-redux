import axios from 'axios'
import { default as cookies } from 'UTILS/cookieHelper'

axios.defaults.baseURL = `https://${ __DOPS_SERVER_HOST__ }/20170516/api`
axios.defaults.withCredentials= true
export default function configureAxios (store) {
  axios.interceptors.request.use((config) => {
    let cookieValue = cookies.getToken()
    if (cookieValue) {
      config.headers.Authorization = cookieValue
    }
    return config
  })

  axios.interceptors.response.use((response) => {
    // if (response.headers && response.headers['authorization']) {
    //   cookies.saveToken(response.headers['authorization'])
    // }
    return response
  }, (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // cookies.logout()
      // window.location.replace(`//${ __DOPS_SERVER_HOST__ }/20170516/api/login`)
    }
    return Promise.reject(error)
  })
}
