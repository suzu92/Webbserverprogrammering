import todoService from '../utils/api/services/todoService';
import {useState} from "react";
import DataItems from "./DataItems";

const GetAllTodo = () => {
    const [data, setData] = useState([])

    const fetchDataFromExternalAPI = () => {
        todoService.getAllTodos()
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <form>
                <h2>All Tasks:</h2>
                <button type="button" className='btn-add' onClick={() => fetchDataFromExternalAPI()}>Fetch all tasks</button>
                <DataItems task={data}/>
            </form>
        </>
    )
}
export default GetAllTodo