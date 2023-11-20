import React, {useEffect} from 'react';
// https://reactnavigation.org/docs/getting-started/
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authToken} from '../reduxThunk/Type';
import {customerLogin} from '../reduxThunk/Action';
import LoginScreen from '../User/screens/Loginsecreen';
import StackNavigator from './StackNavigator';
import LoginAdmin from '../Admin/Screens/LoginAdmin';
import AdminStackNavigator from './AdminStackNavigator';

const Stack = createNativeStackNavigator();

const Root = ({token}) => {
  const dispatch = useDispatch();

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
  }, []);

  return (
    <>
      {token === null ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          // initialRouteName="AdminStackNavigator"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
          <Stack.Screen
            name="AdminStackNavigator"
            component={AdminStackNavigator}
          />
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
// export default Root;
