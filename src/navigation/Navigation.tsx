import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/Navigation';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import ProductCategories from '@features/category/ProductCategories';
import ProductOrder from '@features/order/ProductOrder';
import OrderSuccess from '@features/order/OrderSuccess';
import LiveTracking from '@features/map/LiveTracking';
import Profile from '@features/profile/Profile';
import DeliveryMap from '@features/delivery/DeliveryMap';
import OtpScreen from '@features/auth/OtpScreen';
 import AddAddress from '@components/address/AddAddress';
import UpdateAddress from '@components/address/UpdateAddress';
import SuperAdminDashboard from '@features/superAdmin/SuperAdminDashboard';
import AdminDashboard from '@features/Admin/AdminDashboard';
const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
         <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
        <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        <Stack.Screen name="LiveTracking" component={LiveTracking} />
        <Stack.Screen name="ProductCategories" component={ProductCategories} />
        <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
        <Stack.Screen name="ProductOrder" component={ProductOrder} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="DeliveryLogin" component={DeliveryLogin} />
        <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
