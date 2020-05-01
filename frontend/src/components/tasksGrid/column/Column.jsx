import './Column.css';
import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import Task from '../../task/Task.jsx';
import {withRouter} from 'react-router-dom';
import socket from '../../../socket/socket.js';
import {AuthContext} from "../../authprovider/AuthProvider";

class Column extends React.Component {
    onUpdate = (task) => {
        socket.on('updatedTasks', resp => {
            console.log("update");
            this.props.load();
        });
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        socket.emit('updateTask', task);
    };
    onDelete = (task) => {
        socket.on('deletedTasks', resp => this.props.load());
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        socket.emit('deleteTask', task);
    };
    daysLeft(date) {
        return Math.ceil((new Date(date) - Date.now()) / (1000 * 3600*24));
    }
    render() {
        const masonryOptions = {
            itemSelector: '.Task',
            gutter: 10,
            isFitWidth: true
        };
        return (
            <div>
                <h3>{this.props.name}</h3>
                <Masonry
                    className='Column'
                    options={masonryOptions}
                >
                    {
                        this.props.tasks.map(task =>
                            <Task
                                key={task._id}
                                _id={task._id}
                                title={task.title}
                                onDelete={this.onDelete.bind(null, task)}
                                forUpdate={uptask => {
                                    const newTask = {
                                        _id: task._id,
                                        title: uptask.title,
                                        description: uptask.description,
                                        creationDate: task.creationDate,
                                        dueToDate: task.dueToDate,
                                        status: uptask.status,
                                        color: uptask.color,
                                        attachments: task.attachments
                                    };
                                    console.log(newTask);
                                    this.onUpdate.bind(null, newTask)();
                                }}
                                onStartUpdate={() => this.props.load()}
                                onFileDelete={this.onFileDelete}
                                onFileDownload={this.onFileDownload}
                                color={task.color}
                                attachments={task.attachments}
                                daysLeft={this.daysLeft(task.dueToDate)}
                                status={task.status}
                            >
                                {task.description}
                            </Task>
                        )
                    }
                </Masonry>
            </div>

        );
    }
}

Column.contextType = AuthContext;
export default withRouter(Column);
