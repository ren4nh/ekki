import axios from 'axios'
import { API_URL } from './config';

export default (method, url, params, auth, baseUrl) => {
  const body = method === 'get' ? 'params' : 'data'
  
  const config = {
    method,
    url,
    baseURL: baseUrl || API_URL,
    [body]: params || {}
  }

if (auth) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    }
  }
  
  return axios.request(config)
}