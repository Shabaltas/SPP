import Axios from 'axios';

import {endpoints} from '../config.json';

const Methods = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

export default {
    /*listTasks() {
        console.log("HERE GET TASKS");
        return Axios.get(`${apiPrefixTasks}`);
    },
    getTask(id) {
        return Axios.get(`${apiPrefixTasks}/${id}`);
    },

    createTask(data) {
        return Axios.post(`${apiPrefixTasks}`, data);
    },

    updateTask(data) {
        return Axios.put(`${apiPrefixTasks}`, data);
    },

    deleteTask(data) {
        console.log(data);

        return Axios.delete(`${apiPrefixTasks}`, {data});
    },

    /!*uploadFile(file) {
        return Axios.post(`${apiPrefixUpload}`, file);
    },

    downloadFile(fileName) {
        return Axios.get(`${apiPrefixUpload}/${fileName}`);
    },*!/

    deleteFile(data) {
        return Axios.delete(`${apiPrefixTasks}/file`, {data});
    },*/

    login(data) {
        const Authorization = localStorage.getItem('Jwt token');
        return Axios.request({
            method: Methods.POST,
            url: `${endpoints.login}`,
            data: data,
            headers: {Authorization}
        });
    },

    registration(data) {
        const Authorization = localStorage.getItem('Jwt token');
        return Axios.request({
            method: Methods.POST,
            url: `${endpoints.registration}`,
            data: data,
            headers: {Authorization}
        });
    }
}
