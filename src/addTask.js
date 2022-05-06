const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const createdAt = new Date().toISOString();
  const id = v4();

  const { title, description } = JSON.parse(event.body);

  const newTask = {
    id,
    title,
    description,
    createdAt,
    done: false,
  }

  await dynamodb.put({
    TableName: 'TaskTable',
    Item: newTask
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTask, null, 2),
  }
}
module.exports = {
  addTask,
};