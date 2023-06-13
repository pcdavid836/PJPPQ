import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const HomeScreen = () => {

  return (
    <View>
      <MapView style={styles.map} />
    </View>
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