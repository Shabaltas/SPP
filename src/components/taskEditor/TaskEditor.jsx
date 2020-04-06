import React from 'react';
import {withRouter} from 'react-router-dom';
import ColorPicker from '../colorPicker/ColorPicker.jsx';

import './TaskEditor.css';
import SimpleDatePicker from '../datepicker/SimpleDatePicker.jsx';
import FilesDiv from "../filesDiv/FilesDiv.jsx";
import {RestRequest} from "../../service/requestService";
import configs from '../../config.json';

const routes = configs.routes;
const endpoints = configs.endpoints;
class TaskEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            color: '#FFFFFF',
            attachments: [],
            uploaded: true
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

    handleTaskAdd() {
        while (!this.state.uploaded) {}
        var data = new FormData();
        this.state.attachments.forEach(file => {
            data.append("file", file)
        });
        data.append("title", this.state.title);
        data.append("description", this.state.description);
        data.append("color", this.state.color);
        data.append("attachments", this.state.attachments.flatMap(file => file.name));
        RestRequest.post(endpoints.tasksCreate, data)
            .then(res => {
                this.props.history.push(routes.tasks);
            })
            .catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) {
                    this.props.history.push(routes.login);
                }
            })
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
                <SimpleDatePicker/>
                <FilesDiv
                    onChange={
                        files => {
                            this.setState({ uploaded: false, attachments: files }, () => {
                                this.setState({uploaded: true});
                                })
                            }}
                />
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

export default withRouter(TaskEditor);
