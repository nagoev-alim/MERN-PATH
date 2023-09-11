import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * @description - Axios instance
 * @type {axios.AxiosInstance}
 */
const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});


const setAuthHeader = token => {
  if (token) {
    AXIOS.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete AXIOS.defaults.headers.common.Authorization;
  }
};

const handleTokenExpiration = async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = Cookies.get('refreshToken');
    console.log(refreshToken);
    const { data: { data: { token } } } = await AXIOS.post('/users/refresh', { refreshToken });
    Cookies.set('token', token);
    setAuthHeader(token);
    return AXIOS(originalRequest);
  }
  return Promise.reject(error);
};

AXIOS.interceptors.request.use(config => {
  const token = Cookies.get('token');
  setAuthHeader(token);
  return config;
});

AXIOS.interceptors.response.use(response => response, handleTokenExpiration);

export default AXIOS;
