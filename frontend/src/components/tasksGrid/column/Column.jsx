import './Column.css';
import React, {useState} from 'react';
import Masonry from 'react-masonry-component';
import Task from '../../task/Task.jsx';
import {withRouter} from 'react-router-dom';
import configs from "../../../config.json";
import {useMutation} from "@apollo/react-hooks";
import {DELETE_TASK, UPDATE_TASK} from "../../../graphql/mutation";

const Column = (props) => {
    const [isUpdating, setUpdating] = useState(false);
    const [updateTask] = useMutation(UPDATE_TASK);
    const onUpdate = (task) => {
        const {_id, title, description, status, color} = task;
        updateTask({
            variables: {
                _id,
                title,
                description,
                color,
                status
            }
        }).then(res => {
            props.load();
            setUpdating(!isUpdating);
            props.history.push(configs.routes.tasks);
        });
    };
    const [deleteTask] = useMutation(DELETE_TASK);
    const onDelete = (_id) => {
        deleteTask({
            variables: {_id}
        }).then(res =>  {
            props.load();
            props.history.push(configs.routes.tasks);
        });
    };
    const daysLeft = (date) => {
        return Math.ceil((new Date(date) - Date.now()) / (1000 * 3600 * 24));
    };
    const masonryOptions = {
        itemSelector: '.Task',
        gutter: 10,
        isFitWidth: true
    };
    return (
        <div>
            <h3>{props.name}</h3>
            <Masonry
                className='Column'
                options={masonryOptions}
            >
                {
                    props.tasks.map(task =>
                        <Task
                            key={task._id}
                            _id={task._id}
                            title={task.title}
                            onDelete={onDelete.bind(null, task._id)}
                            forUpdate={uptask => {
                                const newTask = {
                                    _id: task._id,
                                    title: uptask.title,
                                    description: uptask.description,
                                    status: uptask.status,
                                    color: uptask.color,
                                };
                                onUpdate.bind(null, newTask)();
                            }}
                            onStartUpdate={setUpdating.bind(this, !isUpdating)}
                            color={task.color}
                            daysLeft={daysLeft(task.dueToDate)}
                            status={task.status}
                        >
                            {task.description}
                        </Task>
                    )
                }
            </Masonry>
        </div>

    );
};

export default withRouter(Column);
