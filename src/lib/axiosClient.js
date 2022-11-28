const axios = require('axios');

const axiosConfig = axios.create({
  baseURL: 'https://api.iranhostserver.ir/',
});
// axiosConfig.defaults.headers.post["Authorization"] = `Bearer+${s}`; // for GET requests

export default axiosConfig;
