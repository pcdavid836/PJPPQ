import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import UserRegister from '../UserRegisterScreen';
import UserSignIn from '../UserSignInScreen';
import MessageValidationScreen from '../MessageValidationScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import NewPasswordScreen from '../NewPasswordScreen';
import VerificationCodeScreen from '../VerificationCodeScreen';
import UserRegisterExternal from '../UserExternalRegister';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator name="AuthStack" screenOptions={{ headerShown: false }  }>
        <Stack.Screen name="UserSignIn" component={UserSignIn} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />  
        <Stack.Screen name="MessageValidationScreen" component={MessageValidationScreen} />
        <Stack.Screen name="UserRegister" component={UserRegister} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen} />
        <Stack.Screen name="UserRegisterExternalScreen" component={UserRegisterExternal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack;