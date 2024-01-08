import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
} from 'react-native';
import styles from './loginStyles';
import {connect} from 'react-redux';
import {AuthFunction, customerLogin} from '../reduxThunk/action/authAction';
// You can use your custom background image
import BackgroundImage from '../assets/NG_logo.png';

const LoginScreen = ({getCustomerDetails, props, navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleAddDetail = () => {
    if (password.length < 3) {
      alert('Password must be at least 5 characters long');
      return;
    }

    getCustomerDetails(userId, password);
    setUserId('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}>
        <View>
          <Image style={styles.image} source={BackgroundImage} />
          <View style={{marginTop: 100}}>
            <Text style={styles.loginText}>NG Jewllers</Text>
            <Text style={styles.loginText1}>Distributor</Text>
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
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setPassword(e)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#b8860b"
              autoCapitalize="none"
              textContentType="password"
              maxLength={20}
              textTansform="lowercase"
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleAddDetail}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
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
