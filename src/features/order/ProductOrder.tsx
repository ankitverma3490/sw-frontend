import {View, Text, StyleSheet, ScrollView, Image, Platform, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors, Fonts} from '@utils/Constants';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useCartStore} from '@state/CartStore';
import BillDetails from './BillDetails';
import { hocStyles } from '@styles/GlobalStyles';
import { useAuthStore } from '@state/authStore';
import ArrowButton from '@components/ui/ArrowButton';
import { navigate } from '@utils/Navigation';
import { createOrder } from '@services/orderService';

const ProductOrder: FC = () => {
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const {user , currentOrder ,setCurrentOrder}= useAuthStore()
  const totalItemPrice = getTotalPrice();
  const [loading,setLoading] = useState(false)

  const handlePlaceOrder = async()=>{
        if(currentOrder!==null){
          console.log(currentOrder)
            Alert.alert("Let your first order to be delivered")
            return
        }
        const formattedData = cart.map(item=>({
            id: item._id,
            item: item.item,
            count: item.count
        }))
        if(formattedData.length==0){
            Alert.alert("Add items to place order")
            return
        }
        setLoading(true)
        const data = await createOrder(formattedData,totalItemPrice)
        if(data!=null){
            setCurrentOrder(data)
            clearCart()
            navigate('OrderSuccess',{...data})
        }else{
            Alert.alert("There was an Error")
        }
        setLoading(false)
  }
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        {/* coupon section */}
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/coupon.png')}
              style={{width: 25, height: 25}}
            />
            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              style={styles.cancelText}
              variant="h8"
              fontFamily={Fonts.SemiBold}>
              Orders can not be cancelled once packed for delivery, In case of
              Unexpected delays,a refund will be Provided if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
            <View style={styles.addressContainer}>
                <View style={styles.flexRow}>
                    <Image source={require('@assets/icons/home.png')} style={{width:20,height:20}}/>
                    <View style={{width:'75%'}}>
                        <CustomText variant='h8' fontFamily={Fonts.Medium }>Delivering to  Home</CustomText>
                        <CustomText variant='h9' numberOfLines={2} style={{opacity:0.6}}>{user?.address}</CustomText>
                    </View>
                </View>
                <TouchableOpacity>
                    <CustomText variant='h8' style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>Change</CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.paymentGateway}>
                <View style={{width:'30%'}}>
                  <CustomText fontSize={RFValue(6)}>💵 PAY USING</CustomText>
                  <CustomText variant='h9' style={{marginTop:2}} fontFamily={Fonts.Regular}>Cash On Delivery</CustomText>
                </View>
                <View style={{width:'70%'}}>
                  <ArrowButton
                  loading={loading}
                  price={totalItemPrice}
                  title='Place Order'
                  onPress={async()=>{
                    await handlePlaceOrder()
                  }}
                  />
                </View>

            </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  flexRowBetween: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  absoluteContainer:{
    marginVertical:15,
    marginBottom: Platform.OS=='ios'?30:10
  },
  addressContainer:{
    justifyContent:"space-between",
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:10,
    paddingBottom:10,
    borderBottomWidth:0.7,
    borderColor:Colors.border
  },
  paymentGateway:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:14
  }
});
export default ProductOrder;
