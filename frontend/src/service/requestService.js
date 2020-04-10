import Axios from 'axios';

const method = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete'
};

const sendRequest = (method, url, data) => {
    const Authorization = localStorage.getItem('Jwt token');
    const headers = {Authorization};
    return Axios.request({method, url, data, headers})
};

export const RestRequest = {
    get: (endpoint, data) => sendRequest(method.GET, endpoint, data),
    put: (endpoint, data) => sendRequest(method.PUT, endpoint, data),
    post: (endpoint, data) => sendRequest(method.POST, endpoint, data),
    delete: (endpoint, data) => sendRequest(method.DELETE, endpoint, data)
};