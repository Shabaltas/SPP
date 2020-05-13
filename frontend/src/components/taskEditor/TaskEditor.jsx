import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import ColorPicker from '../colorPicker/ColorPicker.jsx';
import './TaskEditor.css';
import SimpleDatePicker from '../datepicker/SimpleDatePicker.jsx';
import configs from '../../config.json';
import moment from "moment";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_TASK} from "../../graphql/mutation";
import authService from "../../service/authService";
import {TASKS} from "../../graphql/query";

const routes = configs.routes;
const TaskEditor = (props) => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#FFFFFF');
    const [dueToDate, setDueToDate] = useState(moment().toDate());
    const userId = authService.getUserFromStorage().id;

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };
    const handleDateChange = (date) => {
        setDueToDate(date);
    };
    const updateCache = (client, {data: {createTask: item}}) => {
        debugger;
        const data = client.readQuery({
            query: TASKS,
            variables: {userId}
        });
        const newData = {
            tasks: data.tasks.concat([item])
        };
        client.writeQuery({
            query: TASKS,
            variables: {userId},
            data: newData
        });
    };

    const [createTask] = useMutation(CREATE_TASK);

    const handleTaskAdd = () => {
        createTask({
            variables: {
                title,
                description,
                dueToDate,
                color,
                userId
            },
            update: updateCache
        }).then(res => {
            //props.load();
            props.history.push(routes.tasks)
        })
    };

    const style = {
        backgroundColor: color
    };
    return (
        <div className='TaskEditor' style={style}>
            <input
                type='text'
                className='TaskEditor__title'
                placeholder='Enter title'
                value={title}
                onChange={handleTitleChange.bind(this)}
            />
            <textarea
                placeholder='Enter task description'
                rows={5}
                className='TaskEditor__description'
                value={description}
                onChange={handleDescriptionChange.bind(this)}
            />
            <SimpleDatePicker onChange={handleDateChange.bind(this)}/>
            <div className='TaskEditor__footer'>
                <ColorPicker
                    value={color}
                    onChange={handleColorChange.bind(this)}
                />
                <button
                    className='TaskEditor__button'
                    onClick={handleTaskAdd.bind(this)}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default withRouter(TaskEditor);
