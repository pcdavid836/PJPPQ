import 'react-native-gesture-handler';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './context/AuthContext';
import AppNav from './screens/Navigation/AppNav';

const Stack = createNativeStackNavigator();

//AppStack para testing sin login

const App = () => {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}


export default App;
