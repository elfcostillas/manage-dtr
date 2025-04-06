import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api  = axios.create({
   
    // baseURL : 'http://172.17.56.65/support-group-api/'
    baseURL : 'http://172.17.56.65/support-group-api/'
    
});

export default api;

//npm install --save axios vue-axios