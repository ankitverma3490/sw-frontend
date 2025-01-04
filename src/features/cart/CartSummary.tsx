import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {screenHeight, screenWidth} from '@utils/scaling';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import { navigate } from '@utils/Navigation';
interface cartSummaryProps {
  cartCount: number;
  cartImage: string;
}
const CartSummary: FC<cartSummaryProps> = ({cartCount, cartImage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRowGap}>
        <Image
          style={styles.image}
          source={
            cartImage === null
              ? require('@assets/icons/bucket.png')
              : {uri: cartImage}
          }
        />
        <CustomText fontFamily={Fonts.SemiBold}>
          {cartCount}ITEM{cartCount > 1 ? 'S' : ''}
        </CustomText>
        <Icon
          name="arrow-drop-up"
          color={Colors.secondary}
          size={RFValue(25)}
        />
      </View>
      <TouchableOpacity
      style={styles.btn} 
      activeOpacity={0.7}
      onPress={()=>navigate("ProductOrder")}>
<CustomText style={styles.btnText} fontFamily={Fonts.Medium} >Next</CustomText>
<Icon
          name="arrow-right"
          color= "#fff"
          size={RFValue(25)}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenHeight * 0.03,
    paddingTop: screenHeight * 0.014,
  },
  flexRowGap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: screenWidth * 0.03,
  },
  image: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.025,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: screenHeight * 0.01,
    borderRadius: screenWidth * 0.025,
    backgroundColor: Colors.secondary,
    paddingHorizontal: screenWidth * 0.1,
  },
  btnText: {
    marginLeft: screenWidth * 0.02,
    color: '#fff',
  },
});
export default CartSummary;
