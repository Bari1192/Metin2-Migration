import axios from 'axios'
export const http = axios.create({
    baseURL: "https://backend-admin-login.fly.dev/api", 
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})