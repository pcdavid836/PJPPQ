import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
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
  const [inputValue, setInputValue] = useState('');

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

  const handleInputChange = (text) => {
    // Limita la entrada a 6 caracteres y evita que las letras sean mayúsculas al inicio
    const formattedText = text.length <= 6 ? text.toLowerCase() : text.slice(0, 6);
    setInputValue(formattedText);
  };

  const handleSubmit = () => {
    // Aquí puedes manejar lo que sucede cuando se presiona el botón "Enviar"
    console.log('Input Value:', inputValue);
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
        <View style={styles.centeredTextContainer}>
          <Text style={styles.largeCenteredText}>Unirse a alguna Locacion?</Text>
          <Text style={styles.smallCenteredText}>Ingresa un codigo de 6 caracteres compartido por algun usuario que sea dueño de una locacion.</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            value={inputValue}
            maxLength={6}
            autoCapitalize='none'
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#008ffc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  centeredTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingTop: 10, // Agrega un pequeño padding top
  },
  largeCenteredText: {
    fontSize: 20, // Reduce el tamaño de las letras
    color: 'gray',
    textAlign: 'center',
  },
  smallCenteredText: {
    fontSize: 16, // Reduce el tamaño de las letras
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    height: 50, // Aumenta el tamaño del TextInput
    width: '30%', // Aumenta el ancho del TextInput
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 50, // Aumenta el tamaño del botón
    width: '50%', // Aumenta el ancho del botón
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Aumenta el tamaño de las letras del botón
  },
});
export default CreateParking;