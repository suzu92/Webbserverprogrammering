import TodoService from "../../utils/api/services/TodoService";
import {useState, useEffect} from "react";
import CardList from "../card/CardList";
import css from './CreateAndGetTodoData.module.css'

const CreateAndGetTodoData = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [task, setTask] = useState('')

    const sendDataToApi = () => {
        const newUser = {
            "name": name,
            "task": task,
        }

        TodoService.createTodoData(newUser)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    const fetchDataFromExternalApi = () => {
        TodoService.getAllTodos()
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchDataFromExternalApi()
    }, [])

    return (
        <>
            <input className={css.inputAdd} placeholder={'Name of todoer'}
                   value={name}
                   onChange={(event) => setName(event.target.value)}/>
            <input className={css.inputAdd}
                   placeholder={'What todo'}
                   type="text"
                   value={task}
                   onChange={(event) => setTask(event.target.value)}/>
            <button className={css.btnAdd} onClick={sendDataToApi}>Add new todo</button>
            <CardList users={data}/>
        </>
    )
        ;
};

export default CreateAndGetTodoData;