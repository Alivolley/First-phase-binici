import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dev.iranhostserver.ir/',
});

// axiosConfig.defaults.headers.post["Authorization"] = `Bearer+${s}`; // for GET requests

export default axiosClient;
