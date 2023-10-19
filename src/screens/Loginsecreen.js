import React, {useState, useContext} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

// You can use your custom background image
import BackgroundImage from '../assets/IMG_20231018_154004.jpg';

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
  const image = {
    uri: 'https://img.freepik.com/free-vector/abstract-shiny-grey-technology-background_1035-12620.jpg?w=740&t=st=1667419101~exp=1667419701~hmac=3bbdef34e890179fbe282cbbf64169f4f1d670dcc98086340713541f09d6ac23',
  };
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
      <Image
        style={{flex: 1, width: null, marginTop: -500}}
        source={BackgroundImage}
      />
      <View style={styles.bottomView}>
        <View style={{marginBottom: 35}}>
          <Text style={styles.loginText}>Phone Verification</Text>
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

          {/* <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Register</Text>
              </TouchableOpacity>
            </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '80%',
  },
  avatar: {
    marginBottom: 37,
    backgroundColor: 'white',
  },
  input: {
    // marginBottom: 12,
    // padding: 5,
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
    // paddingHorizontal: 10,
    height: 40,
    flex: 1,
    fontFamily: 'SourceSansProRegular',
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: 'blue',
  },
  bottomView: {
    // backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 40,
    // paddingHorizontal: 20,
    alignItems: 'center',
  },
  loginText: {
    // fontFamily: 'SourceSansProBold',
    fontSize: 34,
    marginTop: 12,
    marginBottom: 4,
    color: 'white',
    textAlign: 'center',
    fontWieght: 'bold',
  },
  loginText1: {
    // fontFamily: 'SourceSansProBold',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    color: 'white',
    textAlign: 'center',
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#454545',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'SourceSansProBold',
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default LoginScreen;
