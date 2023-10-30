import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { GOOGLE_MAPS_KEY } from '@env';

export default function PlaceMyLocation({ closeModal, onLocationSelect }) {
  const [location, setLocation] = React.useState(null);
  const [origin, setOrigin] = React.useState({
    latitude: -17.393747952368138,
    longitude: -66.1569533552058,
  });

  const [search, setSearch] = React.useState('');
  const [parks, setParks] = React.useState([]);
  const mapViewRef = React.useRef(null);
  const [region, setRegion] = React.useState({
    latitude: -17.393747952368138,
    longitude: -66.1569533552058,
    latitudeDelta: 0.005,
    longitudeDelta: 0.004,
  });


  const [marker, setMarker] = React.useState(null);

  React.useEffect(() => {
    getLocationPermission();
  }, []);

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso denegado');
      return;
    }
    let actualLoc = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: actualLoc.coords.latitude,
      longitude: actualLoc.coords.longitude,
    };
    setOrigin(current);
    mapViewRef.current.animateToRegion({
      latitude: current.latitude,
      longitude: current.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }

  async function searchLocation() {
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${GOOGLE_MAPS_KEY}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      mapViewRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }

  function onMapPress(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({
      coordinate: {
        latitude,
        longitude,
      },
    });
  }

  async function sendLocation() {
    if (marker) {
      const { latitude, longitude } = marker.coordinate;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`);
      const data = await response.json();
      const address = data.results[0].formatted_address;
      closeModal()

      Alert.alert(
        'Ubicación Enviada',
        `Latitud: ${latitude}\nLongitud: ${longitude}\nDirección: ${address}`,
        [
          {
            text: 'OK', onPress: () => {
              onLocationSelect({ latitude, longitude, address });
              closeModal();
            }
          },
        ]
      );
    } else {
      Alert.alert(
        'Error',
        'Primero selecciona una ubicación en el mapa.',
        [
          { text: 'OK' },
        ]
      );
    }
  }


  return (
    <View>
      <SearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
        placeholder="Buscar Calles, Avenidas, Plazas..."
        onChangeText={setSearch}
        onSubmitEditing={searchLocation}
        value={search}
      />
      <MapView
        ref={mapViewRef}
        initialRegion={region}
        style={styles.map}
        googleMapsApiKey={GOOGLE_MAPS_KEY}
        showsUserLocation={true}
        onPress={onMapPress}
      >
        {marker && <Marker coordinate={marker.coordinate} />}
      </MapView>
      <TouchableOpacity
        style={styles.sendLocationButton}
        onPress={sendLocation}
      >
        <Text style={styles.sendLocationButtonText}>Enviar ubicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '90%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sendLocationButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center', // Alineación vertical y horizontal al centro
  },
  sendLocationButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
