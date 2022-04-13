import css from "./Card.module.css";
import {useState} from "react";
import TodoService from "../../utils/api/services/TodoService";

const Card = ({name, task, done, id}) => {

    const [isTaskDone, setIsTaskDone] = useState(done)

    function toggleDone() {
        TodoService.changeTaskIsDone(id)
            .then(response => {
                console.log(response.data)
                setIsTaskDone(response.data.done)
            }).catch(error => console.log(error))
    }
    return (
        <div className={css.layoutList}>
            <ul className={css.list}>
                <li className={isTaskDone ? css.done : null} onClick={toggleDone}>
                    <span className={css.nameFont}>{name}</span>
                    <span className={css.todoFont}>{task}</span>
                </li>
            </ul>
        </div>
    )
}

export default Card
