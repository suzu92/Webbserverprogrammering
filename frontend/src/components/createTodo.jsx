import {useState} from "react";
import todoService from "../utils/api/services/todoService";
import DataItems from "./DataItems";

const CreateTodo = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [task, setTask] = useState('')

    const sendDataToAPI = () => {
        const newUser = {
            'name': name,
            'task': task
        }
        todoService.createTodo(newUser)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <form>
                <h2>Create Task:</h2>
                <span>Name:</span><input placeholder='Enter your name..' className='task-input' type="text"
                                         value={name}
                                         onChange={event => setName(event.target.value)}/>
                <span>Task:</span><input placeholder='Enter your Todo..' className='task-input' type="text"
                                         value={task}
                                         onChange={event => setTask(event.target.value)}/>
                <button className='btn-add' onClick={sendDataToAPI}>Create</button>
                <DataItems task={data}/>
            </form>
        </>
    )
}

export default CreateTodo