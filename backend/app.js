const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const cors = require('cors');

const config = require('./config.json');
const db = require('./db/CommonDBUtils');
const auth = require("./auth");
const publicTasks = require('./routes/tasks/public.js');
const privateTasks = require('./routes/tasks/private.js');
const users = require('./routes/userRoutes');
const uri = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/test?retryWrites=true&w=majority`;
//const publicPath = path.join(__dirname, '/../public');
db.setUpConnection(uri, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    let app = express();
    let server = http.createServer(app);
    let io = socketIO(server);

    io.on('connection', (socket) => {
        console.log("Connected ", socket);

        socket.on('login', (data) => {
            console.log("LOGIN ", data);
        });

        socket.on('disconnect', () => {
            console.log("Disconnected ", socket)
        });
    });
    app.use(cors({ origin: '*' }));
    //app.set('views', path.join(__dirname, 'views'));
    /*app.set('view engine', 'ejs');*/
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', users);
    app.use('/tasks', publicTasks);
    app.use(auth.isAuthorized);
    app.use('/tasks', privateTasks);
    server.listen(config.serverPort, function() {
        console.log(__dirname);
        console.log(`Server is up and running on port ${config.serverPort}`);
    });

});