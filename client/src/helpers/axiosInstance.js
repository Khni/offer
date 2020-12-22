import axios from "axios";


//https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/
//https://blog.liplex.de/improve-security-when-working-with-jwt-and-symfony/
export default (history, token, refreshToken, refreshTokenFunc) => {
  //const baseURL = process.env.REACT_APP_BACKEND_URL;


/*  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }*/

  const axiosInstance = axios.create();
  
  // Add a request interceptor
axiosInstance.interceptors.request.use(
   config => {
       
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
       // config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       Promise.reject(error)
   });

  //Add a response interceptor

axiosInstance.interceptors.response.use((response) => {
   return response
}, function (error) {
   const originalRequest = error.config;

  /* if (error.response.status === 401 && originalRequest.url === 
'http://13.232.130.60:8081/v1/auth/token) {
       router.push('/login');
       return Promise.reject(error);
   }*/

   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
       const refreshToken = localStorageService.getRefreshToken();
       return axios.post('/api/user/refreshToken',
           {
            token
           })
           .then(res => {
               if (res.status === 201) {
                  // localStorageService.setToken(res.data);
                  refreshTokenFunc(res.data.token, res.data.refreshToken) 
                   axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
                   return axios(originalRequest);
               }
           })
   }
   return Promise.reject(error);
});

  return axiosInstance;
};