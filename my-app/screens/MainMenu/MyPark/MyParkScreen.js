import * as React from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { getUserParkAprobed } from '../../../api';
import MyPlacesItem from '../../../components/MyPlacesItem';
import MyCardPlace from "../MyParkOptions/MyCardPlace";
import { GOOGLE_MAPS_KEY } from '@env';
import { AuthContext } from '../../../context/AuthContext';

const MyParkScreen = ({ navigation }) => {
  const { userInfo } = React.useContext(AuthContext);
  const [origin, setOrigin] = React.useState({
    latitude: -17.393747952368138,
    longitude: -66.1569533552058,
  });

  const [search, setSearch] = React.useState('');
  const [parks, setParks] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedPark, setSelectedPark] = React.useState(null);
  const mapViewRef = React.useRef(null);
  let loc = "Cochabamba, Bolivia";
  React.useEffect(() => {
    getLocationPermission();
  }, []);


  const loadPlaces = async () => {
    const data = await getUserParkAprobed(userInfo.idUsuario);
    setParks(data);

  };


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
    loadPlaces();
    mapViewRef.current.animateToRegion({
      latitude: current.latitude,
      longitude: current.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }

  async function searchLocation() {
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${search + loc}&key=${GOOGLE_MAPS_KEY}`;
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

  const openModal = (park) => {
    //console.log('openModal called with park:', park);
    setSelectedPark(park);
    setModalVisible(true);
  };
  

  const closeModal = () => {
    setSelectedPark(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
        placeholder="Buscar Calles, Plazas, Plazas..."
        onChangeText={setSearch}
        onSubmitEditing={searchLocation}
        value={search}
      />
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        {parks.map((park, index) => {
          //console.log(park);
          return (
            <MyPlacesItem
              key={index}
              park={park}
              onOpenModal={() => openModal(park.idParqueo)}
            />
          );
        })}
      </MapView>
      <View>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={styles.buttonText}>Menú</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        onRequestClose={closeModal}
        visible={modalVisible}
      >
        <MyCardPlace myparkto={selectedPark} closeModal={closeModal} />
      </Modal>
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
  searchBar: {
    width: '100%',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '85%',
  },
  roundButton: {
    position: 'absolute',
    bottom: 65,
    right: -175,
    backgroundColor: 'purple',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default MyParkScreen