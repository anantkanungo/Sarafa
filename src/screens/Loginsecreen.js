
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
import BackgroundImage from '../assets/NG_logo.png';
import axios from 'axios';

const LoginScreen = ({ getCustomerDetails, props, navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [buttonVisible, setbuttonVisible] = useState(false);

  const handleAddDetail = () => {
    if (password.length < 2) {
      Alert.alert(
        'Login Failed',
        'Enter valid User Id & Password, please retry',
      );
      return;
    }

    getCustomerDetails(userId, password);
  };

  const getOTP = async (userId) => {
    try {
      const params = {
        userId: userId,
      };
      const response = await axios.put('http://139.59.58.151:8000/getotp', params, {
        headers: {
          Accept: 'application/json',
        },
      });
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
    setbuttonVisible('true')
    Alert.alert(' Contact NG jewels for OTP');

    try {
      const otp = await getOTP(userId);
      console.log(otp)
      Alert.alert('Contact NG jewels for OTP', `OTP: ${JSON.stringify(otp.data.password)}`);


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
          <View style={{ marginTop: 100 }}>
            <Text style={styles.loginText}>NG Jewellers</Text>
            <Text style={styles.loginText1}>Distributor</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setUserId(e)}
              // label="User"
              autoCapitalize="none"
              placeholder="Distributor Id"
              placeholderTextColor="#B8860B"
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
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleOTP}>
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


