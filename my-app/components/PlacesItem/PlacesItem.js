import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Marker } from 'react-native-maps';

const PlacesItem = ({ park, onOpenModal }) => {
  let markerContent;

  switch (park.Tipo_Parqueo_idTipo_Parqueo) {
    case 1:
      markerContent = (
        <Marker
          coordinate={{ latitude: park.Latitud, longitude: park.Longitud }}
          pinColor="red"
          onPress={() => onOpenModal(park)}
        />
      );
      break;
    case 2:
      markerContent = (
        <Marker
          coordinate={{ latitude: park.Latitud, longitude: park.Longitud }}
          pinColor="blue" // Cambia el color si es necesario
          onPress={() => onOpenModal(park)}
        />
      );
      break;
    case 3:
      markerContent = (
        <Marker
          coordinate={{ latitude: park.Latitud, longitude: park.Longitud }}
          pinColor="green" // Cambia el color si es necesario
          onPress={() => onOpenModal(park)}
        />
      );
      break;
    // Agrega más casos según tus necesidades
    default:
      // Si el valor no coincide con ningún caso, no se mostrará nada.
      markerContent = null;
  }

  return markerContent;
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlacesItem;
