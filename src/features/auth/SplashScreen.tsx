import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {screenHeight} from '@utils/scaling';
import logo from '@assets/images/logo.png';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/Storage';
import {resetAndNavigate} from '@utils/Navigation';
import { jwtDecode } from "jwt-decode";
import { refetchUser, refresh_tokens } from '@services/authService';
 Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodedToken{
  exp:number
}
const SplashScreen = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)
      
      const currentTime = Date.now()/1000;
      if(decodedRefreshToken?.exp < currentTime){
        resetAndNavigate("CustomerLogin")
        Alert.alert("Session expired","Please login again")
        return false;
      }
      if(decodedAccessToken?.exp < currentTime){
        try {
           refresh_tokens()
           await refetchUser(setUser)
        } catch (error) {
          console.log(error)
          Alert.alert("There was an error in refreshing token!")
          return false;
        }
      }
      if(user?.role==="Customer"){
        resetAndNavigate('ProductDashboard')
      }else{
        resetAndNavigate("DeliveryDashboard")
      }
      return true;
    }
    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        Geolocation.requestAuthorization();
        tokenCheck();
      } catch (err) {
        Alert.alert('Sorry we need your location to continue');
      }
    };
    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: screenHeight * 0.6,
    height: screenHeight * 0.6,
  },
});

export default SplashScreen;
