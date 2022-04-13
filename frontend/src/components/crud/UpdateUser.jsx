import TodoService from "../../utils/api/services/TodoService";
import {useState} from "react";
import Card from "../card/Card";
import css from './UpdateAndDeleteUser.module.css'

const UpdateUser = (props) => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')
    const [task, setTask] = useState('')

    function cancelHandler() {
        props.onCloseUpdate();
    }


    function refreshPage() {
        window.location.reload();
    }

    const sendDataToApi = () => {
        const changedUser = {
            "name": name,
            "newName": newName,
            "task": task,
        }
        TodoService.updateDataByName(changedUser)
            .then(response => {

                setData(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={`${css.dropdownContent} ${css.positionUpdate}  ${css.show} ${css.dropdown}`}>
            <div className={css.gridContainer}>
                <input className={css.layoutInput} placeholder={'Name:'}
                       type="text"
                       value={name}
                       onChange={event => setName(event.target.value)}/>
                <input className={css.layoutInput} placeholder={'New Name:'}
                       type="text"
                       value={newName}
                       onChange={event => setNewName(event.target.value)}/>
                <input className={css.layoutInput} placeholder={'What to do? :'}
                       type="text"
                       value={task}
                       onChange={event => setTask(event.target.value)}/>
            </div>
            <div className={css.btnFlex}>
                <button className={css.btn} onClick={sendDataToApi}>Update new user</button>
                <button className={css.btn} onClick={() => {
                    cancelHandler()
                    refreshPage()
                }}>Close
                </button>
            </div>

            {data.name ? <Card
                    name={data.name}
                    task={data.task}/>
                : <h4> {data} </h4>}
        </div>
    );
};

export default UpdateUser;