import { axiosInstances } from "./index";

export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstances.post("api/users/register", value)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const LoginUser = async (value) => {
    try {
        const response = await axiosInstances.post("api/users/login", value)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstances.get("api/users/get-current-user");
        return response.data
    } catch (error) {
        console.log(error);
    }
}