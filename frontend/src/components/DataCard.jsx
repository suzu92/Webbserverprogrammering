import {useState} from "react";
import css from './LineThrough.css'


const DataCard = ({name, task}) => {
    const [done, setDone] = useState(false)

    function toggleDone() {
        setDone(!done)


    }

    return (
        <p className={done ? css.doneTask : null} onClick={toggleDone}> {task} - {name}</p>
    )

}

export default DataCard