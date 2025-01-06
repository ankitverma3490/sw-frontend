import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import {navigationRef} from '@utils/Navigation';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import ProductCategories from '@features/category/ProductCategories';
import ProductOrder from '@features/order/ProductOrder';
import OrderSuccess from '@features/order/OrderSuccess';
import LiveTracking from '@features/map/LiveTracking';
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
          name="ProductDashboard"
          component={ProductDashboard}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="LiveTracking"
          component={LiveTracking}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="ProductCategories"
          component={ProductCategories}
        />
        
        <stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryDashboard"
          component={DeliveryDashboard}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="ProductOrder"
          component={ProductOrder}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="OrderSuccess"
          component={OrderSuccess}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
        <stack.Screen
          options={{animation: 'fade'}}
          name="CustomerLogin"
          component={CustomerLogin}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
