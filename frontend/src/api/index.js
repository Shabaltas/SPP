import Axios from "axios";
import {endpoints} from '../config.json';

const Methods = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

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

    export const login = (data) => {
        return Axios.request({
            method: Methods.POST,
            url: `${endpoints.login}`,
            data: data
        });
    };

    export const registration = (data) => {
        return Axios.request({
            method: Methods.POST,
            url: `${endpoints.registration}`,
            data: data
        });
    };
