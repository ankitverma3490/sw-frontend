import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { screenHeight } from '@utils/scaling'
import logo from '@assets/images/logo.png'
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage}/>
      <Text>SplashScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.white,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  logoImage:{
    width: screenHeight*0.6,
    height: screenHeight*0.6
  },
})

export default SplashScreen