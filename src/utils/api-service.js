import axios from 'axios';
// import { AppConfig } from './app-config';

//** For local env development */
axios.defaults.baseURL = 'http://10.43.12.188:3001';

//** For production */
// axios.defaults.baseURL = AppConfig.serverUrl;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.headers = {
    'content-type': 'application/json',
};

const create = (url, data, config) => {
    return axios.post(`${url}`, data, config);
};

const remove = (url, config) => {
    return axios.delete(`${url}`, config);
};

const update = (url, data, config) => {
    return axios.patch(`${url}`, data, config);
};

const put = (url, data, config) => {
    return axios.put(`${url}`, data, config);
};

const get = (url, config) => {
    return axios.get(`${url}`, config);
};

const ApiServices = {
    get,
    post: create,
    patch: update,
    delete: remove,
    put,
};

export default ApiServices;
