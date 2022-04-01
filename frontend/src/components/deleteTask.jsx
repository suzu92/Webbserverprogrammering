import todoService from "../utils/api/services/todoService";
import {useState} from "react";

const DeleteData = () => {
    const [data, setData] = useState('')
    const [name, setName] = useState('Suzume')

    const sendDataToAPI = () => {
        todoService.deleteTodoDataByName(name)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <article>
                <h2>Delete a Task</h2>
                <span>Name:</span><input type="text"
                                         value={name}
                                         onChange={event => setName(event.target.value)}/>
                <button onClick={sendDataToAPI}>Remove</button>
                <h3>{data}</h3>
            </article>
        </>
    )
}

export default DeleteData