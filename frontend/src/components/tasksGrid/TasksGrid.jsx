import './TasksGrid.css';
import React from 'react';
import {withRouter} from 'react-router-dom';
import socket from '../../socket/socket.js';
import {AuthContext} from "../authprovider/AuthProvider";
import Column from "./column/Column";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const Statuses = Object.freeze({
    "toDo": 1, "inProgress": 2, "done": 3
});

class TasksGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tasks: []
        }
    }

    load() {
        socket.on('allTasks', resp => this.setState({tasks: resp.data}));
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        socket.emit('tasks', this.context.currentUser.id);
    };

    componentDidMount() {
        this.load();
    }

    tasksToDo() {
        return this.state.tasks.filter(task => task.status === Statuses.toDo);
    }

    tasksInProgress() {
        return this.state.tasks.filter(task => task.status === Statuses.inProgress);
    }

    tasksDone() {
        return this.state.tasks.filter(task => task.status === Statuses.done);
    }

    render() {
        return (
            <DndProvider backend={Backend}>
                <div className='TasksGrid'>
                    <Column tasks={this.tasksToDo()} load={this.load.bind(this)} name='ToDo' greedy={false}/>
                    <Column tasks={this.tasksInProgress()} load={this.load.bind(this)} name='InProgress' greedy={false}/>
                    <Column tasks={this.tasksDone()} load={this.load.bind(this)} name='Done' greedy={false}/>
                </div>
            </DndProvider>
        );
    }
}

TasksGrid.contextType = AuthContext;
export default withRouter(TasksGrid);

