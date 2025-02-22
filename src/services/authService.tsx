import axios from 'axios';
import {tokenStorage} from '@state/Storage';
import {BASE_URL} from './config';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/Navigation';
import { appAxios } from './apiInterceptors';


// export const deliveryLogin = async (email: string,password:string) => {
//     try {
//        const response = await axios.post(`${BASE_URL}/delivery/login`, {email,password});
//        const {accessToken, refreshToken, deliveryPartner} = response.data;
//       tokenStorage.set('accessToken', accessToken);
//       tokenStorage.set('refreshToken', refreshToken);
//       const {setUser} = useAuthStore.getState();
//       setUser(deliveryPartner);
//     } catch (error) {
//       console.log('Login Error', error);
//     }
//   };

export const deliveryLogin = async (email: string,password:string) => {
  try {
     const response = await axios.post(`${BASE_URL}/deliveryAdmin/login`, {email,password});
     const {accessToken, refreshToken, user} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(user);
  } catch (error) {
    console.log('Login Error', error);
  }
};
export const customerLogin = async (phone: string) => {
  try {
     const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log('Login Error', error);
  }
}; 
 
export const updateAddress = async (address: string) => {
  try {
    const requestBody = {
      address: address  
    };
    const accessToken = tokenStorage.getString('accessToken');

    const response = await axios.patch(`${BASE_URL}/user`, requestBody,{
      headers: {
        Authorization: `Bearer ${accessToken}` 
      }
    });
    const {setUser} = useAuthStore.getState();
    setUser(response.data.user);
  } catch (error) {
    console.log("Error in updating address:", error);
  }
};
 
export const refetchUser = async (setUser:any) => {
   try {
    const response = await appAxios.get('/user')
    setUser(response.data.user)
   } catch (error) {
      console.log("Login Error",error)
   }
  };

export const refresh_tokens = async () => {
  try {
    const refershToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refershToken,
    });

    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('Refresh Token Error', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};