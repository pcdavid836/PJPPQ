import React, { useEffect, useState, useContext, useCallback } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { getBookByUser } from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import BookingList from '../../../components/BookingComponentsUser/BookingList';
import { useFocusEffect } from '@react-navigation/native';

const Booking = () => {
  const { userInfo } = useContext(AuthContext);
  const [book, setBook] = useState([]);
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const reload = () => loadBooks();

  const loadBooks = async () => {
    const data = await getBookByUser(userInfo.idUsuario);
    setBook(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadBooks();
      return () => { }; // Esto se ejecuta al salir de la pantalla
    }, [])
  );

  useEffect(() => {
    loadBooks();
  }, []);

  const handleImageComplete = (uploadedProbe) => {
    // Manejar la notificación de modificación completada aquí
    // Esto podría incluir la recarga de la lista de vehículos u otras acciones necesarias.
    loadBooks();
  };



  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Reservas</Text>
      </View>
      <View style={styles.cardList}>
        <BookingList book={book} onDeleteComplete={loadBooks} onModifyComplete={handleImageComplete} />
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
export default Booking;