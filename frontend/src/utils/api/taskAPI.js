import Axios from 'axios'

const taskAPI = Axios.create ({
    baseUrl: 'http://localhost:3001'
})

export default taskAPI
