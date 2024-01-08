import React, {useState} from 'react';
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
import BackgroundImage from '../assets/IMG_BACKGROUND.jpg';

const LoginScreen = ({getCustomerDetails, props, navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}>
        <View>
          <Image style={styles.image} source={BackgroundImage} />
          <View style={{marginTop: 100}}>
            <Text style={styles.loginText}>NG Jewellers</Text>
            <Text style={styles.loginText1}>Workshop</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setUserId(e)}
              // label="User"
              autoCapitalize="none"
              placeholder="Workshop Id"
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
