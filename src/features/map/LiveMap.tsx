import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { screenHeight } from '@utils/scaling'
import { Colors } from '@utils/Constants'

const LiveMap = () => {
  return (
    <View style={styles.contsiner}>
      <Text>LiveMap</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    contsiner:{
        height:screenHeight*0.35,
        width:'100%',
        borderRadius:15,
        backgroundColor:'#fff',
        overflow:'hidden',
        borderWidth:1,
        borderColor:Colors.border,
        position:'relative'
    }
})
export default LiveMap