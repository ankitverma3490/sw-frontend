import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/Storage";
import { refresh_tokens } from "./authService";
import { Alert } from "react-native";





export const appAxios = axios.create({
    baseURL:BASE_URL
})

appAxios.interceptors.request.use( async config => {
    const accessToken = tokenStorage.getString('accessToken')
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

appAxios.interceptors.response.use(response=>response,
    async error =>{
        if(error.response && error.response.status === 401){
            try {
                const newaccessToken = await refresh_tokens()
                if(newaccessToken){
                    error.config.headers.Authorization = `Bearee ${newaccessToken}`
                    return axios(error.config)
                }
            } catch (error) {
                console.log("Error Refreshing Token")
            }
        }
        if(error.response && error.response.status != 401){
            const errorMessage = error.response.data.message || "something went wrong"
            Alert.alert(errorMessage)
        }
        return Promise.resolve(error)
    }
)