const express = require('express');
const router = express.Router();
const Mongoose = require("mongoose");
const {upload} = require("../upload");
const db = require('../../db/TaskDBUtils');

router.get('/', (req, res) => {
    db.allTasks()
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.writeHead(500, {message: 'DB issue'});
            res.end();
        });
});

router.get('/:id/:filename', (req, res) => {
    console.log("GOT FILE");
    res.setHeader("Content-Disposition", "attachment");
    res.sendFile(`public\\${req.params.id}\\${req.params.filename}`);
});

router.get('/:id', (req, res) => {
    db.getTask(Mongoose.Types.ObjectId(req.params.id))
        .then(data => {
            console.log(data);
            if (data){
                res.send(data)
            } else {
                res.writeHead(422, {message: 'No task with such id'});
                res.end();
            }
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {message: 'DB issue'});
            res.end();
        });
});

module.exports = router;