import todoService from "../utils/api/services/todoService";
import {useState} from "react";
import DataCard from "./DataCard";

const GetUserByName = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')

    const sendDataToAPI = () => {
        todoService.getUserByName(name)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <article>
                <h2>Fetch a name from the list:</h2>
                <span>Name:</span> <input type="text"
                                          value={name}
                                          onChange={event => setName(event.target.value)}/>
                <button onClick={sendDataToAPI}>Fetch</button>
                {data.name ? <DataCard name={data.name}
                                       task={data.task}/>
                    : <h3>{data}</h3>
                }
            </article>
        </>
    )
}

export default GetUserByName