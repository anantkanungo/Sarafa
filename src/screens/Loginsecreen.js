import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from './loginStyles';
import { connect } from 'react-redux';
import { AuthFunction, customerLogin } from '../reduxThunk/action/authAction';
// You can use your custom background image
import BackgroundImage from '../assets/NG_logo.png';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const LoginScreen = ({ getCustomerDetails, props, navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [buttonVisible, setbuttonVisible] = useState(false);
  const [email, setemail] = useState('');

  const handleAddDetail = () => {
    if (password.length < 2) {
      Alert.alert(
        'Login Failed',
        'Enter valid Password, Please try again',
      );
      return;
    }

    getCustomerDetails(userId, password);
  };

  const getOTP = async (userId) => {
    try {
      const params = {
        userId: userId,
        device_info: deviceJSON
      };
      const response = await axios.put('http://139.59.58.151:8000/getotp', params, {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('Response:', response);
      console.log('Response data:', response.data);
      // console.log('message user:', response.data.message);
      return response.data; // Assuming the OTP is in the response data
    } catch (error) {
      console.error('Failed to get OTP. Error message:', error.message);
      console.error('Failed to get OTP. Error:', error);
      throw error; // Rethrow the error to handle it outside this function if needed
    }
  };
  const handleOTP = async () => {
    if (userId.length < 2) {
      Alert.alert(
        'Login Failed',
        'Enter valid User Id.',
      );
      return;
    }
    Alert.alert(' Contact NG jewels for OTP');
    try {
      const otp = await getOTP(userId);
      console.log(otp);
      if (otp.message === 'Invalid User') {
        Alert.alert(
          'Login Failed',
          'Enter valid User Id.',
        );
      } else {
        setbuttonVisible('true')
      }
      // Process the OTP as needed

      // If you want to include the rest of the original code, you can do it here
    } catch (error) {
      console.error('Error in handleOTP:', error);
    }
  };
  // Device info
  const deviceJSON = {};
  deviceJSON.systemName = DeviceInfo.getSystemName();
  deviceJSON.systemVersion = DeviceInfo.getSystemVersion();
  deviceJSON.appName = DeviceInfo.getApplicationName();
  deviceJSON.brand = DeviceInfo.getBrand();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}>
        <View>
          <Image style={styles.image} source={BackgroundImage} />
          <View style={{ marginTop: 100 }}>
            <Text style={styles.loginText}>NG Jewellers</Text>
            <Text style={styles.loginText1}>Karigar</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          {/* <View style={styles.inputView}>
<TextInput
style={styles.input}
onChangeText={e => setemail(e)}
// label="User"
autoCapitalize="none"
placeholder="Enter Your Email"
placeholderTextColor="#B8860B"
keyboardType='email-address'
/>
</View> */}
          {buttonVisible ? (
            <>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={e => setPassword(e)}
                  // label="Password"
                  secureTextEntry={true}
                  placeholder="Enter OTP"
                  placeholderTextColor="#B8860B"
                  autoCapitalize="none"
                  textContentType="password"
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleAddDetail}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={e => setUserId(e)}
                  // label="User"
                  autoCapitalize="none"
                  placeholder="Karigar Id"
                  placeholderTextColor="#B8860B"
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleOTP}>
                <Text style={styles.loginButtonText}>Generate OTP</Text>
              </TouchableOpacity>
            </>
          )}

        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AuthFunction,
    getCustomerDetails: (userId, password) =>
      dispatch(customerLogin(userId, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
