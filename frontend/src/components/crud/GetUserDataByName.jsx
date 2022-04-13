import TodoService from "../../utils/api/services/TodoService";
import {useState} from "react";
import Card from "../card/Card";
import css from './GetUserDataByName.module.css'

const GetUserDataByName = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')

    const sendDataToApi = () => {
        TodoService.getUserByName(name)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <input className={css.inputSearch}
                   placeholder={'Search for a name '}
                   type='text'
                   value={name}
                   onChange={event => setName(event.target.value)}/>
            <button className={css.btnSearch} onClick={sendDataToApi}>Search</button>
            {data.name ? <Card name={data.name}
                               task={data.task}/>
                : <h3> {data} </h3>}
        </>
    )
}

export default GetUserDataByName