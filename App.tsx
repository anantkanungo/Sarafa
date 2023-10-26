import React, {useEffect} from 'react';
import Root from './src/navigation/Root';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// https://github.com/crazycodeboy/react-native-splash-screen
// import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#454545" />
      <Root />
    </NavigationContainer>
  );
};
export default App;
