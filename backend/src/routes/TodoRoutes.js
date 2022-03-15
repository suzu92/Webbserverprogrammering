import UserController from '../controller/TodoController.js'

const routes = (app) => {
    // CREATE
    app.post('/createtodo/', UserController.createTodo)

    // READ
    app.get('/alldata', UserController.allData)
    app.get('/getusernames/name', UserController.getUserNames)
    app.get('/getuserbyname/:name', UserController.getUserByName)

    // UPDATE
    app.put('/updatedatabyname/', UserController.updateUserByName)

    // DELETE
    app.delete('/deletedatabyname/:name', UserController.deleteUserByName)
}

export default {
    routes
}