import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { FC } from 'react'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from '@utils/Navigation'
import { useAuthStore } from '@state/authStore'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
 interface LiveHeaderProps{
    type:'Customer' | 'Delivery'
    title:string
    secondTitle:string
}
const LiveHeader:FC<LiveHeaderProps> = ({type,title,secondTitle}) => {
    const isCoustomer = type==='Customer'
    const {currentOrder,setCurrentOrder}= useAuthStore()
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={()=>{
            if(isCoustomer){
                navigate("ProductDashboard")
                if(currentOrder?.status=='delivered'){
                    setCurrentOrder(null)
                }
                return
            }
            navigate("DeliveryDashboard")
        }}>
        <Icon name='chevron-left' color={isCoustomer?'#fff':'#000'} size={RFValue(16)} />
        </Pressable>
        <CustomText variant='h8' fontFamily={Fonts.Medium}
        style={isCoustomer?styles.titleTextWhite:styles.titleTextBlack}
        >{title}</CustomText>
        <CustomText
        variant='h4'
        fontFamily={Fonts.SemiBold}
        style={isCoustomer?styles.titleTextWhite:styles.titleTextBlack}
        >{secondTitle}</CustomText>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
 headerContainer:{
    justifyContent:'center',
    paddingVertical:10,
    alignItems:'center'
 },
 backButton:{
    position:'absolute',
    left:20
 },
 titleTextBlack:{
  color:'black'
 },
 titleTextWhite:{
    color:'white'
 }
})
export default LiveHeader