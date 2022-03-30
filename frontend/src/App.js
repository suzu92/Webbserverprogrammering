import './App.css';
import Header from "./components/Header";
import CreateTodo from "./components/createTodo";
import UpdateTodoByName from "./components/updateTodoByName";
import GetAllTodo from "./components/getAllTodo";
import GetUserByName from "./components/getTodoByName";
import DeleteData from "./components/deleteTask";

function App() {


    return (
        <>
            <Header/>
            <CreateTodo/>
            <UpdateTodoByName/>
            <GetAllTodo/>
            <GetUserByName/>
            <DeleteData/>
        </>
    );
}

export default App;
