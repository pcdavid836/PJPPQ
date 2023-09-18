import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from '../Navigation/DrawerNavigation';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {

  return (
     <NavigationContainer independent={true} >
        <DrawerNavigation />
     </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default HomeScreen