const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TaskSchema = new Schema( {
    title: {type: String, required: true},
    description: String,
    creationDate: {type: Date, default: Date.now },
    dueToDate: Date,
    status: {type: Number/*, required: true*/},
    color: String,
    attachments: Array
});
module.exports.Statuses = Object.freeze({
    "toDo": 1, "inProgress": 2, "done": 3});
module.exports.Task = mongoose.model('Task', TaskSchema);