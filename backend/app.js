const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const cors = require('cors');
const taskDB = require("./db/TaskDBUtils");
const config = require('./config.json');
const users = require('./routes/userRoutes');
const Mongoose = require("mongoose");
const uri = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/test?retryWrites=true&w=majority`;

require('./db/CommonDBUtils').setUpConnection(uri, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    let app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/', users);
    let server = http.createServer(app);
    let io = socketIO(server);
    io.on('connection', (socket) => {
        console.log("Connected ");

        socket.on("tasks", (userId) => {
            console.log("get tasks");
            taskDB.allTasks(userId)
                .then(data => socket.emit('allTasks', {status: 200, data: data}))
                .catch(err => {
                    console.log(err);
                    socket.emit('serverError', {status: 500, message: "DB issue"})
                });
        });
        socket.on("updateTask", (data) => {
            console.log("update tasks");
            taskDB.updateTask(data)
                .then(data => {
                    if (data) {
                        socket.emit('updatedTasks', {status: 200, data: data});
                    } else {
                        socket.emit('clientError', {status: 422, message: 'No task with such id'});
                    }
                })
                .catch(err => {
                    console.log(err);
                    socket.emit('serverError', {status: 500, message: 'DB issue'});
                });
        });
        socket.on("deleteTask", (data) => {
            console.log("delete tasks");
            taskDB.deleteTask(Mongoose.Types.ObjectId(data._id))
                .then(data => {
                    if (data.n === 0) {
                        socket.emit('clientError', {status: 422, message: 'No task with such id'});
                    } else if (data.ok === 1) {
                        socket.emit('deletedTasks', {status: 200, data: data});
                    } else {
                        socket.emit('serverError', {status: 500, message: 'Task with such id wasn\'t deleted}'});
                    }
                })
                .catch(err => {
                    console.log(err);
                    socket.emit('serverError', {status: 500, msg: "DB issue"})
                });
        });
        socket.on("createTask", (data) => {
            console.log("create tasks", data);
            taskDB.createTask(data)
                .then(data => socket.emit('createdTasks', {status: 200, data: data}))
                .catch(err => {
                    console.log(err);
                    socket.emit('serverError', {status: 500, msg: "DB issue"})
                });
        });

        socket.on('disconnect', () => {
            console.log("Disconnected ")
        });
    });
    server.listen(config.serverPort, function () {
        console.log(__dirname);
        console.log(`Server is up and running on port ${config.serverPort}`);
    });

});