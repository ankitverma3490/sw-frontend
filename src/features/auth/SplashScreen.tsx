import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {screenHeight} from '@utils/scaling';
import logo from '@assets/images/logo.png';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/Storage';
import {resetAndNavigate} from '@utils/Navigation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});
const SplashScreen = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    if (accessToken) {
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
