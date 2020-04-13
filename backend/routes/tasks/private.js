const express = require('express');
const router = express.Router();
const Mongoose = require("mongoose");
const {upload} = require("../upload");
const db = require('../../db/TaskDBUtils');
const fs = require('fs-extra');

router.post('/create', upload.array('file'), (req, res) => {
    var data = req.body;
    data.attachments = data.attachments.split(',').filter(filename => filename.length > 0);
    db.createTask(data)
        .then(data => {
            const dir = 'public/' + data._id;
            /* if (!fs.existsSync(dir))
                 fs.mkdir(dir, (err) => {console.log(err)});*/
            fs.copySync('public/temp', dir);
            fs.remove('public/temp', (err) => {console.log(err)});
            res.send(data)
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {message: 'DB issue'});
            res.end();
        });
});

router.post('/:id', (req, res) => {
    console.log("UPDATE IT");
    db.updateTask( req.body)
        .then(data => {
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

router.put('/', (req, res) => {
    console.log("UPDATE IT");
    console.log(req.body);
    db.updateTask( req.body)
        .then(data => {
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

router.delete('/file', (req, res) => {
    fs.remove(`public${req.body.filepath}`, (err) => {
        if (err) {
            console.log(err);
            res.writeHead(500, {message: `File ${req.body.filename} wasn\'t deleted}`});
            res.end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/', (req, res) => {
    fs.remove(`public\\${req.body._id}\\`, (err) => {console.log(err)});
    db.deleteTask(Mongoose.Types.ObjectId(req.body._id))
        .then(data => {
            if (data.n === 0) {
                res.writeHead(422, {message: 'No task with such id'});
                res.end();
            } else if (data.ok === 1) {
                res.status(200).end();
            } else {
                res.writeHead(500, {message: 'Task with such id wasn\'t deleted}'});
                res.end();
            }

        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, {message: 'DB issue'});
            res.end();
        });
});

router.delete('/:id', (req, res) => {
    db.deleteTask(Mongoose.Types.ObjectId(req.params.id))
        .then(data => {
            if (data.n === 0) {
                res.writeHead(422, {message: 'No task with such id'});
                res.end();
            } else if (data.ok === 1) {
                res.status(200).end();
            } else {
                res.writeHead(500, {message: 'Task with such id wasn\'t deleted}'});
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