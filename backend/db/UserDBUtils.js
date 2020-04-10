const {User} = require("../model/UserSchema");

function formatUser(data) {
    return new User({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
    });
}

module.exports.allUsers = function () {
    return User.find();
};

module.exports.createUser = function (data) {
    return formatUser(data).save();
};

module.exports.deleteUser = function (id) {
    return User.findById(id).remove();
};

module.exports.findUser = function (data) {
    console.log(data);
    return User.findOne(data);
};

module.exports.updateUser = function (id, data) {
    return User.findByIdAndUpdate(id, formatUser(data));
};
