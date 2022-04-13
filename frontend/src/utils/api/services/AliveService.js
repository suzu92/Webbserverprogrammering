import http from '../TodoApi'

const alive = () => {
    return http.get('/')
}

export default {
    alive
}