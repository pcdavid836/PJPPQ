import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert } from 'react-native'
import ModifyVehicle from '../../screens/MainMenu/VehicleForms/ModifyVehicle/ModifyVehicle';
import  {deleteVehicle}  from '../../api';



const CarsItem = ({ cars, onModifyComplete, onDeleteComplete }) => {

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  let title = "";
  let carImage = "";



  const twoOptionAlert = () => {
    Alert.alert(
      // Título
      'Eliminar vehículo',
      // Cuerpo
      '¿Estás seguro?',
      [
        {
          text: 'Sí',
          onPress: () => {
            deleteVehicle(cars.idVehiculo).then(() => {
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


  async function modifyVehicle() {
    show();
  }


  if (cars.Url_imagen === "defaultVehicle") {
    carImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe&_gl=1*y586ao*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5Njk2MDM4Mi4zNC4wLjE2OTY5NjAzODIuNjAuMC4w";
  } else {
    carImage = cars.Url_imagen;
  }



  switch (cars.Tipo_Vehiculo_idTipo_Vehiculo) {
    case 1:
      title = "Automóvil";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.placaBold}>Placa: {cars.Placa}</Text>
              <Text style={styles.colorBold}>Color: {cars.Color}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Modal visible={visible} animationType='slide' onRequestClose={hide}>
                <ModifyVehicle closeModal={hide} vehicleType={cars.Tipo_Vehiculo_idTipo_Vehiculo} vehicleId={cars.idVehiculo} onComplete={(modifiedVehicle) => {
                  onModifyComplete(modifiedVehicle);
                }} />
              </Modal>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 2:
      title = "Motocicleta";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.placaBold}>Placa: {cars.Placa}</Text>
              <Text style={styles.colorBold}>Color: {cars.Color}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 3:
      title = "Bicicleta";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.colorBold}>Color: {cars.Color}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 4:
      title = "Camión";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.placaBold}>Placa: {cars.Placa}</Text>
              <Text style={styles.colorBold}>Color: {cars.Color}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 5:
      title = "Autobus";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.placaBold}>Placa: {cars.Placa}</Text>
              <Text style={styles.colorBold}>Color: {cars.Color}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 6:
      title = "Minibus";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.placaBold}>Placa: {cars.Placa}</Text>
              <Text style={styles.colorBold}>Color: {cars.Color}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 7:
      title = "Misceláneo";
      return (
        <View style={styles.container}>
          <View style={styles.vehicleCard}>
            <Image source={{ uri: carImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{title}</Text>
              <Text style={styles.vehicleDescription}>{cars.Descripcion}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.mod} onPress={modifyVehicle}>Modificar</Text>
              <Text style={styles.del} onPress={twoOptionAlert}>Eliminar</Text>
            </View>
          </View>
        </View>
      )
      break;
    default:
      console.log("El tipo de vehículo no es válido");
  }


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

export default CarsItem