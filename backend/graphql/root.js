const taskDB = require("../db/TaskDBUtils");
const {GraphQLUpload} = require('graphql-upload');
const Mongoose = require("mongoose");

const root = {
    FileUpload: GraphQLUpload,
    Date: Date,
    tasks: ({userId}) => {
        console.log(userId);
        return taskDB.allTasks(Mongoose.Types.ObjectId(userId))
            .then(data => data)
            .catch(err => err)
    },
    oneTask: ({_id}) => {
        return taskDB.getTask(Mongoose.Types.ObjectId(_id))
            .then(data => data)
            .catch(err => err)
    },
    createTask: (args) => {
        //TODO add attachments
        return taskDB.createTask(args)
            .then(data => data)
            .catch(err => err)
    },
    updateTask: (args) => {
        //TODO update attachments
        return taskDB.updateTask(args)
            .then(data => data)
            .catch(err => err)
    },
    deleteTask: ({_id}) => {
        //TODO delete attachments
        return taskDB.deleteTask(Mongoose.Types.ObjectId(_id))
            .then(data => data.ok)
            .catch(err => err)
    }
};

module.exports = root;