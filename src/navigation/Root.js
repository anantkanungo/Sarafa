import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
// https://reactnavigation.org/docs/getting-started/
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useDispatch} from 'react-redux';
import {AUTH_TOKEN} from '../redux/Types';
import {InitialCall} from '../redux/actions/authAction';
import Loading from '../components/loading/Loading';
import LoginScreen from '../screens/userLogin/Loginsecreen';
// import StackNavigator from '../navigation/stackNavigator';

const Stack = createNativeStackNavigator();

const Root = ({token, InitialCall}) => {
  const [rootLoading, setRootLoading] = useState(true);
  const dispatch = useDispatch();

  const preLoad = async () => {
    await AsyncStorage.getItem('@USER_TOKEN')
      .then(value => {
        // console.log(value)
        if (value) {
          dispatch({
            type: AUTH_TOKEN,
            payload: value,
          });
          setRootLoading(false);
        } else {
          setRootLoading(false);
        }
      })
      .catch(err => console.log('Root error : ', err));
  };

  useEffect(() => {
    preLoad();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // GetUserDataApi()
  }, []);

  useEffect(() => {
    InitialCall();
  }, []);

  // console.log("root token : ", token)
  // console.log("root loading : ", rootLoading)
  // token = null

  return (
    <NavigationContainer>
      {rootLoading ? (
        <Loading loading={rootLoading} />
      ) : token == null ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={() => ({
            headerShown: false,
          })}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        {
          /* <Stack.Navigator
          initialRouteName="StackNavigator"
          screenOptions={() => ({
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}>
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
        </Stack.Navigator> */
        }
      )}
    </NavigationContainer>
  );
};
const mapStateToProps = state => ({
  token: state.auth.token,
  // userData: state.auth.userData,
});

const mapDispatchToProps = {
  InitialCall,
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
