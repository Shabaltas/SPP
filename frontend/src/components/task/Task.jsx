import React from 'react';

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
            attachments: this.props.attachments
        };
    };

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    };

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    };

    handleColorChange(newColor) {
        this.setState({color: newColor});
    };

    handleTaskUpdate() {
        const newTask = {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
            attachments: this.state.attachments
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
                    {/* <FilesDiv onChange={files => this.handleFileAdd(files)}/>
                    <div className='Task__attachments'>
                        {
                            this.props.attachments.map(file => {
                                const pathTofFile = `\\${this.props._id}\\${file}`;
                                return (<a href={pathTofFile} download>{file} </a>)
                            })
                        }
                    </div>*/}
                    <div className='TaskEditor__footer'>
                        <ColorPicker
                            value={this.state.color}
                            onChange={this.handleColorChange.bind(this)}
                        />
                    </div>
                    <button
                        className='TaskEditor__button'
                        /*disabled={!this.state.description}*/
                        onClick={this.handleTaskUpdate.bind(this)}>
                        Update
                    </button>
                </div>
            )
        } else return (
            <div className='Task' style={style} onDoubleClick={() => {
                if (this.context.currentUser) {
                    this.setState({isUpdating: true});
                    this.props.onStartUpdate();
                }
            }}>
                <div className='Task__header'>
                    <h4 className='Task__title'>{this.props.title}</h4>
                    {
                        this.context.currentUser ?
                            <button className='Task__del' onClick={this.props.onDelete}> × </button>
                            :
                            <></>
                    }
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

                {/*<div className='Task__attachments'>
                    {
                        this.props.attachments.map((file, i) => {
                            const pathTofFile = `/${this.props._id}/${file}`;
                            return (<File onFileDownload={() =>
                                this.props.onFileDownload({filepath: `${pathTofFile}`})
                            }
                                          key={i} filepath={pathTofFile} filename={file} onFileDelete={() => {
                                this.setState({attachments: this.props.attachments.splice(i, 1)});
                                this.handleTaskUpdate.bind(this)();
                                this.props.onFileDelete({filename: `${file}`, filepath: `${pathTofFile}`});
                            }}/>)
                        })
                    }
                </div>*/}
            </div>
        );
    }
}

Task.contextType = AuthContext;
export default Task;