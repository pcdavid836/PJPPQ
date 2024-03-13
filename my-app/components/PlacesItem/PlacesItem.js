import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';

const PlacesItem = ({ park, onOpenModal }) => {
  let markerContent;

  switch (park.Tipo_Parqueo_idTipo_Parqueo) {
    case 1:
      markerContent = (
        <Marker
          coordinate={{ latitude: park.Latitud, longitude: park.Longitud }}
          onPress={() => onOpenModal(park)}
        >
          <Image source={require('../../assets/images/signatures/PIcon.png')} style={{height: 50, width: 50}} />
        </Marker>
      );
      break;
    case 2:
      markerContent = (
        <Marker
          coordinate={{ latitude: park.Latitud, longitude: park.Longitud }}
          onPress={() => onOpenModal(park)}
        >
          <Image source={require('../../assets/images/signatures/PIconPublic.png')} style={{height: 50, width: 50}} />
        </Marker>
      );
      break;
    case 3:
      markerContent = (
        <Marker
          coordinate={{ latitude: park.Latitud, longitude: park.Longitud }}
          onPress={() => onOpenModal(park)}
        >
          <Image source={require('../../assets/images/signatures/PIconMechanic.png')} style={{ height: 50, width: 50 }} />
        </Marker>
      );
      break;
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
