import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';
interface CustomButtonProps {
  title: string;
  onpress: () => void;
  disabled: boolean;
  loading: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onpress,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {backgroundColor: disabled ? Colors.disabled : Colors.secondary},
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <CustomText
          variant="h6"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: '100%',
  },
  text: {
    color: 'white',
  },
});

export default CustomButton;
