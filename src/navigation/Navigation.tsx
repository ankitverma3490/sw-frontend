 import React, { FC } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '@features/auth/SplashScreen'
const stack = createNativeStackNavigator()
const Navigation: FC = () => {
  return (
     <NavigationContainer>
      <stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}
      >

<stack.Screen name="SplashScreen" component={SplashScreen}/>
      </stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation