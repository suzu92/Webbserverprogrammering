import TodoService from "../../utils/api/services/TodoService";
import {useState} from "react";
import css from "./UpdateAndDeleteUser.module.css";


const DeleteTodoUser = (props) => {
    const [data, setData] = useState('')
    const [name, setName] = useState('')

    function cancelHandler() {
        props.onCloseDelete();
    }

    function refreshPage() {
        window.location.reload();
    }

    const sendDataToApi = () => {
        TodoService.deleteDataByName(name)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={`${css.dropdownContent} ${css.positionDelete}  ${css.show} ${css.dropdown}`}>

            <input placeholder={'Name to delete? '} className={css.inputDelete}
                   type="text"
                   value={name}
                   onChange={event => setName(event.target.value)}/>
            <div className={css.btnFlex}>
                <button className={css.btn} onClick={sendDataToApi}>Delete user</button>
                <button className={css.btn} onClick={() => {
                    cancelHandler()
                    refreshPage()
                }}>Close
                </button>
            </div>
            <h4 > {data} </h4>
        </div>
    );
};

export default DeleteTodoUser;