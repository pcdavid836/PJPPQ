import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import UserRegister from './screens/UserRegisterScreen';
import UserSignIn from './screens/UserSignInScreen';
import MessageValidationScreen from './screens/MessageValidationScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserSignIn" component={UserSignIn} />
        <Stack.Screen name="MessageValidationScreen" component={MessageValidationScreen} />
        <Stack.Screen name="UserRegister" component={UserRegister} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />



        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
