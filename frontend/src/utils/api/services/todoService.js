import http from '../taskAPI'

const createTodo = (newUser) => {
    return http.post('/createTodo', newUser)
}

const getAllTodo = () => {
    return http.get('/getAllTodo')
}

const updateTodoDataByName = (changeUser) => {
    return http.put('/updateDataByName', changeUser)
}

const deleteTodoDataByName = (name) => {
    return http.delete(`/deleteDataByName/${name}`)
}

const getUserByName = (name) => {
    return http.get(`/getUserByName/${name}`)
}

const todoIsDone = (id) => {
    return http.put(`/todoIsDone/${id}`)
}

export default {
    getAllTodo,
    createTodo,
    updateTodoDataByName,
    deleteTodoDataByName,
    getUserByName,
    todoIsDone
}