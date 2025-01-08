import { View,StyleSheet, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore'
import DeliveryHeader from '@components/delivery/DeliveryHeader'
import TabBar from './TabBar'
import { fetchOrders } from '@services/orderService'
import CustomText from '@components/ui/CustomText'
import OrderItem from './OrderItem'

const DeliveryDashboard = () => {
  const{user} = useAuthStore()
  const [selectedTab , setSelectedTab] = useState <'available' | 'delivered'>('available')
  const [loading ,setLoading] = useState<boolean>(false)
  const [data ,setData] = useState<any[]>([])
  const [refreshing ,setRefreshing] = useState<boolean>(true)
   const fetchData = async()=>{
    setData([])
    setRefreshing(true)
    setLoading(true)
    const data = await fetchOrders(selectedTab,user?._id,user?.branch)
    setData(data)
    setRefreshing(false)
    setLoading(false)
   }
   useEffect(()=>{
    fetchData()
  },[selectedTab])

  const renderOrderItem =({item,index}:any)=>{
   return(
    <OrderItem item={item} index={index}/>
   )
  }
  return (
    <View style={styles.container}>
       <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email}/>
        </SafeAreaView>
       <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab}/>
        <FlatList data={data}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={async()=> await fetchData()}
          />
        }
        ListEmptyComponent={()=>{
          if(loading){
            return(
              <View style={styles.center}>
                <ActivityIndicator color={Colors.secondary} size='small'/>
              </View>
            )
          }
          return(
            <View style={styles.center}>
              <CustomText>No orders found yet</CustomText>
            </View>
          )
        }}
        renderItem={renderOrderItem}
        keyExtractor={(item)=>item.orderId}
        contentContainerStyle={styles.flatlistContainer}
        />
       </View>
       
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.primary
  },
  subContainer:{
    backgroundColor:Colors.backgroundSecondary,
     padding:6
  },
  flatlistContainer:{
    padding:2
  },
  center:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:50
  }
})
export default DeliveryDashboard