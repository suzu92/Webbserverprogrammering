import TodoController from '../controller/TodoController.js'

// Endpoint + Business Logic and CRUD Operations
const routes = (app) => {
//CREATE
    app.post('/createTodo/', TodoController.createTodo)

//READ
    app.get('/getAllTodos', TodoController.getAllTodos)
    app.get('/getUserNames/name', TodoController.getUserNames)
    app.get('/getUserByName/:name', TodoController.getUserByName)
    app.get('/getAllTaskAreDone/', TodoController.getTasksAreDone)
    app.get('/getAllTaskArePending/', TodoController.getTasksArePending)

    //UPDATE
    app.put('/updateTodoDataByName/', TodoController.updateUserByName)
    app.put('/todoDone/', TodoController.updateDone)
    app.put('/todoAreDone/:id', TodoController.toggleTaskDone)

//DELETE
    app.delete('/deleteTodoDataByName/:name', TodoController.deleteUserByName)
}

export default {
    routes
}