import './TasksGrid.css';
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Column from "./column/Column";
import {useQuery} from "@apollo/react-hooks";
import {TASKS} from "../../graphql/query";
import Alert from "../alert/Alert";
import authService from "../../service/authService";

const Statuses = Object.freeze({
    "toDo": 1, "inProgress": 2, "done": 3
});

const TasksGrid = () => {
    let userId = authService.getUserFromStorage().id;
    const {loading, error, data, refetch} = useQuery(TASKS, {
        variables: {userId},
        skip: !userId,
    });
    //TODO add clearing the cache
    const tasksByStatus = (tasks, status) => {
        return tasks.filter(task => task.status === status);
    };
    return (
        <div>
            {error ? <Alert severity="error">{error.message}</Alert> : <React.Fragment/>}
            {
                (loading || !data)
                    ? <h1>LOADING</h1>
                    : <div className='TasksGrid'>
                        <Column tasks={tasksByStatus(data.tasks, Statuses.toDo)} load={refetch} name='ToDo' greedy={false}/>
                        <Column tasks={tasksByStatus(data.tasks, Statuses.inProgress)} load={refetch} name='InProgress' greedy={false}/>
                        <Column tasks={tasksByStatus(data.tasks, Statuses.done)} load={refetch} name='Done' greedy={false}/>
                    </div>
            }
        </div>
    );
};

export default withRouter(TasksGrid);

