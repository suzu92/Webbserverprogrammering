import css from './TodoView.module.css'
import CreateAndGetTodoData from "../../components/crud/CreateAndGetTodoData";
import GetUserDataByName from "../../components/crud/GetUserDataByName";
import UpdateUser from "../../components/crud/UpdateUser";
import DeleteTodoUser from "../../components/crud/DeleteTodoUser";
import Alive from '../../components/Alive.jsx'
import {useState} from "react";


const TodoView = () => {
    const [ShowingUpdate, setShowingUpdate] = useState(false)
    const [ShowingDelete, setShowingDelete] = useState(false)

    function showUpdate() {
        setShowingUpdate(!ShowingUpdate)
    }
    function showDelete() {
        setShowingDelete(!ShowingDelete)
    }
    function closeUpdateHandler() {
        if (ShowingUpdate === true) {
            setShowingUpdate(false);
        }
    }
    function closeDeleteHandler() {
        if (ShowingDelete === true) {
            setShowingDelete(false);
        }
    }
    return (
        <>
            <div>
                <div>
                    <GetUserDataByName/>
                    <CreateAndGetTodoData/>
                </div>
                <div>
                    <button onClick={showUpdate} className={css.btn}>Update User&Todo</button>
                    {ShowingUpdate && <UpdateUser onCloseUpdate={closeUpdateHandler}/>}
                    <button className={css.btn}
                            onClick={showDelete}>Delete Todo
                    </button>
                    {ShowingDelete && <DeleteTodoUser onCloseDelete={closeDeleteHandler}/>}
                </div>
            </div>
            <Alive/>
        </>
    )
};

export default TodoView