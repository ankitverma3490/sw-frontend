import {View,StyleSheet, ScrollView, Alert} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {confirmOrder, getOrderById, sendLiveOrderUpdates} from '@services/orderService';
import {Colors} from '@utils/Constants';
import {useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import LiveHeader from '@features/map/LiveHeader';
import LiveMap from '@features/map/LiveMap';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import { hocStyles } from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';
const DeliveryMap: FC = () => {
  const user = useAuthStore(state => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const route = useRoute();
  const {setCurrentOrder} = useAuthStore();
  const orderDetails = route?.params as Record<string, any>;
  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?._id as any);
    setOrderData(data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setMyLocation({latitude, longitude});
      },
      err => console.log('Error Fetching Geolocation', err),
      {enableHighAccuracy: true, distanceFilter: 10},
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);
  const acceptOrder = async ()=>{
    const data = await  confirmOrder(orderData?._id,myLocation)
    if(data){
        setCurrentOrder(data)
        Alert.alert('Order Accepted, Grab Your Package')
    }else{
        Alert.alert('There was an error')
    }
    fetchOrderDetails()
  }
  const orderPickedUp = async ()=>{
    const data = await  sendLiveOrderUpdates(orderData?._id,myLocation,'arriving')
    if(data){
        setCurrentOrder(data)
        Alert.alert('Order Accepted, Grab Your Package')
    }else{
        Alert.alert('There was an error')
    }
    fetchOrderDetails()
  }
  console.log(user)
  const orderDelivered = async ()=>{
    const data = await  sendLiveOrderUpdates(orderData?._id,myLocation,'delivered')
    if(data){
        setCurrentOrder(data)
        Alert.alert('Order Accepted, Grab Your Package')
    }else{
        Alert.alert('There was an error')
    }
    fetchOrderDetails()
  }

  let message = 'Start this order';
  if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'confirmed'
  ) {
    message = 'Grab your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status === 'arriving'
  ) {
    message = 'Complete your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    (orderData?.status).toLocaleLowerCase() === 'delivered'
  ) {
    message = 'Your milestone';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status != 'available'
  ) {
    message = 'You missed it';
  }
  useEffect(() => {
    async function sendLiveUpdates() {
      if (
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status != 'delivered' &&
        orderData?.status != 'cancelled'
      ) {
        await sendLiveOrderUpdates(
          orderData._id,
          myLocation,
          orderData?._status,
        );
        fetchOrderDetails();
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <LiveHeader
        type="Delivery"
        title={message}
        secondTitle="Delivery in 20 minutes"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />

        <DeliveryDetails details={orderData?.customer} />
        <OrderSummary order={orderData} />
      </ScrollView>
      {orderData?.status !='delivered' && orderData?.status !='cancelled' &&
      <View style={[hocStyles.cartContainer,styles.btnContainer]}>
          {orderData?.status==='available' && 
          <CustomButton 
          disabled={false}
          title='Accept Order'
          onpress={acceptOrder}
          loading={false}
          />
          }
          {orderData?.status==='confirmed' && orderData?.deliveryPartner?._id=== user._id &&
          <CustomButton 
          disabled={false}
          title='Order Picked Up'
          onpress={orderPickedUp}
          loading={false}
          />
          }
          {orderData?.status==='arriving' && orderData?.deliveryPartner?._id=== user._id &&
          <CustomButton 
          disabled={false}
          title='Delivered'
          onpress={orderDelivered}
          loading={false}
          />
          }
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer:{
    padding:10
  }
});
export default DeliveryMap;
