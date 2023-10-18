import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import ModifyPostulation from '../../screens/MainMenu/MyPostulationForms/ModifyPostulation';
import  {deletePark}  from '../../api';

const MyParkItem = ({ mypark, onModifyComplete, onDeleteComplete }) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const [origin, setOrigin] = useState({
    latitude: mypark.Latitud,
    longitude: mypark.Longitud,
  });


  const deletePost = () => {
    Alert.alert(
      // Título
      'Eliminar Postulación',
      // Cuerpo
      '¿Estás seguro?',
      [
        {
          text: 'Sí',
          onPress: () => {
            deletePark(mypark.idParqueo).then(() => {
              onDeleteComplete();
            });
          },
        },
        {
          text: 'No',
          onPress: () => {
            //Se cansela la operacion
          },
        },
      ]
    );
  };

  async function modifyPost() {
    //console.log(mypark.idParqueo);
    show();
  }

  return (
    <View style={styles.container}>
      <View style={styles.vehicleCard}>
        <MapView
          style={styles.vehicleImage}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          showsToolbar={false}
          mapToolbarEnabled={false}
        >
          <Marker
            coordinate={{ latitude: mypark.Latitud, longitude: mypark.Longitud }}
            pinColor="red"
          />
        </MapView>
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>{mypark.Titulo}</Text>
          <Text style={styles.colorBold}>Tamaño: {mypark.Tamaño}m2</Text>
          <Text style={styles.vehicleDescription}>{mypark.Descripcion}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.mod} onPress={modifyPost} >Modificar Postulación</Text>
          <Text style={styles.del} onPress={deletePost} >Cancelar Postulación</Text>
        </View>
      </View>
      <Modal visible={visible} animationType='slide' onRequestClose={hide}>
        <ModifyPostulation closeModal={hide} myparkId={mypark.idParqueo} onComplete={(modifiedPost) => {
                  onModifyComplete(modifiedPost);
                }}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',

  },
  vehicleCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  vehicleImage: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  vehicleInfo: {
    flex: 1,
    marginRight: 16,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vehicleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  placaBold: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  colorBold: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  mod: {
    fontSize: 14,
    color: '#fcb000',
    fontWeight: 'bold',
  },
  del: {
    fontSize: 14,
    color: '#fc0000',
    fontWeight: 'bold',
  }
});


export default MyParkItem