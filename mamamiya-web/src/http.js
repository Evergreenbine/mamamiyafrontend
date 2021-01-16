import axios from 'axios'

const config = {
    baseURL: 'http://localhost:8002/app'
}
const http = axios.create(config)

export default http