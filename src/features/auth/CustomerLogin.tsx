import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/Navigation';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyBoardOffsetHeight from '@utils/useKeyBoardOffsetHeight';
const CustomerLogin: FC = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const keyboardOffsetHeight = useKeyBoardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleAuth = async () => {};

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state == State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode={'on-drag'}
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={styles.subContainer}
              style={{transform: [{translateY: animatedValue}]}}>
              <View style={styles.content}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  {' '}
                  Indore's lowest price
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Login or Sign Up
                </CustomText>
                <CustomInput
                  onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                  onclear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  left={
                    <CustomText
                      style={styles.phoneText}
                      fontFamily={Fonts.SemiBold}
                      variant="h6">
                      +91
                    </CustomText>
                  }
                  placeholder="Enter your mobile number"
                  // keyboardType="number-pad"
                  inputMode="numeric"
                />
                <CustomButton
                  title="Continue"
                  onpress={() => handleAuth()}
                  disabled={phoneNumber?.length != 10}
                  loading={loading}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText>
              By continuing,you agree to our terms of service & Privacy policy
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 19,
  },
  logo: {
    height: 49,
    width: 49,
    borderRadius: 20,
    marginVertical: 9,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
});

export default CustomerLogin;
