import axios from 'axios'
import { ip } from './ip'

// const config = {
//     baseURL: 'http://localhost:8003/'

// }
// const http = axios.create({})
class config {

    constructor() {
        this.ip = new ip()
            // this.url = this.ip.getUrl(modules)
    }

    getAxiosInstance(modules) {
        let url = this.ip.getUrl(modules)
        const address = {
            baseURL: url
        }
        return axios.create(address)
    }
}
export { config }