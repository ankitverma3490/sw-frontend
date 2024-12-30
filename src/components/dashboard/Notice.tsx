import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '@components/ui/CustomText';
import {NoticeHeight} from '@utils/scaling';
import {Fonts} from '@utils/Constants';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

const Notice = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}>
              it's Rainning near your location
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Our Delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none" 
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="323" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccd5e4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccd5e4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    textAlign: 'center',
    color: '#2D3875',
    marginBottom: 8,
  },
  wave:{
    width:'100%',
    transform:[{rotateX:'180deg'}]
  }
});

export default Notice;
