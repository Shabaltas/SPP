const {Task, Statuses} = require("../model/TaskSchema");
const mongoose = require("mongoose");

function formatTask (data) {
    return new Task({
        _id: mongoose.Types.ObjectId(data._id),
        title: data.title,
        description: data.description,
        dueToDate: data.dueToDate,
        status: data.status || Statuses.toDo,
        color: data.color || '#ffffff',
        attachments: data.attachments
    });
}

module.exports.allTasks = function () {
    return Task.find();
};

module.exports.getTask = function (id) {
    return Task.findById(id);
};

module.exports.createTask = function (data) {
    const newTask = formatTask(data);
    return newTask.save();
};

module.exports.deleteTask = function (id) {
    return Task.deleteOne({_id: id});
};

module.exports.findTask = function (id) {
    return Task.findById(id);
};

module.exports.updateTask = function (data) {
    const updatedTask = formatTask(data);
    return Task.findByIdAndUpdate(data._id, {$set: updatedTask});
};