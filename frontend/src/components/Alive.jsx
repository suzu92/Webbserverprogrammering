import {useState} from "react";
import aliveService from '../utils/api/services/aliveService'

const Alive = () => {
    const [data, setData] = useState('')

    function fetchDataFromExternalAPI (){
        aliveService.alive()
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => console.log(error))
    }

    function displayData(){
        if (data.length !==0) {
            return <h2>Response from API "{data}"</h2>
        }
    }

    return (
        <>
            <h1>Alive</h1>
            <button onClick={() => fetchDataFromExternalAPI()}>Make API call</button>
            {displayData()}
        </>
    )
}

export default Alive