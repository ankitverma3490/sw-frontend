import {
  View,
  Text,
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight} from '@utils/scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';

const NOTICE_HEIGHT = -(NoticeHeight + 12);
const ProductDashboard = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    slideDown();
    const timeId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeId);
              }}
            />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />
            <View style={{backgroundColor: '#F8F8F8', padding: 20}}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                Indoere's lowest Rate
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, marginTop: 10, paddingBottom: 100}}>
                Aapki Apni Dukkan
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};
const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
export default withCollapsibleContext(ProductDashboard);
