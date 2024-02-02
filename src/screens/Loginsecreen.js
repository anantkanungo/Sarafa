import React, {useEffect, useState} from 'react';
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
import {connect} from 'react-redux';
import {AuthFunction, customerLogin} from '../reduxThunk/action/authAction';
// You can use your custom background image
import BackgroundImage from '../assets/NG_logo.png';
import axios from 'axios';

const LoginScreen = ({getCustomerDetails, props, navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [buttonVisible, setbuttonVisible] = useState(false);

  const handleAddDetail = () => {
    if (password.length < 3) {
      alert('Password must be at least 5 characters long');
      return;
    }

    getCustomerDetails(userId, password);
    setUserId('');
    setPassword('');
  };

  const getOTP = async userId => {
    try {
      const params = {
        userId: userId,
      };
      const response = await axios.put(
        'http://139.59.58.151:8000/getotp',
        params,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log('Response:', response);
      console.log('Response data:', response.data);
      return response.data; // Assuming the OTP is in the response data
    } catch (error) {
      console.error('Failed to get OTP. Error message:', error.message);
      console.error('Failed to get OTP. Error:', error);
      throw error; // Rethrow the error to handle it outside this function if needed
    }
  };

  const handleOTP = async () => {
    setbuttonVisible('true');
    Alert.alert(' Contact NG jewels for OTP');
    try {
      const otp = await getOTP(userId);
      console.log(otp);
      // Process the OTP as needed

      // If you want to include the rest of the original code, you can do it here
    } catch (error) {
      console.error('Error in handleOTP:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}>
        <View>
          <Image style={styles.image} source={BackgroundImage} />
          <View style={{marginTop: 100}}>
            <Text style={styles.loginText}>NG JEWELLERS</Text>
            <Text style={styles.loginText1}>Karigar</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setUserId(e)}
              autoCapitalize="none"
              placeholder="Enter Id"
              placeholderTextColor="#b8860b"
              maxLength={20}
              textTansform="lowercase"
            />
          </View>
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
            <TouchableOpacity style={styles.loginButton} onPress={handleOTP}>
              <Text style={styles.loginButtonText}>Generate OTP</Text>
            </TouchableOpacity>
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
