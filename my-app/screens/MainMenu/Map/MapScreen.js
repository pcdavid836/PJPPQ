import React from 'react'
import MapView from 'react-native-maps'
import { View, Text, StyleSheet } from 'react-native'

const MapScreen = () => {

  return (
   <View style={styles.container}>
      {/*<MapView style={styles.map}/>*/}
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
export default MapScreen;