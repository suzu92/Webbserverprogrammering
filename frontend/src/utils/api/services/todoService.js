import http from '../taskAPI'

const createTodo = (newName) => {
    return http.post('/createtodo', newName)
}

const allData = () => {
    return http.get('/alldata')
}

const updateDataByName = (changedData) => {
    return http.put('/updatedatabyname', changedData)
}

const deleteDataByName = (name) => {
    return http.delete(`/deletedatabyname/${name}`)
}

const getUserByName = (name) => {
    return http.get(`/getuserbyname/${name}`)
}

const todoIsDone = (id) => {
    return http.put(`/todoisdone/${id}`)
}

export default {
    allData,
    createTodo,
    updateDataByName,
    deleteDataByName,
    getUserByName,
    todoIsDone
}