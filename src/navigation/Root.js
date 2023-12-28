import React, {useEffect, useState} from 'react';
// https://reactnavigation.org/docs/getting-started/
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authToken} from '../reduxThunk/Type';
import {customerLogin} from '../reduxThunk/action/authAction';
import LoginScreen from '../screens/Loginsecreen';
import StackNavigator from './StackNavigator';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

const Root = ({token, navigation}) => {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(true);

  const preLoad = async () => {
    try {
      const value = await AsyncStorage.getItem('@AuthToken');
      if (value !== null) {
        dispatch({
          type: authToken,
          payload: value,
        });
      }
    } catch (error) {
      console.log('🚀Root error: ', error);
    }
  };

  useEffect(() => {
    preLoad();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <>
      {token === null ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
        </Stack.Navigator>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.login.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomerDetails: (userId, password) =>
      dispatch(customerLogin(userId, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
