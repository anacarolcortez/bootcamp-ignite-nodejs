const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(
  cors(),
  express.json()
);

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers
  const user = users.find(u => u.username === username)
  if (!user) {
    response.status(404).json({error: 'User not found'})
  }
  request.user = user
  return next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body

  const hasUser = users.find(u => u.username === username) 
  if (hasUser){
    response.status(400).json({error: 'User already exists'})
  }

  const user = {
    id: uuidv4(),
    name: name,
    username: username,
    todos: []
  }

  users.push(user)
  response.status(201).json(user)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request
  response.status(200).json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request
  const { title, deadline } = request.body
  
  const todos = { 
    id: uuidv4(),
    title: title,
    done: false, 
    deadline: new Date(Date.parse(deadline)), 
    created_at: new Date()
  }

  users.map( u => {
    if (u.username === user.username){
      u.todos.push(todos)
    }
  })

  response.status(201).json(user.todos.slice(-1)[0])
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request
  const { id } = request.params
  const { title, deadline } = request.body

  const todos = user.todos.find(td => td.id === id)
  if (!todos){
    response.status(404).json({error: 'Task not found'})
  }

  todos.title = title
  todos.deadline = new Date(Date.parse(deadline))

  response.status(201).json(todos)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request
  const { id } = request.params

  const todos = user.todos.find(td => td.id === id)
  if (!todos){
    response.status(404).json({error: 'Task not found'})
  }
  
  todos.done = true
  response.status(201).json(todos)
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request
  const { id } = request.params

  const indexTodo = user.todos.findIndex(td => td.id === id)
  if (indexTodo === -1){
    response.status(404).json({error: 'Task not found'})
  }
  
  user.todos.splice(indexTodo, 1)
  response.status(204).json()
});

module.exports = app;