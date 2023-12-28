import React, {useState} from 'react';
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
import BackgroundImage from '../assets/IMG_BACKGROUND.jpg';

const LoginScreen = ({getCustomerDetails, props, navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleAddDetail = () => {
    if (password.length < 4) {
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
        <Image style={styles.image} source={BackgroundImage} />
        <View style={{marginTop: 100}}>
          <Text style={styles.loginText}>NG Jewllers</Text>
          <Text style={styles.loginText1}>Distributor </Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setUserId(e)}
              // label="User"
              autoCapitalize="none"
              placeholder="Enter Id"
              placeholderTextColor="#B8860B"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setPassword(e)}
              // label="Password"
              secureTextEntry={true}
              placeholder="Password"
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
