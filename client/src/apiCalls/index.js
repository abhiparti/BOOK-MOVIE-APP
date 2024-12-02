import axios from "axios"


 export const axiosInstances = axios.create({
    headers : {'Content-Type': "application/json", 'authorization' : `Bearer ${localStorage.getItem('token')} `}
})                                                 