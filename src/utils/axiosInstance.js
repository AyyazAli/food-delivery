import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
    headers:{
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export default axiosInstance;