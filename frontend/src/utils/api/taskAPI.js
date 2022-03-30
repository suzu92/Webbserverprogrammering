import Axios from 'axios'

const taskAPI = Axios.create ({
    baseURL: 'http://localhost:3001'
})

export default taskAPI
