const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema( {
    name: {type: String, required: true},
    surname: {type: String},
    email: {type: String, required: true},
    password: {type: String}
});

module.exports.User = mongoose.model('User', UserSchema);
