import TodoData from '../data/todoData.js'

const createTodo = (req, res) => {
    const {task, name} = req.body
    if (name && task){
        const newObject = {
            id: TodoData.length,
            name: name,
            task: task,
            done: false,
        }
        TodoData.push(newObject)
        res.status(201).send(TodoData)
    }
}

const getAllTodos = (req, res) => {
    res.status(200).send(TodoData)
}

const userNames = () => {
    const names = []
    TodoData.forEach(user => {
        names.push({
            name: user.name
        })
    })
    return names
}

const getUserNames = (req, res) => {
    const responseFromDb = userNames()
    res.status(200).send(responseFromDb)
}

const searchUserByName = (name) => {
    let object = `Could not find "${name}"`
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
    let object = `Could not find "${ name }"`
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
    const {name, newName, task} = req.body
    const response = modifyUserByName(name, newName, task)
    res.status(202).send(response)
}

const removeUserByName = (name) => {
    let text = `User: "${ name }" `

    for (let i = 0; i < TodoData.length; i++) {
        if (name === TodoData[i].name) {
            text += `was deleted!`
            TodoData.splice(i, 1)
            return text
        }
    }

    text += `is no longer in this database!`
    return text
}

const deleteUserByName = (req, res) => {
    const name = req.params.name
    const responseFromDB = removeUserByName(name)
    res.status(200).send(responseFromDB)
}

const modifyTaskDone = (id, name) => {
    let object = `The task of "${name}" is removed`
    TodoData.forEach(todo => {
        if (name === todo.name) {
            todo.done = true
            object = todo
            return todo
        }
    })
    return object
}


const taskIsDone = () => {
    const tasksDone = []
    TodoData.forEach(todo => {
        if (todo.done === true)
            tasksDone.push(todo)
    })
    return tasksDone
}

const getTasksAreDone = (req, res) => {
    const responseFromDb = taskIsDone()
    res.status(200).send(responseFromDb)
}


const updateDone = (req, res) => {
    const {id, name} = req.body
    const response = modifyTaskDone(id, name)
    res.status(202).send(response)
}

const taskIsPending = () => {
    const tasksPending = []
    TodoData.forEach(todo => {
        if (todo.done === false)
            tasksPending.push(todo)
    })
    return tasksPending
}

const getTasksArePending = (req, res) => {
    const responseFromDb = taskIsPending()
    res.status(200).send(responseFromDb)
}

const toggleTaskDone = (req, res) => {
    const id = Number(req.params.id)
    TodoData[id].done = !TodoData[id].done
    res.status(202).send(TodoData[id])
}

export default {
    createTodo,
    getAllTodos,
    getUserNames,
    getUserByName,
    updateUserByName,
    deleteUserByName,
    updateDone,
    getTasksAreDone,
    getTasksArePending,
    toggleTaskDone
}