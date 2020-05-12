const http = require('http');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const users = require('./routes/userRoutes');
const root = require('./graphql/root');
const schema = require('./graphql/schema');
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
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
    let server = http.createServer(app);

    server.listen(config.serverPort, function () {
        console.log(__dirname);
        console.log(`Server is up and running on port ${config.serverPort}`);
    });

});