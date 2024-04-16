import * as React from 'react';
import { useState } from 'react';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { getParks, getParksByFilter } from '../../../api';
import PlacesItem from '../../../components/PlacesItem/PlacesItem';
import CardPlace from "../MapOptions/CardPlace/CardPlace";
import { SelectCountry } from 'react-native-element-dropdown';
import { CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GOOGLE_MAPS_KEY } from '@env';

const MapScreen = ({ navigation }) => {
  const [origin, setOrigin] = React.useState({
    latitude: -17.393747952368138,
    longitude: -66.1569533552058,
  });

  const [search, setSearch] = React.useState('');
  const [parks, setParks] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleFilter, setModalVisibleFilter] = React.useState(false);
  const [selectedPark, setSelectedPark] = React.useState(null);
  const mapViewRef = React.useRef(null);
  let loc = "Cochabamba, Bolivia";
  React.useEffect(() => {
    getLocationPermission();
  }, []);

  const [checkedTypes, setCheckedTypes] = React.useState([]);
  const [parkType, setParkType] = React.useState(1);
  const [availability, setAvailability] = React.useState(1);
  const [vehicleTypes, setVehicleTypes] = React.useState([1, 2, 3, 4, 5, 6, 7]);

  const [dogSearch, setDoggy] = useState({
    Disponibilidad: [1],
    Tipo_Parqueo_idTipo_Parqueo: 1,
    tipo_vehiculo_ids: [1],
  });


  const local_data = [
    {
      value: '1',
      lable: 'Privado',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '2',
      lable: 'Publico',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '3',
      lable: 'Taller mecánico',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '4',
      lable: 'Taller de bicicletas',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
  ];

  const local_data2 = [
    {
      value: '1',
      lable: 'Si',
    },
    {
      value: '0',
      lable: 'No',
    },
    {
      value: '1, 0',
      lable: 'Ambos',
    },
  ];

  const getVehicleTypeLabel = (type) => {
    switch (type) {
      case 1: return 'Automóvil';
      case 2: return 'Motocicleta';
      case 3: return 'Bicicleta';
      case 4: return 'Camión';
      case 5: return 'Autobus';
      case 6: return 'Minibus';
      case 7: return 'Otros';
    }
  };

  const handleNoPlacesFound = async () => {
    // Mostrar la alerta
    alert('Puntos no encontrados');
    // Cargar los lugares
    await loadPlacesFail();
  };

  const handleCheckboxChange = (type) => {
    // Actualizar el estado checkedTypes
    setCheckedTypes(checkedTypes.includes(type)
      ? checkedTypes.filter(t => t !== type)
      : [...checkedTypes, type]
    );

    // Actualizar el estado dogSearch
    setDoggy(prevState => ({
      ...prevState,
      tipo_vehiculo_ids: checkedTypes.includes(type)
        ? checkedTypes.filter(t => t !== type)
        : [...checkedTypes, type]
    }));
  };



  const handleFilterSubmit = async () => {
    // Verificar si los campos están vacíos o nulos
    if (!dogSearch.Disponibilidad.length || !dogSearch.Tipo_Parqueo_idTipo_Parqueo || !dogSearch.tipo_vehiculo_ids.length) {
      // Mostrar una alerta al usuario
      alert('Por favor, ingresa todos los datos');
      return;
    }

    // Verificar si los campos son arrays
    if (!Array.isArray(dogSearch.Disponibilidad) || !Array.isArray(dogSearch.tipo_vehiculo_ids)) {
      // Mostrar una alerta al usuario
      alert('Los campos Disponibilidad y tipo_vehiculo_ids deben ser arrays');
      return;
    }

    // Si todo está bien, proceder con la solicitud
    const data2 = await getParksByFilter(dogSearch)

    // Verificar si data2 contiene un mensaje de error
    if (!data2 || data2.length === 0 || data2.mensaje) {
      // Mostrar una alerta al usuario
      alert('No se encontró ningún parqueo');
      // No cerrar el modal
      return;
    }

    // Si todo está bien, actualizar el estado de parks y cerrar el modal
    setParks(data2);
    setModalVisibleFilter(false);
  };

  const loadPlaces = async () => {
    const data = await getParks();
    setParks(data);

    //cargar datos de busuqeda
    setDoggy({
      Disponibilidad: [availability],
      Tipo_Parqueo_idTipo_Parqueo: parkType,
      tipo_vehiculo_ids: checkedTypes,
    });
    //console.log(dogSearch);
  };

  const loadPlacesFail = async () => {
    const data = await getParks();
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
    setSelectedPark(park);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPark(null);
    setModalVisible(false);
  };

  const openModalFilter = () => {
    setModalVisibleFilter(true);
  };

  const closeModalFilter = () => {
    setModalVisibleFilter(false);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
        placeholder="Buscar Calles, Avenidas, Plazas..."
        onChangeText={setSearch}
        onSubmitEditing={searchLocation}
        value={search}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
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
        {parks.map((park, index) => (
          <PlacesItem
            key={index}
            park={park}
            onOpenModal={openModal}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.searcherButton}
        onPress={() => openModalFilter()}
      >
        <View style={styles.viewUnion}>
          <Ionicons name="search-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Selección específica</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        onRequestClose={() => setModalVisibleFilter(false)}
        visible={modalVisibleFilter}
        transparent={true}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <Text style={styles.text}>Tipo de parqueo:</Text>
            <SelectCountry
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              maxHeight={200}
              value={parkType}
              data={local_data}
              valueField="value"
              labelField="lable"
              imageField="image"
              placeholder="Seleccionar"
              searchPlaceholder="Buscar..."
              onChange={e => {
                setParkType(e.value);
                setDoggy(prevState => ({
                  ...prevState,
                  Tipo_Parqueo_idTipo_Parqueo: e.value
                }));
              }}
            />

            <Text style={styles.text}>Disponible?</Text>
            <SelectCountry
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              maxHeight={200}
              value={availability}
              data={local_data2}
              valueField="value"
              labelField="lable"
              placeholder="Seleccionar"
              searchPlaceholder="Buscar..."
              onChange={e => {
                setAvailability(e.value);
                setDoggy(prevState => ({
                  ...prevState,
                  Disponibilidad: [e.value]
                }));
              }}
            />


            <Text style={styles.text}>Vehiculos admitidos:</Text>
            <View style={styles.checkboxContainer}>
              {vehicleTypes.map((type, index) => (
                <CheckBox
                  key={index}
                  title={getVehicleTypeLabel(type)}
                  checked={checkedTypes.includes(type)}
                  onPress={() => handleCheckboxChange(type)}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.buttonText}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CardPlace park={selectedPark} closeModal={closeModal} />
          </View>
        </View>
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
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalView2: {
    width: '90%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  text: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#008000',
    borderRadius: 20,
    margin: 5,
    padding: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  searcherButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    right: 195,
  },
  viewUnion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default MapScreen;