import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-100-27-2-255.compute-1.amazonaws.com/api'
});

export default api;