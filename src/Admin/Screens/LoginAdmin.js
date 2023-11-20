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
import {AuthFunction, customerLogin} from '../../reduxThunk/Action';
// You can use your custom background image
import BackgroundImage from '../../assets/IMG_BACKGROUND.jpg';

const LoginAdmin = ({getCustomerDetails, props, navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleAddDetail = () => {
    getCustomerDetails(userId, password);
    setUserId('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={BackgroundImage} />
      <View style={styles.bottomView}>
        <View style={{marginBottom: 40}}>
          <Text style={styles.loginText}>Admin Verification</Text>
          <Text style={styles.loginText1}>Enter the register Admin Id </Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setUserId(e)}
              // label="User"
              placeholder="Admin Id"
              placeholderTextColor="#495057"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={e => setPassword(e)}
              // label="Password"
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#495057"
              autoCapitalize="none"
              textContentType="password"
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            // onPress={handleAddDetail}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// const mapStateToProps = state => {
//   return {
//     loading: state.loading,
//     details: state.login.details,
//     error: state.error,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     AuthFunction,
//     getCustomerDetails: (userId, password) =>
//       dispatch(customerLogin(userId, password)),
//   };
// };
export default LoginAdmin;
// export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);