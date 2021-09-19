import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api"
})


axiosInstance.interceptors.request.use(request => {
    request.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return request;
})

export default axiosInstance;