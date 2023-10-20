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
import {AuthContext} from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

// You can use your custom background image
import BackgroundImage from '../../assets/IMG_BACKGROUND.jpg';

// const login= async(email, password)=>{
// try {
//   const {data} =  await client.post(
//     '/sign-in',
//     {
//       email,
//       password,
//     },
//     {
//         headers: {
//         'Content-Type': "application/json",
//         'Accept': "application/json",
//         }
//     }
//  );
// console.log(data);
//   if (data.success) {
//     alert("7chineh")
//   }else{
//     alert(data.message)
//   }

//   console.log(res.data);
// } catch (e) {
//   console.log(e);

// }
// }

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, login, error} = useContext(AuthContext);
  //   const { setIsLoggedIn, setProfile } = useLogin();
  // const [userInfo, setUserInfo] = useState({
  //   email: '',
  //   password: '',
  // });

  // const [error, setError] = useState('');
  // const { email, password } = userInfo;

  // const handleOnChangeText = (value, fieldName) => {
  //   setUserInfo({ ...userInfo, [fieldName]: value });
  // };

  // const isValidForm = () => {
  //   if (!isValidObjField(userInfo))
  //     return updateError('Required all fields!', setError);

  //   if (!isValidEmail(email)) return updateError('Invalid email!', setError);

  //   if (!password.trim() || password.length < 8)
  //     return updateError('Password is too short!', setError);

  //   return true;
  // };

  // const submitForm = async () => {
  //   if (isValidForm()) {
  //     try {
  //       const res = await client.post('/sign-in', { ...userInfo });

  //       if (res.data.success) {
  //         setUserInfo({ email: '', password: '' });
  //         setProfile(res.data.user);
  //         setIsLoggedIn(true);
  //       }

  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />
      <Image style={styles.image} source={BackgroundImage} />
      <View style={styles.bottomView}>
        <View style={{marginBottom: 40}}>
          <Text style={styles.loginText}>User Verification</Text>
          <Text style={styles.loginText1}>Enter the register User Id </Text>
        </View>
        <View style={styles.wrapper}>
          {error ? (
            <Text style={{color: 'red', fontSize: 18, textAlign: 'center'}}>
              {error}
            </Text>
          ) : null}
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
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              login(email, password);
            }}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
