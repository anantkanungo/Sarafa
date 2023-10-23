// https://github.com/oblador/react-native-vector-icons
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';
import Root from './src/navigation/Root';
import {StatusBar} from 'react-native';
// https://github.com/crazycodeboy/react-native-splash-screen
// import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#454545" />
      <Root />
    </Provider>
  );
};
export default App;
