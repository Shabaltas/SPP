const express = require('express');
const config = require('./config.json');
const cors = require('cors');
const db = require('./db/CommonDBUtils');
const auth = require("./auth");
const publicTasks = require('./routes/tasks/public.js');
const privateTasks = require('./routes/tasks/private.js');
const users = require('./routes/userRoutes');
const uri = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/test?retryWrites=true&w=majority`;

db.setUpConnection(uri, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    var app = express();
    //for spa
    app.use(cors({ origin: '*' }));
    var path = require('path');
    app.set('views', path.join(__dirname, 'views'));
    /*app.set('view engine', 'ejs');*/
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', users);
    app.use('/tasks', publicTasks);
    app.use(auth.isAuthorized);
    app.use('/tasks', privateTasks);
    app.listen(config.serverPort, function() {
        console.log(`Server is up and running on port ${config.serverPort}`);
    });

});