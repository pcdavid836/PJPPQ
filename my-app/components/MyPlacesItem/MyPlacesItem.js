import React from 'react';
import { Marker } from 'react-native-maps';

const MyPlacesItem = ({ park, onOpenModal }) => {
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
      default:
        // Si el valor no coincide con ningún caso, no se mostrará nada.
        markerContent = null;
    }
  
    return markerContent;
}

export default MyPlacesItem