import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/ui/CustomText';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import {updateAddress} from '../../services/authService';
import {resetAndNavigate} from '@utils/Navigation';
import { useAuthStore } from '@state/authStore';

const UpdateAddress = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(Boolean);

  const {user} = useAuthStore()
  useEffect(()=>{
    setAddress(user?.address)
  },[])

  const handleAddress = async () => {
    setLoading(true);
    try {
      await updateAddress(address);
      resetAndNavigate('ProductOrder');
    } catch (error) {
      console.log('Error in Upading Address', error); 
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <CustomText style={styles.title}>Delivery Address</CustomText>
        <CustomText style={styles.subtitle}>Update Your Address</CustomText>
        <CustomInput
          onChangeText={text => setAddress(text)}
          onclear={() => setAddress('')}
          value={address}
          left
          placeholder="Enter Address"
          style={styles.input}
        />

        <CustomButton
          title="Update"
          onpress={handleAddress}
          disabled={address?.length <= 2}
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
export default UpdateAddress;
