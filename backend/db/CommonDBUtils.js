const mongoose = require("mongoose");

module.exports.setUpConnection = function (uri, cb) {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, cb)
};