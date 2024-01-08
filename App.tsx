// https://www.npmjs.com/package/react-native-screenshot-prevent
import React from 'react';
import Root from './src/navigation/Root';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {gstore} from './src/reduxThunk/Store';
// https://github.com/crazycodeboy/react-native-splash-screen
// import SplashScreen from 'react-native-splash-screen';

const App = () => {
  return (
    <Provider store={gstore}>
      <NavigationContainer>
        <StatusBar backgroundColor="#454545" />
        <Root />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
