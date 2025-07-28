import Axios from 'axios'

export const BASE_URL = 'https://backend-silentletters.onrender.com'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    async (error) => {
        console.error({ msg: 'Axios Interceptor Error:', error })
        throw error
    }
)

export default Client
