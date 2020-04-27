import './TasksGrid.css';
import React from 'react';
import Masonry from 'react-masonry-component';
import Task from '../task/Task.jsx';
import {withRouter} from 'react-router-dom';
import {RestRequest} from "../../service/requestService";
import configs from '../../config.json';
import socket from '../../socket/socket.js';
import {AuthContext} from "../authprovider/AuthProvider";

const endpoints = configs.endpoints;
const routes = configs.routes;

class TasksGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tasks: []
        }
    }
    load = () => {
        this.setState({isLoading: true});
        socket.on('allTasks', resp => this.setState({isLoading: false, tasks: resp.data}));
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        console.log(this.context.currentUser);
        socket.emit('tasks', this.context.currentUser.id);
    };

    componentDidMount() {
        this.load();
    }

    onUpdate = (task) => {
        socket.on('updatedTasks', resp => this.load());
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        socket.emit('updateTask', task);
    };

    onDelete = (task) => {
        socket.on('deletedTasks', resp => this.load());
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        socket.emit('deleteTask', task);
    };

    onFileDelete = (data) => {
        RestRequest.delete(endpoints.tasks + '/file', data)
            .then(res => {
                this.load();
            })
            .catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) {
                    this.props.history.push(routes.login);
                }
            })
    };

    onFileDownload = (data) => {
        window.open(endpoints.tasks + '/file' + data.filepath);
    };
    daysLeft(date) {
        return Math.ceil((new Date(date) - Date.now()) / (1000 * 3600*24));
    }
    render() {
        const masonryOptions = {
            itemSelector: '.Task',
            columnWidth: 270,
            gutter: 10,
            isFitWidth: true
        };

        return (
            <Masonry
                className='TasksGrid'
                options={masonryOptions}
            >
                {
                    this.state.tasks.map(task =>
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
                                    status: task.status,
                                    color: uptask.color,
                                    attachments: task.attachments
                                };
                                this.onUpdate.bind(null, newTask)();
                            }}
                            onStartUpdate={() => this.load()}
                            onFileDelete={this.onFileDelete}
                            onFileDownload={this.onFileDownload}
                            color={task.color}
                            attachments={task.attachments}
                            daysLeft={this.daysLeft(task.dueToDate)}
                        >
                            {task.description}
                        </Task>
                    )
                }
            </Masonry>
        );
    }
}

TasksGrid.contextType = AuthContext;
export default withRouter(TasksGrid);
