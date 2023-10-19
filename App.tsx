import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#454545" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
