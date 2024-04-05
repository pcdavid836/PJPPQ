import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert, TouchableOpacity, Button, TextInput } from 'react-native'
import { denyBook, createReportParkUser } from '../../../api'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SelectCountry } from 'react-native-element-dropdown';


const BookingItem = ({ book, onDeleteComplete }) => {
  //console.log(book);
  const [image, setImage] = useState(book.Url_imagen_Vehiculo);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);

  const local_data = [
    {
      value: 'Informacion incorrecta',
      lable: 'Informacion incorrecta',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: 'Solicitudes spam',
      lable: 'Solicitudes spam',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: 'Incumplimiento de horario',
      lable: 'Incumplimiento de horario',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: 'Otro',
      lable: 'Otro',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
  ];

  const [report, setReport] = useState();

  const [reporInfo, setReportInfo] = useState({
    Motivo: '',
    Descripcion: '',
    usuario_idUsuario: book.idUsuario,
    parqueo_idParqueo: book.Parqueo_idParqueo,
  });

  const handleChange = (name, value) => setReportInfo({ ...reporInfo, [name]: value });

  // Formatear la fecha y la hora
  const date = new Date(book.Fecha_Reserva);
  const formattedDate = date.toLocaleDateString();

  const startTime = new Date(`1970-01-01T${book.Hora_Reserva_Inicio}Z`);
  startTime.setHours(startTime.getHours() + 4); // Ajusta la hora
  const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  const endTime = new Date(`1970-01-01T${book.Hora_Reserva_Fin}Z`);
  endTime.setHours(endTime.getHours() + 4); // Ajusta la hora
  const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  const handleSubmit = () => {
    // Comprueba si algún valor de reporInfo es nulo o vacío
    const isReportInfoComplete = Object.values(reporInfo).every(value => value !== '' && value != null);

    if (isReportInfoComplete) {
      // Llama a la función createReportParkUser con reporInfo como argumento
      createReportParkUser(reporInfo);
      console.log('Enviando reporte:', reporInfo);
      setSecondModalVisible(false); // Ocultar modal después de enviar

      // Muestra una alerta de éxito
      Alert.alert('Éxito', 'Reporte exitoso');
    } else {
      // Si algún campo está vacío, muestra una alerta
      Alert.alert('Error', 'Por favor, completa todos los campos del reporte.');
    }
  };

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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </TouchableOpacity>
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
          {/* Primer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ padding: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={30} color="gray" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, fontSize: 20 }}>Automóvil</Text>
                  <Text style={{ fontWeight: 'bold' }} >Placa: {book.Placa}</Text>
                  <Text style={{ fontWeight: 'bold' }} >Color: {book.Color}</Text>
                  <Text style={{ textAlign: 'justify', paddingBottom: 10 }} >{book.Descripcion}</Text>
                  <Image
                    source={{ uri: book.Url_imagen_Vehiculo }}
                    style={{ width: 250, height: 125, resizeMode: 'contain' }}
                  />
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Dueñ@: <Text>{book.Nombres} {book.Primer_Apellido} {book.Segundo_Apellido}</Text></Text>
                  <Text style={{ fontWeight: 'bold', paddingTop: 10 }} >Celular: {book.Celular}</Text>
                </View>


                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                  onPress={() => setSecondModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Reportar Usuario</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Segundo Modal */}
          <Modal
            animationType="none"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={() => {
              setSecondModalVisible(!secondModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reportar Usuario</Text>
                <SelectCountry
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={report}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Motivo..."
                  searchPlaceholder="Buscar..."
                  onChange={e => {
                    setReport(e.value);
                    handleChange('Motivo', e.value);
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  maxLength={200}
                  style={styles.modalTextInput}
                  placeholder="Escribe aquí tu reporte..."
                  onChangeText={(text) => handleChange('Descripcion', text)}
                // ... más propiedades si necesitas ...
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSecondModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    left: 250,
    zIndex: 1,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 200,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  modalTextInput: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    height: 120,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
});

export default BookingItem;

