import {gql} from 'apollo-boost';

export const TASKS = gql`
    query tasks($userId: String!){
        tasks(userId: $userId) {
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