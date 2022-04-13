import AliveService from "../utils/api/services/AliveService.js";
import {useState} from "react";

const Alive = () => {
    const [data, setData] = useState('')

    const checkApiStatus = () => {
        AliveService.alive()
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <button style={{fontWeight: "600", margin: "auto", display: "block", borderRadius: "7px", border: "none", padding:"5px, 10px", color: "white", backgroundColor: "darkslategray"}} onClick={checkApiStatus}>
                API
            </button>
            <h3>{data}</h3>
        </div>
    );
}

export default Alive;