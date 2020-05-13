import {gql} from 'apollo-boost';

export const CREATE_TASK = gql`
    mutation CreateTask($title: String!, $description: String!, $dueToDate: Date!, $color: String, $userId: String!) {
        createTask(title: $title, description: $description, dueToDate: $dueToDate, color: $color, userId: $userId) {
            _id
            title
            description
            dueToDate
            status
            color
            userId
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($_id: String!, $title: String!, $description: String!, $color: String, $status: Int) {
        updateTask(_id: $_id, title: $title, description: $description, color: $color,  status: $status) {
            _id
            title
            description
            dueToDate
            status
            color
            userId
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($_id: String!) {
        deleteTask(_id: $_id) {
            deleted
            found
        }
    }
`;