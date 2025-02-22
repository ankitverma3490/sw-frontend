import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {useCartStore} from '@state/CartStore';
import {fetchCustomerOrders} from '@services/orderService';
import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import OrderItem from './OrderItem';
import { storage, tokenStorage } from '@state/Storage';
import { navigate, resetAndNavigate } from '@utils/Navigation';
 
const Profile: FC = () => {
  const [orders, setOrders] = useState([]);
  const {logout, user} = useAuthStore();
  const {clearCart} = useCartStore();
  const fetchOrders = async () => {
    const data = await fetchCustomerOrders(user?._id);
    setOrders(data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const renderHeader = () => {
    return (
      <View>
        <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
          Your Account
        </CustomText>
        <CustomText variant="h7" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomText>
        <WalletSection/>
        <CustomText>YOUR INFORMATION</CustomText>
        <ActionButton icon='book-outline' label='Address book'/>
        <ActionButton icon='information-circle-outline' label='About'/>
        <ActionButton icon='log-out-outline' label='Logout' onPress={()=>{
          clearCart()
          logout()
          tokenStorage.clearAll()
          storage.clearAll()
          resetAndNavigate('CustomerLogin')
        }}/>
        <CustomText>PAST ORDERS</CustomText>
      </View>
    );
  };
  const renderOrders = ({item,index}:any)=>{
   return(
    <OrderItem item={item} index={index}/>
   )
  }
  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" onPress={()=>navigate('ProductDashboard')}/>
      <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item: any) => item?.orderId}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
});
export default Profile;
