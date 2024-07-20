
import axios from 'axios';
import storageService from './StorageService';

const baseURL = 'https://localhost:3000/';
//  const baseURL = '/';

const axiosInstance = axios.create({
  baseURL: baseURL + 'api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = storageService.getItem('authToken');
    if (token) config.headers.authorization = token;

    return config;
  });


export default axiosInstance;
export { baseURL };