import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert, TouchableOpacity, Button } from 'react-native'
import { denyBook } from '../../../api'

const BookingItem = ({ book, onDeleteComplete }) => {
  const [image, setImage] = useState(book.Url_imagen_Vehiculo);

  // Formatear la fecha y la hora
  const date = new Date(book.Fecha_Reserva);
  const formattedDate = date.toLocaleDateString();

  const startTime = new Date(`1970-01-01T${book.Hora_Reserva_Inicio}Z`);
  startTime.setHours(startTime.getHours() + 4); // Ajusta la hora
  const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  const endTime = new Date(`1970-01-01T${book.Hora_Reserva_Fin}Z`);
  endTime.setHours(endTime.getHours() + 4); // Ajusta la hora
  const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  const twoOptionAlert = () => {
    Alert.alert(
      // Título
      'Cancelar reserva',
      // Cuerpo
      '¿Estás seguro?',
      [
        {
          text: 'Sí',
          onPress: () => {
            denyBook(book.idReserva).then(() => {
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

  switch (book.Tipo_Vehiculo_id) {
    case 1:
      title = "Automóvil";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Placa: <Text style={styles.productPriceText}>{book.Placa}</Text></Text>
                <Text style={styles.productName}>Color: <Text style={styles.productPriceText}>{book.Color}</Text></Text>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )
      break;
    case 2:
      title = "Motocicleta";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Placa: <Text style={styles.productPriceText}>{book.Placa}</Text></Text>
                <Text style={styles.productName}>Color: <Text style={styles.productPriceText}>{book.Color}</Text></Text>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )
      break;
    case 3:
      title = "Bicicleta";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Color: <Text style={styles.productPriceText}>{book.Color}</Text></Text>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )
      break;
    case 4:
      title = "Camión";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Placa: <Text style={styles.productPriceText}>{book.Placa}</Text></Text>
                <Text style={styles.productName}>Color: <Text style={styles.productPriceText}>{book.Color}</Text></Text>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )
      break;
    case 5:
      title = "Autobus";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Placa: <Text style={styles.productPriceText}>{book.Placa}</Text></Text>
                <Text style={styles.productName}>Color: <Text style={styles.productPriceText}>{book.Color}</Text></Text>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )
      break;
    case 6:
      title = "Minibus";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Placa: <Text style={styles.productPriceText}>{book.Placa}</Text></Text>
                <Text style={styles.productName}>Color: <Text style={styles.productPriceText}>{book.Color}</Text></Text>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )
      break;
    case 7:
      title = "Misceláneo";
      return (
        <View>
          <View style={{ margin: 10 }}>
            <View style={styles.header}>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productDescription}>{book.Descripcion}</Text>
                <Text style={styles.productPrice}>Fecha: <Text style={styles.productPriceText}>{formattedDate}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                  <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              {book.Cancelado === 1 ? (
                <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
              ) : book.Rechazado === 1 ? (
                <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
              ) : book.Realizado === 1 ? (
                <Text style={styles.completed}>EN PARQUEO</Text>
              ) : (
                <>
                  <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
                </>
              )}
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
    paddingTop: 40,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    marginRight: 16,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'gray',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'purple'
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666'
  },
  buttonConfirm: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonCText: {
    color: 'white',
    textAlign: 'center',
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
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelled: {
    color: 'red',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
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
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  completed: {
    color: 'green',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
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
  btnAdd: {
    flex: 1,
    backgroundColor: '#008ffc',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  btnAdd2: {
    flex: 1,
    backgroundColor: '#b8281d',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  btnAdd3: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 300,
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  buttonText2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BookingItem;

