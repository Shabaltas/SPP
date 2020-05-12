const {buildSchema} = require('graphql');
const schema = buildSchema(`
 scalar FileUpload
 scalar Date
 
 type Query {
    tasks(userId: String!): [Task!]!
    oneTask(_id: String!): Task
 }
 
 type Mutation {
    createTask(title: String!, description: String!, dueToDate: Date!, color: String, userId: String!): Task!
    updateTask(_id: String!, title: String!, description: String!, status: String, dueToDate: Date!, color: String): Task!
    deleteTask(_id: String!): Int!
 }
 
 type Task {
     _id: ID!
     title: String!
     description: String!
     dueToDate: Date!
     status: String!
     color: String!
     userId: ID!
 }
`);

module.exports = schema;
