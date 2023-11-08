import React, {useEffect} from 'react';
// https://reactnavigation.org/docs/getting-started/
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect, useDispatch, useSelector} from 'react-redux';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
// import {authToken} from '../reduxThunk/Type';
import {authToken, customerLogin} from '../reduxThunk/Action';
import LoginScreen from '../screens/Loginsecreen';
import BottomTab from './BottomTab';
// import StackNavigator from '../navigation/stackNavigator';

const Stack = createNativeStackNavigator();

const Root = ({token}) => {
  // const token = useSelector(state => state.login.details);
  const dispatch = useDispatch();

  const preLoad = async () => {
    await AsyncStorage.getItem('@AuthToken')
      .then(value => {
        // console.log(value)
        if (value) {
          dispatch({
            type: authToken,
            payload: value,
          });
        }
      })
      .catch(err => console.log('Root error : ', err));
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        {token === null ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="BottomTab" component={BottomTab} />
        )}
      </Stack.Navigator>
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
