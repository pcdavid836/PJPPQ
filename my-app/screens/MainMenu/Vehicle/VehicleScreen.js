import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { getCars } from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import CarsList from '../../../components/CarsList';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AddVehicle from '../VehicleForms/AddVehicle';


const VehicleScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const reload = () => loadCars();



  const loadCars = async () => {
    const data = await getCars(userInfo.idUsuario);
    setCars(data);
  };

  const CreateVehicle = () => {
    show();
  };

  const handleModifyComplete = (modifiedVehicle) => {
    // Manejar la notificación de modificación completada aquí
    // Esto podría incluir la recarga de la lista de vehículos u otras acciones necesarias.
    loadCars();
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Vehículos</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={CreateVehicle}>
          <View style={styles.buttonContent}>
            <Ionicons name="add-circle-outline" size={20} style={{ marginRight: 8, color: 'white' }} />
            <Text style={styles.buttonText}>Añadir vehículo</Text>
          </View>
        </TouchableOpacity>
        <Modal visible={visible} animationType='slide' onRequestClose={hide}>
          <AddVehicle closeModal={hide} onComplete={loadCars} />
        </Modal>
      </View>
      <View style={styles.cardList}>
        <CarsList cars={cars} onModifyComplete={handleModifyComplete} onDeleteComplete={loadCars} />
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  cardList: {
    marginBottom: 160,
  },
  btnAdd: {
    backgroundColor: '#008ffc', // Cambia el color del botón según tus necesidades
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white', // Cambia el color del texto del botón según tus necesidades
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row', // Alinea los elementos en fila
    alignItems: 'center', // Alinea los elementos verticalmente
  },
});
export default VehicleScreen;