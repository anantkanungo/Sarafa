// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
// // https://github.com/APSL/react-native-keyboard-aware-scroll-view
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {connect} from 'react-redux';
// import styles from './styles';
// import {RNToasty} from 'react-native-toasty';
// import {
//   AuthFunction,
//   GoogleLoginApi,
//   LoginApi,
// } from '../../redux/actions/authAction';
// import Loading from '../../component/loading';
// import {googleLogin} from '../../services/socialLogin';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import Loader from '../../component/Loader/Loader';
// import messaging from '@react-native-firebase/messaging';

// const LoginScreen = ({navigation, LoginApi, AuthFunction, GoogleLoginApi}) => {
//   const [loading, setLoading] = useState(false);
//   const [secure, setSecure] = useState(true);
//   const [fcm, setFcm] = useState();

//   useEffect(() => {
//     getDeviceToken();
//   }, []);

//   const getDeviceToken = async () => {
//     let fcmToken = await messaging().getToken();
//     console.log('signin fcm : ', fcmToken);
//     setFcm(fcmToken);
//   };

//   const [postData, setPostData] = useState({
//     email: null,
//     password: null,
//   });
//   const handleChange = (name, value) => {
//     setPostData({
//       ...postData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     if (postData.email && postData.password) {
//       LoginApi({...postData, fcm_token: fcm}, data => setLoading(data));
//       setPostData({
//         email: null,
//         password: null,
//       });
//     } else {
//       RNToasty.Error({
//         title: 'Please fill all fields',
//         duration: 2,
//       });
//     }
//   };

//   useEffect(() => {
//     // GoogleSignin.configure();
//     GoogleSignin.configure({
//       androidClientId:
//         '224749907988-9r04i0gq53ktr9c0qef2dh6b4st3jd6l.apps.googleusercontent.com', //debug
//       offlineAccess: true,
//       webClientId:
//         '224749907988-39nk28ebu1dijftbtjvon9tqbrbtdf41.apps.googleusercontent.com',
//     });
//   }, []);

//   const signIn = async () => {
//     // GoogleSignin.configure();
//     try {
//       await GoogleSignin.hasPlayServices();
//       await GoogleSignin.signOut();
//       const userInfo = await GoogleSignin.signIn();
//       console.log('user info : ', userInfo);
//       GoogleLoginApi(userInfo, data => setLoading(data));
//       // setState({ userInfo });
//       // return userInfo
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('sign in cancel : ', error);
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('already in progress : ', error);
//         // operation (e.g. sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log('not available : ', error);
//         // play services not available or outdated
//       } else {
//         console.log(' other error : ');
//         // some other error happened
//       }
//     }
//   };

//   return (
//     <KeyboardAwareScrollView
//       keyboardShouldPersistTaps={'handled'}
//       showsVerticalScrollIndicator={false}
//       style={globalStyles.container}>
//       <StatusBar
//         backgroundColor="transparent"
//         translucent={true}
//         barStyle="light-content"
//       />

//       <Loader loading={loading} />

//       <View style={globalStyles.justify_between}>
//         <View style={globalStyles.center}>
//           <View style={globalStyles.title_box}>
//             <Text style={globalStyles.title}>Log In Now</Text>
//             <Text style={globalStyles.text}>
//               Please login to continue using our app
//             </Text>
//           </View>

//           {/* <InputWithIcon
//             placeholder={'Email Address'}
//             leftIcon={'email'}
//             value={postData.email}
//             onChangeText={text => handleChange('email', text)}
//           />

//           <InputWithIcon1
//             placeholder={'Password'}
//             leftIcon={'lock'}
//             rightIcon={secure ? 'eye-off' : 'eye'}
//             onPress={() => setSecure(!secure)}
//             secureTextEntry={secure}
//             value={postData.password}
//             onChangeText={text => handleChange('password', text)}
//           /> */}
//           <TouchableOpacity
//             style={styles.loginButton}
//             disabled={loading}
//             onPress={handleSubmit}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={globalStyles.row}>
//           <Text style={globalStyles.text}>Don’t have an account? </Text>
//           <TouchableOpacity
//             style={styles.signup_btn}
//             onPress={() => navigation.navigate('SignUp')}>
//             <Text style={styles.signup_text}>Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {
//   LoginApi,
//   AuthFunction,
//   GoogleLoginApi,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

import React, {useState, useContext} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
} from 'react-native';
import styles from './styles';

// You can use your custom background image
import BackgroundImage from '../../assets/IMG_BACKGROUND.jpg';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={BackgroundImage} />
      <View style={styles.bottomView}>
        <View style={{marginBottom: 40}}>
          <Text style={styles.loginText}>User Verification</Text>
          <Text style={styles.loginText1}>Enter the register User Id </Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={email => setEmail(email)}
              label="User"
              placeholder="User Id"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={password => setPassword(password)}
              label="Password"
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
              textContentType="password"
            />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
