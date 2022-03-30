import http from '../taskAPI'

const createTodo = (newUser) => {
    return http.post('/createTodo', newUser)
}

const getAllTodos = () => {
    return http.get('/getAllTodos')
}

const updateDataByName = (changeUser) => {
    return http.put('/updateDataByName', changeUser)
}

const deleteDataByName = (name) => {
    return http.delete(`/deleteDataByName/${name}`)
}

const getUserByName = (name) => {
    return http.get(`/getUserByName/${name}`)
}

const todoIsDone = (id) => {
    return http.put(`/todoIsDone/${id}`)
}

export default {
    getAllTodos,
    createTodo,
    updateDataByName,
    deleteDataByName,
    getUserByName,
    todoIsDone
}