import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useRef} from 'react';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';
interface SideBarProps {
  selectedCategory: any;
  categories: any;
  onCategoryPress: (category: any) => void;
}
const SideBar: FC<SideBarProps> = ({
  selectedCategory,
  categories,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  console.log("categories->",categories)
  return (
    <View style={styles.SideBar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Animated.View>
          {categories.map((category: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.categoryButton}
                onPress={() => {
                  onCategoryPress;
                }}>
                <View style={styles.imageContainer}>
                  <Animated.Image
                    source={{uri: category.image}}
                    style={styles.image}
                  />
                </View>
                <CustomText fontSize={RFValue(7)} style={{textAlign: 'center'}}>
                  {category?.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  SideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton:{
    padding:10,
    height:100,
    paddingVertical:0,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
  image:{
    width:'80%',
    height:'80%',
    resizeMode:"contain"
  },
  imageContainer:{
    borderRadius:100,
    height:'50%',
    marginBottom:10,
    width:'75%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F3F4F7',
    overflow:'hidden'
  },
  selectedImageContainer:{
    backgroundColor:'#CFFFDB'
  },
  indicator:{
    position:'absolute',
    right:0,
    width:4,
    height:80,
    top:10,
    alignSelf:'center',
    backgroundColor:Colors.secondary,
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15
  }

});
export default SideBar;
