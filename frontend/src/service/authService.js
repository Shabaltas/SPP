import api from "../api";
const jwt_decode = require("jwt-decode");

const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('Jwt token', `${response.data.token}`);
    }
    return response;
};

const getUserFromStorage = () => {
    let token = localStorage.getItem('Jwt token');
    if (!token) return null;
    let data = jwt_decode(token);
    return {
        name: data.name,
        surname: data.surname,
        email: data.email
    };
};

const registration = (name, surname, email, password) =>
    api.registration({name: name, surname: surname, email: email, password: password})
        .then(afterLogin);

const login = (email, password) =>
    api.login({email: email, password: password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('Jwt token');
};

export default {
    login,
    getUserFromStorage,
    registration,
    logout
}

