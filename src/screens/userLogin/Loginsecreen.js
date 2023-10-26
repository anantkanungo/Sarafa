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
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
