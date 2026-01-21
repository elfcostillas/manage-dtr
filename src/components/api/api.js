import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api  = axios.create({
   
    // baseURL : 'http://172.17.56.65/support-group-api/'
    // baseURL : 'http://172.17.42.108/manage-dtr-api/'
    // baseURL : 'http://172.17.56.93/manage-dtr-api/'
    baseURL : 'http://172.17.57.201/manage-dtr-api/'
    // baseURL : 'http://172.17.56.111/manage-dtr-api/'
    // baseURL : 'http://localhost/manage-dtr-api/'
    
});

export default api;

//npm install --save axios vue-axios
