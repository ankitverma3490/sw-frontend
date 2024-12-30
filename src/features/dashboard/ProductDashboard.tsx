import { View, Text,Animated as RNAnimated, SafeAreaView } from 'react-native'
import React,{useEffect, useRef} from 'react'
 import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight } from '@utils/scaling'
import Visuals from './Visuals'


 const NOTICE_HEIGHT = -(NoticeHeight+12)
 const ProductDashboard = () => {
   
   const noticePosition =  useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current
   const slideUp = ()=>{
    RNAnimated.timing(noticePosition,{
      toValue:NOTICE_HEIGHT,
      duration:1200,
      useNativeDriver:false,
    }).start()
   }

   const slideDown = ()=>{
    RNAnimated.timing(noticePosition,{
      toValue:0,
      duration:1200,
      useNativeDriver:false,
    }).start()
   }
   useEffect(()=>{
     slideDown()
     const timeId = setTimeout(()=>{
      slideUp()
     }, 3500)
     return ()=>{clearTimeout(timeId)}
   },[])

    return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
      <Visuals/>
      <SafeAreaView>
    <View style={{flex:1}}>
      
      <Text>ProductDashboard</Text>
    </View>
    </SafeAreaView>
    </>
    </NoticeAnimation>
  )
}

export default ProductDashboard