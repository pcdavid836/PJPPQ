import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraProfileScreen from '../MainMenu/TakePhoto/CameraProfile';

const GroupStack = createNativeStackNavigator();

function StackNavigationGroup() {
  return (
    <GroupStack.Navigator initialRouteName='CameraProfileScreen' screenOptions={{ headerShown: false }}>
      <GroupStack.Screen name="CameraProfileScreen" component={CameraProfileScreen} />
    </GroupStack.Navigator>
  );
}

export default StackNavigationGroup;