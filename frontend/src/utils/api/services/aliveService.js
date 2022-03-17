import http from '../taskAPI'

const alive = () => {
    return http.get('/')
}

export default {
    alive,
}