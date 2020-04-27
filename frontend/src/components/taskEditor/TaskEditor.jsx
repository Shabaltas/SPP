import React from 'react';
import {withRouter} from 'react-router-dom';
import ColorPicker from '../colorPicker/ColorPicker.jsx';

import './TaskEditor.css';
import SimpleDatePicker from '../datepicker/SimpleDatePicker.jsx';
import configs from '../../config.json';
import socket from '../../socket/socket';
import {AuthContext} from "../authprovider/AuthProvider";
import moment from "moment";
const routes = configs.routes;
class TaskEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            color: '#FFFFFF',
            dueToDate: moment().toDate()
        };
    };

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    };

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    };

    handleColorChange(newColor) {
        this.setState({ color: newColor });
    };
    handleDateChange(date) {
        this.setState({dueToDate: date});
    }

    handleTaskAdd() {
        socket.on('createdTasks', resp => this.props.history.push(routes.tasks));
        /* TODO add error component in content */
        socket.on('serverError', resp => this.props.history.push('/error'));
        socket.emit('createTask', {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
            userId: this.context.currentUser.id,
            dueToDate: this.state.dueToDate
        });
    };

    render() {
        const style = {
                backgroundColor: this.state.color
        };
        return (
            <div className='TaskEditor' style={style}>
                <input
                    type='text'
                    className='TaskEditor__title'
                    placeholder='Enter title'
                    value={this.state.title}
                    onChange={this.handleTitleChange.bind(this)}
                />
                <textarea
                    placeholder='Enter task description'
                    rows={5}
                    className='TaskEditor__description'
                    value={this.state.description}
                    onChange={this.handleDescriptionChange.bind(this)}
                />
                <SimpleDatePicker onChange={this.handleDateChange.bind(this)}/>
                {/*<FilesDiv
                    onChange={
                        files => {
                            this.setState({ uploaded: false, attachments: files }, () => {
                                this.setState({uploaded: true});
                                })
                            }}
                />*/}
                <div className='TaskEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange.bind(this)}
                    />
                    <button
                        className='TaskEditor__button'
                        /*disabled={!this.state.description}*/
                        onClick={this.handleTaskAdd.bind(this)}>
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

TaskEditor.contextType = AuthContext;
export default withRouter(TaskEditor);
