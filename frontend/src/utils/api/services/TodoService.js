import http from '../TodoApi'

const getAllTodos = () => {
    return http.get('/getAllTodos')
}

const createTodoData = (newUser) => {
    return http.post('/createTodo/', newUser)
}

const updateDataByName = (changeUser) => {
    return http.put('/updateTodoDataByName/', changeUser)
}

const deleteDataByName = (name) => {
    return http.delete(`/deleteTodoDataByName/${name}`)
}

const getUserByName = (name) => {
    return http.get(`/getUserByName/${name}`)
}

const changeTaskIsDone = (id) => {
    return http.put(`/todoAreDone/${id}`)
}

export default {
    getAllTodos,
    createTodoData,
    updateDataByName,
    deleteDataByName,
    getUserByName,
    changeTaskIsDone,
}