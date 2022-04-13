import Axios from 'axios'

const TodoApi = Axios.create({
    baseURL: 'http://localhost:3001'
})

export default TodoApi