import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { getUserPark } from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MyParkList from '../../../components/MyParkList';
import AddPostulation from '../MyPostulationForms/AddPostulation/AddPostulation';


const CreateParking = () => {
  const [visible, setVisible] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const [mypark, setMyPark] = useState([]);

  const loadMyPark = async () => {
    const data = await getUserPark(userInfo.idUsuario);
    setMyPark(data);
  };

  useEffect(() => {
    loadMyPark();
  }, []);

  const handleModifyComplete = (modifiedPost) => {
    // Manejar la notificación de modificación completada aquí
    // Esto podría incluir la recarga de la lista de vehículos u otras acciones necesarias.
    loadMyPark();
  };

  const CreatePostulation = () => {
    if (mypark.length > 0) {
      // Si mypark tiene elementos, mostrar alerta y salir
      console.log('mostrar alerta');
      return;
    }
    show();
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Postulaciones</Text>
        <Modal visible={visible} animationType='slide' onRequestClose={hide}>

        </Modal>
      </View>
      <View style={styles.cardList}>
        <MyParkList mypark={mypark} onModifyComplete={handleModifyComplete} onDeleteComplete={loadMyPark} />
        <TouchableOpacity
          style={[styles.shareButton, mypark.length > 0 ? styles.disabledButton : null]} // Cambia el color del botón
          disabled={mypark.length > 0}
          onPress={CreatePostulation}
        >
          <Text style={styles.shareButtonText}>Realizar Postulación</Text>
        </TouchableOpacity>
        <Modal visible={visible} animationType='slide' onRequestClose={hide}>
          <AddPostulation closeModal={hide} onComplete={loadMyPark} />
        </Modal>
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
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'green',
    margin: 10
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: 'gray', // Cambia el color del botón cuando esté deshabilitado
  },
});
export default CreateParking;