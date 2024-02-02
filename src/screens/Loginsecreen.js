import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import styles from './loginStyles';
import { connect } from 'react-redux';
import { AuthFunction, customerLogin } from '../reduxThunk/action/authAction';
// You can use your custom background image
import BackgroundImage from '../assets/NG_logo.png';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const LoginScreen = ({ getCustomerDetails, props, navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [buttonVisible, setbuttonVisible] = useState(false);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        // Request camera permission on Android
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          alert('Camera permission is required for this app.');
          return;
        }

        // Request microphone permission on Android
        const microphonePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (microphonePermission !== PermissionsAndroid.RESULTS.GRANTED) {
          alert('Microphone permission is required for this app.');
          return;
        }

        // Request photo and video permission on Android
        // const storagePermission = await PermissionsAndroid.requestMultiple([
        //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // ]);
        // if (
        //   storagePermission[
        //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        //   ] !== PermissionsAndroid.RESULTS.GRANTED ||
        //   storagePermission[
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        //   ] !== PermissionsAndroid.RESULTS.GRANTED
        // ) {
        //   alert('Storage permission is required for this app.');
        //   return;
        // }
      } else if (Platform.OS === 'ios') {
        // Request camera permission on iOS
        const cameraPermissionStatus = await request(PERMISSIONS.IOS.CAMERA);
        if (cameraPermissionStatus !== RESULTS.GRANTED) {
          alert('Camera permission is required for this app.');
          return;
        }

        // Request microphone permission on iOS
        const microphonePermissionStatus = await request(
          PERMISSIONS.IOS.MICROPHONE,
        );
        if (microphonePermissionStatus !== RESULTS.GRANTED) {
          alert('Microphone permission is required for this app.');
          return;
        }

        // Request photo and video permission on iOS
        // const photoVideoPermissionStatus = await request(
        //   PERMISSIONS.IOS.PHOTO_LIBRARY,
        //   PERMISSIONS.IOS.CAMERA_ROLL,
        // );
        // if (photoVideoPermissionStatus !== RESULTS.GRANTED) {
        //   alert('Photo and video permission are required for this app.');
        //   return;
        // }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []); // Empty dependency array ensures useEffect runs only once after the initial render

  const handleAddDetail = () => {
    if (password.length < 3) {
      Alert.alert(
        'Login Failed',
        'Enter valid User Id & Password, please retry',
      );
      // setUserId('');
      // setPassword('');
      return;
    }

    getCustomerDetails(userId, password);
    // setUserId('');
    // setPassword('');
    // navigation.navigate('BottomTab'); // Navigate to the home screen
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

  // const handleOTP = async () => {
  //   setbuttonVisible('true')
  //   Alert.alert(' Contact NG jewels for OTP', { otp });

  //   try {
  //     const otp = await getOTP(userId);
  //     console.log(otp)
  //     // Alert.alert(' Contact NG jewels for OTP', { otp });
  //     // Process the OTP as needed

  //     // If you want to include the rest of the original code, you can do it here
  //   } catch (error) {
  //     console.error('Error in handleOTP:', error);
  //   }
  // };
  const handleOTP = async () => {
    try {
      const otp = await getOTP(userId);
      console.log(otp);

      // Set the buttonVisible state
      setbuttonVisible(true);

      // Display the OTP in the Alert
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
            <Text style={styles.loginText}>NG JEWELLERS</Text>
            <Text style={styles.loginText1}>Customer</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setUserId(e)}
              autoCapitalize="none"
              placeholder="User Id"
              placeholderTextColor="#B8860b"
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
