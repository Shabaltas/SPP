import React from 'react';
import {withRouter} from 'react-router-dom';
import './Task.css';
import '../taskEditor/TaskEditor.css';
import ColorPicker from "../colorPicker/ColorPicker.jsx";
import {AuthContext} from "../authprovider/AuthProvider";

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false,
            description: this.props.children,
            title: this.props.title,
            color: this.props.color,
            daysLeft: this.props.daysLeft,
            attachments: this.props.attachments,
            status: this.props.status
        };
    };

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    };

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    };
    handleStatusChange(event) {
        const newTask = {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
            attachments: this.state.attachments,
            status: Number(event.target.value)
        };
        this.props.forUpdate(newTask);
        this.setState({status: event.target.value});
    };

    handleColorChange(newColor) {
        this.setState({color: newColor});
    };

    handleTaskUpdate() {
        const newTask = {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
            attachments: this.state.attachments,
            status: this.state.status
        };
        this.props.forUpdate(newTask);
        this.setState({isUpdating: false})
    };

    render() {
        const style = {backgroundColor: this.state.color};
        if (this.state.isUpdating) {
            return (
                <div className='Task' style={style}>
                    <input
                        type='text'
                        className='TaskEditor__title'
                        placeholder={this.state.title}
                        value={this.state.title}
                        onChange={this.handleTitleChange.bind(this)}
                    />
                    <textarea
                        placeholder={this.state.description}
                        className='TaskEditor__description'
                        value={this.state.description}
                        onChange={this.handleDescriptionChange.bind(this)}
                    />
                    <h3>Days left: {this.state.daysLeft}</h3>
                    <div className='TaskEditor__footer'>
                        <ColorPicker
                            value={this.state.color}
                            onChange={this.handleColorChange.bind(this)}
                        />
                    </div>
                    <button
                        className='TaskEditor__button'
                        onClick={this.handleTaskUpdate.bind(this)}>
                        Update
                    </button>
                </div>
            )
        } else return (
            <div className='Task' style={style} onDoubleClick={() => {
                    this.setState({isUpdating: true});
                    this.props.onStartUpdate();
            }}>
                <div className='Task__header'>
                    <h4 className='Task__title'>{this.props.title}</h4>
                    <button className='Task__del' onClick={this.props.onDelete}> × </button>
                </div>
                <div className='Task__description'
                     onChange={this.handleDescriptionChange.bind(this)}>{this.props.children}</div>
                {
                    this.state.daysLeft === 0
                    ? <h5 className='days_notice today'>Today</h5>
                    : this.state.daysLeft < 0
                        ? <h4 className='days_notice missed'>Missed</h4>
                        : <div className='days_notice'>Days left: {this.state.daysLeft}</div>
                }
                    <select className='status' onChange={(event) => {
                        this.handleStatusChange.bind(this)(event);
                    }} value={this.state.status}>
                        <option value={1}>to do</option>
                        <option value={2}>in progress</option>
                        <option value={3}>done</option>
                    </select>

            </div>
        );
    }
}

Task.contextType = AuthContext;
export default withRouter(Task);