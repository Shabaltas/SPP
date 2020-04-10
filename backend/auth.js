const config = require('./config.json');
const jwt = require('jsonwebtoken');
module.exports.isAuthorized = (request, response, next) => {
    let token = request.headers.authorization;
    console.log(token);
    if (!token) {
        response.sendStatus(403);
        return;
    }
    try {
        jwt.verify(token, config.auth.secretKey);
    } catch (e) {
        console.log(e);
        response.status(403).send({
            message: 'Bad token.'
        });
        return;
    }
    return next();
};
