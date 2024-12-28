import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import {navigationRef} from '@utils/Navigation';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
const stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <stack.Screen name="SplashScreen" component={SplashScreen} />
        <stack.Screen
          options={{animation: 'fade'}}
          name="CustomerLogin"
          component={CustomerLogin}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
