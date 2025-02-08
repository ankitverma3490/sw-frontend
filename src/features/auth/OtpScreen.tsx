import { View, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import CustomText from '@components/ui/CustomText';
import { resetAndNavigate } from '@utils/Navigation';
import { useAuthStore } from '@state/authStore';

const OtpScreen = () => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = useAuthStore()

  const handleOtp = () => {
    setLoading(true);
    try {
      {user?.address!=null?resetAndNavigate('ProductDashboard'):resetAndNavigate("AddAddress")}
    } catch (error) {
      Alert.alert('Invalid OTP', 'Please try again with a valid OTP.');
      console.log('Error in verifying OTP', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <CustomText style={styles.title}>Verify OTP</CustomText>
        <CustomText style={styles.subtitle}>
          Enter the 6-digit OTP sent to your registered phone number.
        </CustomText>
        <CustomInput
          onChangeText={(text) => setOtp(text.slice(0, 6))}
          onclear={() => setOtp('')}
          value={otp}
          left
          placeholder="Enter OTP"
          inputMode="numeric"
          style={styles.input}
        />
        
        <CustomButton
          title="Verify"
          onpress={handleOtp}
          disabled={otp?.length !== 6}
          loading={loading}
         />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
});

export default OtpScreen;
