import socketIOClient from "socket.io-client";

let socket = socketIOClient("http://localhost:1234");

socket.on('connect', () => {
    console.log('connected');
});

socket.on('disconnect', () => {
    console.log('disconnected');
});

socket.on("response", (data) => {
    console.log('response');
    if (data.token) {
        localStorage.setItem('Jwt token', `${data.token}`);
    }
    document.location.reload();
});

export default socket;
