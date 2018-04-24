import axios from 'axios'

const getAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL: baseURL,
    responseType: 'json',
  })

  client.interceptors.request.use((config) => {
    return config
  })

  client.interceptors.response.use((response) => {
    if (response.status === 401) {
      return Promise.reject(response)
    }
    return response
  })

  return client
}

const backends = {
  default: {
    client: getAxiosClient(`http${ __PROD__ ? 's' : '' }://${ __DOPS_SERVER_HOST__ }/20170516/api`),
  },
  searchEngine: {
    client: getAxiosClient(`http${ __PROD__ ? 's' : '' }://${ __ELASTIC_SERVER_HOST__ }/20170703/sengine`),
  },
}

export default backends
