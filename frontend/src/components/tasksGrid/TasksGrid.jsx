import './TasksGrid.css';
import React from 'react';
import Masonry from 'react-masonry-component';
import Task from '../task/Task.jsx';
import {withRouter} from 'react-router-dom';
import {RestRequest} from "../../service/requestService";
import configs from '../../config.json';

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
        RestRequest.get(endpoints.tasks)
            .then(res => {
                const tasks = res.data;
                this.setState({isLoading: false, tasks: tasks});
            })
            .catch(reason => {
                console.log(reason);
                if (reason.response.status === 401 || reason.response.status === 403) {
                    this.props.history.push(routes.login);
                }
            })
    };

    componentWillMount() {
        this.load();
    }

    onUpdate = (task) => {
        RestRequest.put(endpoints.tasks, task)
            .then(res => {
                this.load();
            })
            .catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) {
                    this.props.history.push(routes.login);
                }
            })
    };

    onDelete = (task) => {
        RestRequest.delete(endpoints.tasks, task)
            .then(res => {
                this.load();
            })
            .catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) {
                    this.props.history.push(routes.login);
                }
            })
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
                            onStartUpdate={() => this.componentWillMount()}
                            onFileDelete={this.onFileDelete}
                            onFileDownload={this.onFileDownload}
                            color={task.color}
                            attachments={task.attachments}
                        >
                            {task.description}
                        </Task>
                    )
                }
            </Masonry>
        );
    }
}

export default withRouter(TasksGrid);
