import TodoData from '../data/TodoData.js'

const createTodo = (req, res) => {
    const { task, name } = req.body
    const newObject = {
        name: name,
        task: task,
        id: TodoData.length
    }
    TodoData.push(newObject)
    res.status(201).send(TodoData[TodoData.length -1])
}

const allData = (req, res) => {
    res.status(200).send(TodoData)
}

const userNames = () => {
    const names = []
    TodoData.forEach(todo => {
        names.push({
            name: todo.name
        })
    })
    return names
}

const getUserNames = (req, res) => {
    const responseFromDb = userNames()
    res.status(200).send(responseFromDb)
}

const searchUserByName = (name) => {
    let object = `Could not find "${ name }" in the database`
    TodoData.forEach(todo => {
        if (name === todo.name) {
            object = todo
            return todo
        }
    })
    return object
}

const getUserByName = (req, res) => {
    const name = req.params.name
    const responseFromDb = searchUserByName(name)
    res.status(200).send(responseFromDb)
}

const modifyUserByName = (name, newName, task) => {
    let object = `Could not find "${ name }" in database`
    TodoData.forEach(todo => {
        if (name === todo.name) {
            todo.name = newName
            todo.task = task
            object = todo
            return todo
        }
    })
    return object
}

const updateUserByName = (req, res) => {
    const { name, newName, task } = req.body
    const response = modifyUserByName(name, newName, task)
    res.status(202).send(response)
}

const removeUserByName = (name) => {
    let text = `User: "${ name }" `

    for (let i = 0; i < TodoData.length; i++) {
        if (name === TodoData[i].name) {
            text += `was deleted from this database!`
            TodoData.splice(i, 1)
            return text
        }
    }

    text += `don't exist in this database!`
    return text
}

const deleteUserByName = (req, res) => {
    const name = req.params.name
    const responseFromDB = removeUserByName(name)
    res.status(200).send(responseFromDB)
}

export default {
    createTodo,
    allData,
    getUserNames,
    getUserByName,
    updateUserByName,
    deleteUserByName
}