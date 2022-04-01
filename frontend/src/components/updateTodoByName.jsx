import {useState} from "react";
import TodoService from "../utils/api/services/todoService";
import DataCard from "./DataCard";

const UpdateTodoByName = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')
    const [task, setTask] = useState('')

    const setDataFromAPI = () => {
        const changeUser = {
            'name': name,
            'newName': newName,
            'task': task
        }
        TodoService.updateTodoDataByName(changeUser)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <article>
                <h2>Update Task:</h2>
                <span>Name:</span><input type="text"
                                         value={name}
                                         onChange={event => setName(event.target.value)}/>
                <br/>
                <span>New name:</span><input type="text"
                                             value={newName}
                                             onChange={event => setNewName(event.target.value)}/>
                <br/>
                <span>Task:</span><input type="text"
                                         value={task}
                                         onChange={event => setTask(event.target.value)}/>
                <br/>
                <button onClick={setDataFromAPI}>Update</button>

                {data.name ? <DataCard name={data.name}
                                       task={data.task}/>
                    : <h3>{data}</h3>
                }
            </article>
        </>
    )
}

export default UpdateTodoByName