import 'react-native-gesture-handler';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider } from './context/AuthContext';
import AppNav from './screens/Navigation/AppNav';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);


const Stack = createNativeStackNavigator();

//AppStack para testing sin login

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider skipInstanceCheck >
        <AppNav/>
      </MenuProvider>
    </AuthProvider>
  );
}




export default App;
