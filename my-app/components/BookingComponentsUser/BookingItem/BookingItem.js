import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert, TouchableOpacity, Button, TextInput } from 'react-native'
import ModifyReserve from '../../../screens/MainMenu/BookingOptions/ModifyReserve';
import ComeConfirmed from '../../../screens/MainMenu/BookingOptions/ComeComfirmed';
import { cancelBook, parkVehicleEnter, parkVehicleQRPay } from '../../../api'
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebaseConfig";
import { AuthContext } from '../../../context/AuthContext';
import CameraVehicleConfirmed from '../../../screens/MainMenu/TakePhoto/CameraVehicleConfirmed'
import UnknownImage from '../../../assets/images/unknown.png';

const BookingItem = ({ book, onDeleteComplete, onModifyComplete }) => {
  //console.log(book);

  let veh = "";
  let parkImage = "";
  let qrImage = "";
  let sendImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe&_gl=1*1eccxzy*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5ODIxOTgwOC40OS4xLjE2OTgyMTk4MTQuNTQuMC4w";
  const { userInfo } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(sendImage);
  const [imageQR, setImageQR] = useState(sendImage);
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = (imageUri) => {
    setVisible(false);
    if (imageUri) {
      // Realiza las acciones necesarias con la URI de la imagen capturada
      setImage(imageUri);
      // Aquí puedes hacer la lógica para subir la imagen a Firebase u otras acciones
      setToSend({ ...tosend, Url_imagen_ingreso: imageUri });
    }
  };

  const [tosend, setToSend] = useState({
    Url_imagen_ingreso: sendImage,
  });

  const [tosendQR, setToSendQR] = useState({
    Comprobante: sendImage,
    idParqueo_Vehiculo: book.idParqueo_Vehiculo,
    Monto: book.Monto
  });

  const handleChange = (name, value) => setToSend({ ...tosend, [name]: value });

  const handleChange2 = (name, value) => setToSendQR({ ...tosendQR, [name]: value });

  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);


  if (book.Url_imagen_Parqueo === "defaultPark") {
    parkImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7&_gl=1*32366p*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5ODE0MjcwMy40OC4xLjE2OTgxNDI3MDQuNTkuMC4w";
  } else {
    parkImage = book.Url_imagen_Parqueo;
  }

  switch (book.Tipo_Vehiculo_id) {
    case 1:
      veh = "Automóvil";
      break;
    case 2:
      veh = "Motocicleta";
      break;
    case 3:
      veh = "Bicicleta";
      break;
    case 4:
      veh = "Camion";
      break;
    case 5:
      veh = "Autobus";
      break;
    case 6:
      veh = "Minibus";
      break;
    case 7:
      veh = "Miscelaneo";
      break;
    default:
      console.log("El tipo de vehículo no es válido");
  }

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
            cancelBook(book.idReserva).then(() => {
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

  async function editImageChange() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setToSend({ ...tosend, Url_imagen_ingreso: result.assets[0].uri });

        //Funcion que sube la imagen:
        //await uploadImage(result.assets[0].uri, "image");
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  }

  async function dropImage() {
    setImage(sendImage);
    setToSend({ ...tosend, Url_imagen_ingreso: sendImage });
  }

  async function editImageChangeQR() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setImageQR(result.assets[0].uri);
        setToSendQR({ ...tosendQR, Comprobante: result.assets[0].uri });

        //Funcion que sube la imagen:
        //await uploadImage(result.assets[0].uri, "image");
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  }

  async function dropImageQR() {
    setImageQR(sendImage);
    setToSendQR({ ...tosendQR, Comprobante: sendImage });
  }


  async function takePic() {
    setImage(sendImage);
    show();
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "VehicleControl/" + new Date().getTime() + "u" + userInfo.idUsuario + "vh")
    const uploadTask = uploadBytesResumable(storageRef, blob)

    // Eventos que suceden cuando se sube la imagen:
    // Cuadro de carga (no es usado aquí pero puede ser usado en otra vista)
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress.toFixed());
    },
      (error) => {
        // Handle error
        console.error("Error al subir la imagen:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Imagen almacenada en base de datos y nube
          setImage(downloadURL);
          tosend.Url_imagen_ingreso = downloadURL;
          const updatedBook = await parkVehicleEnter(book.idReserva, tosend);
          onModifyComplete(updatedBook);
          setConfirmModalVisible(false);
          // Asigna la URL de la imagen a la variable actualImage
          // Luego, puedes realizar otras acciones con la URL de la imagen, si es necesario.
        }).catch((error) => {
          console.error("Error al obtener la URL de la imagen:", error);
        });
      });
  }


  async function uploadImageQR(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "QRControl/" + new Date().getTime() + "u" + userInfo.idUsuario + "qr" + book.idReserva);
    const uploadTask = uploadBytesResumable(storageRef, blob)

    // Eventos que suceden cuando se sube la imagen:
    // Cuadro de carga (no es usado aquí pero puede ser usado en otra vista)
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress.toFixed());
    },
      (error) => {
        // Handle error
        console.error("Error al subir la imagen:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Imagen almacenada en base de datos y nube
          setImage(downloadURL);
          tosendQR.Comprobante = downloadURL;
          const updatedBook = await parkVehicleQRPay(book.idReserva, tosendQR);
          onModifyComplete(updatedBook);
          setConfirmModalVisible(false);
          // Asigna la URL de la imagen a la variable actualImage
          // Luego, puedes realizar otras acciones con la URL de la imagen, si es necesario.
        }).catch((error) => {
          console.error("Error al obtener la URL de la imagen:", error);
        });
      });
  }


  async function onUploadOrder() {
    if (tosend.Url_imagen_ingreso === sendImage) {
      Alert.alert(
        "Imagen requerida",
        "Por favor, selecciona una imagen diferente a la imagen por defecto.",
        [
          { text: "OK" }
        ]
      );
    } else {
      tosend.Url_imagen_ingreso = image;
      const updatedBook = await parkVehicleEnter(book.idReserva, tosend);
      uploadImage(image, "image");
      onModifyComplete(updatedBook);
      setConfirmModalVisible(false);
    }
  }

  async function onUploadOrderQR() {
    // Verificar si el campo Monto está vacío
    if (!tosendQR.Monto.trim()) {
      Alert.alert("Error", "Por favor, ingresa el monto.");
      return;
    }
    // Verificar si el valor ingresado es un número válido
    if (isNaN(tosendQR.Monto) || !/^\d+(\.\d{1,2})?$/.test(tosendQR.Monto)) {
      Alert.alert("Error", "Por favor, ingresa un valor monetario válido.");
      return;
    }
    // Si el monto es mayor a 10000, mostrar una alerta
    if (parseFloat(tosendQR.Monto) > 10000.00) {
      Alert.alert("Error", "El monto no puede ser mayor a 10,000.00 Bs.");
      return;
    }

    // Si el comprobante es la imagen por defecto, mostrar una alerta
    if (tosendQR.Comprobante === sendImage) {
      Alert.alert(
        "Imagen requerida",
        "Por favor, selecciona una imagen diferente a la imagen por defecto.",
        [{ text: "OK" }]
      );
      return;
    }

    // Continuar con la lógica para subir el comprobante
    const updateQR = await parkVehicleQRPay(book.idQR, tosendQR);
    uploadImageQR(imageQR, "image");
    onModifyComplete(updateQR);
    setQrModalVisible(false);
  }




  switch (book.Tipo_Parqueo_idTipo_Parqueo) {
    case 1:
      return (
        <View style={{ margin: 10 }}>
          <View style={styles.header}>
            <Text style={styles.productTitle}>{book.Titulo}</Text>
            {book.PagoQR === 1 && (
              <TouchableOpacity style={styles.qrButton} onPress={() => setQrModalVisible(true)}>
                <Text style={styles.qrButtonText}>Pago QR</Text>
              </TouchableOpacity>

            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={qrModalVisible}
              onRequestClose={() => {
                setQrModalVisible(!qrModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.productTitle}>Hacer un Pago mediante QR</Text>
                  <View style={styles.vehicleCard}>
                    <Image style={styles.vehicleImage} source={{ uri: imageQR }} />
                    <TextInput
                      style={styles.input}
                      placeholder="Monto en Bs."
                      keyboardType="numeric"
                      maxLength={8} // Maximum length of 8 characters (including decimal point)
                      placeholderTextColor="#888"
                      onChangeText={(text) => handleChange2('Monto', text)}
                    />
                    <View style={styles.cardFooter}>
                      {book.ConfirmacionSalida === 0 && (
                        <>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChangeQR}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImageQR}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                  {book.ConfirmacionSalida === 0 && (
                    <TouchableOpacity onPress={onUploadOrderQR} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                      <Text style={styles.buttonCText}>ENVIAR COMPROBANTE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.productCard}>
            <Image source={{ uri: parkImage }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{book.Ubicacion}</Text>
              <Text style={styles.productDescription}>Cuidador esperando: {veh}</Text>
              <Text style={styles.productDescription}>Fecha: {formattedDate}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
              </View>
              <TouchableOpacity style={[styles.buttonConfirm, book.Estado_Reserva === 0 ? styles.disabledButton : {}]} disabled={book.Estado_Reserva === 0} onPress={() => setConfirmModalVisible(true)}>
                <Text style={styles.buttonCText}>Confirmar llegada</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            {book.Cancelado === 1 ? (
              <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
            ) : book.Rechazado === 1 ? (
              <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
            ) : book.Realizado === 1 ? (
              <Text style={styles.completed}>COMPLETADO</Text>
            ) : (
              <>
                {/* SE OPTO POR NO CREAR ESTE BOTON DEBIDO A QUE GENERA DEMASIADAS CONSULTAS PARA ALGO MUY SIMPLE 

                <TouchableOpacity onPress={() => setModifyModalVisible(true)}>
                  <Text style={styles.mod}>Modificar</Text>
                </TouchableOpacity>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modifyModalVisible}
                  onRequestClose={() => {
                    setModifyModalVisible(!modifyModalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <ModifyReserve bookItem={book}/>
                    </View>
                  </View>
                </Modal>*/}
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={confirmModalVisible}
                  onRequestClose={() => {
                    setConfirmModalVisible(!confirmModalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.productTitle}>Vehiculo en establecimiento</Text>
                      <View style={styles.vehicleCard}>
                        <Image style={styles.vehicleImage} source={{ uri: image }} />
                        <View style={styles.cardFooter}>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                            <Text style={styles.buttonText2}>Tomar fotografía</Text>
                          </TouchableOpacity>
                          <Modal visible={visible} animationType='slide' onRequestClose={() => {
                            hide();
                            setImage(sendImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                          }}>
                            <CameraVehicleConfirmed closeModal={hide} />
                          </Modal>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImage}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity onPress={onUploadOrder} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                        <Text style={styles.buttonCText}>SUBIR IMAGEN</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </Modal>
                <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
              </>
            )}
          </View>
        </View>
      )
      break;
    case 2:
      <View>
        <View style={{ margin: 10 }}>
          <View style={styles.header}>
            <Text style={styles.productTitle}>{book.Titulo}</Text>
            {book.PagoQR === 1 && (
              <TouchableOpacity style={styles.qrButton} onPress={() => setQrModalVisible(true)}>
                <Text style={styles.qrButtonText}>Pago QR</Text>
              </TouchableOpacity>

            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={qrModalVisible}
              onRequestClose={() => {
                setQrModalVisible(!qrModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.productTitle}>Hacer un Pago mediante QR</Text>
                  <View style={styles.vehicleCard}>
                    <Image style={styles.vehicleImage} source={{ uri: imageQR }} />
                    <View style={styles.cardFooter}>
                      {book.ConfirmacionSalida === 0 && (
                        <>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChangeQR}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImageQR}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                  {book.ConfirmacionSalida === 0 && (
                    <TouchableOpacity onPress={onUploadOrderQR} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                      <Text style={styles.buttonCText}>ENVIAR COMPROBANTE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.productCard}>
            <Image source={{ uri: parkImage }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{book.Ubicacion}</Text>
              <Text style={styles.productDescription}>Cuidador esperando: {veh}</Text>
              <Text style={styles.productDescription}>Fecha: {formattedDate}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
              </View>
              <TouchableOpacity style={[styles.buttonConfirm, book.Estado_Reserva === 0 ? styles.disabledButton : {}]} disabled={book.Estado_Reserva === 0} onPress={() => setConfirmModalVisible(true)}>
                <Text style={styles.buttonCText}>Confirmar llegada</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            {book.Cancelado === 1 ? (
              <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
            ) : book.Rechazado === 1 ? (
              <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
            ) : book.Realizado === 1 ? (
              <Text style={styles.completed}>COMPLETADO</Text>
            ) : (
              <>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={confirmModalVisible}
                  onRequestClose={() => {
                    setConfirmModalVisible(!confirmModalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.productTitle}>Vehiculo en establecimiento</Text>
                      <View style={styles.vehicleCard}>
                        <Image style={styles.vehicleImage} source={{ uri: image }} />
                        <View style={styles.cardFooter}>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                            <Text style={styles.buttonText2}>Tomar fotografía</Text>
                          </TouchableOpacity>
                          <Modal visible={visible} animationType='slide' onRequestClose={() => {
                            hide();
                            setImage(sendImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                          }}>
                            <CameraVehicleConfirmed closeModal={hide} />
                          </Modal>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImage}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity onPress={onUploadOrder} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                        <Text style={styles.buttonCText}>SUBIR IMAGEN</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </Modal>
                <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
              </>
            )}
          </View>
        </View>
      </View>
      break;
    case 3:
      <View>
        <View style={{ margin: 10 }}>
          <View style={styles.header}>
            <Text style={styles.productTitle}>{book.Titulo}</Text>
            {book.PagoQR === 1 && (
              <TouchableOpacity style={styles.qrButton} onPress={() => setQrModalVisible(true)}>
                <Text style={styles.qrButtonText}>Pago QR</Text>
              </TouchableOpacity>

            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={qrModalVisible}
              onRequestClose={() => {
                setQrModalVisible(!qrModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.productTitle}>Hacer un Pago mediante QR</Text>
                  <View style={styles.vehicleCard}>
                    <Image style={styles.vehicleImage} source={{ uri: imageQR }} />
                    <View style={styles.cardFooter}>
                      {book.ConfirmacionSalida === 0 && (
                        <>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChangeQR}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImageQR}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                  {book.ConfirmacionSalida === 0 && (
                    <TouchableOpacity onPress={onUploadOrderQR} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                      <Text style={styles.buttonCText}>ENVIAR COMPROBANTE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.productCard}>
            <Image source={{ uri: parkImage }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{book.Ubicacion}</Text>
              <Text style={styles.productDescription}>Cuidador esperando: {veh}</Text>
              <Text style={styles.productDescription}>Fecha: {formattedDate}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
              </View>
              <TouchableOpacity style={[styles.buttonConfirm, book.Estado_Reserva === 0 ? styles.disabledButton : {}]} disabled={book.Estado_Reserva === 0} onPress={() => setConfirmModalVisible(true)}>
                <Text style={styles.buttonCText}>Confirmar llegada</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            {book.Cancelado === 1 ? (
              <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
            ) : book.Rechazado === 1 ? (
              <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
            ) : book.Realizado === 1 ? (
              <Text style={styles.completed}>COMPLETADO</Text>
            ) : (
              <>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={confirmModalVisible}
                  onRequestClose={() => {
                    setConfirmModalVisible(!confirmModalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.productTitle}>Vehiculo en establecimiento</Text>
                      <View style={styles.vehicleCard}>
                        <Image style={styles.vehicleImage} source={{ uri: image }} />
                        <View style={styles.cardFooter}>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                            <Text style={styles.buttonText2}>Tomar fotografía</Text>
                          </TouchableOpacity>
                          <Modal visible={visible} animationType='slide' onRequestClose={() => {
                            hide();
                            setImage(sendImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                          }}>
                            <CameraVehicleConfirmed closeModal={hide} />
                          </Modal>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImage}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity onPress={onUploadOrder} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                        <Text style={styles.buttonCText}>SUBIR IMAGEN</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </Modal>
                <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
              </>
            )}
          </View>
        </View>
      </View>
      break;
    case 4:
      <View>
        <View style={{ margin: 10 }}>
          <View style={styles.header}>
            <Text style={styles.productTitle}>{book.Titulo}</Text>
            {book.PagoQR === 1 && (
              <TouchableOpacity style={styles.qrButton} onPress={() => setQrModalVisible(true)}>
                <Text style={styles.qrButtonText}>Pago QR</Text>
              </TouchableOpacity>

            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={qrModalVisible}
              onRequestClose={() => {
                setQrModalVisible(!qrModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.productTitle}>Hacer un Pago mediante QR</Text>
                  <View style={styles.vehicleCard}>
                    <Image style={styles.vehicleImage} source={{ uri: imageQR }} />
                    <View style={styles.cardFooter}>
                      {book.ConfirmacionSalida === 0 && (
                        <>
                          <TouchableOpacity style={styles.btnAdd} onPress={editImageChangeQR}>
                            <Text style={styles.buttonText2}>Subir imagen</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImageQR}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                  {book.ConfirmacionSalida === 0 && (
                    <TouchableOpacity onPress={onUploadOrderQR} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                      <Text style={styles.buttonCText}>ENVIAR COMPROBANTE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.productCard}>
            <Image source={{ uri: parkImage }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{book.Ubicacion}</Text>
              <Text style={styles.productDescription}>Cuidador esperando: {veh}</Text>
              <Text style={styles.productDescription}>Fecha: {formattedDate}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTime}</Text></Text>
                <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
              </View>
              <TouchableOpacity style={[styles.buttonConfirm, book.Estado_Reserva === 0 ? styles.disabledButton : {}]} disabled={book.Estado_Reserva === 0} onPress={() => setConfirmModalVisible(true)}>
                <Text style={styles.buttonCText}>Confirmar llegada</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            {book.Cancelado === 1 ? (
              <Text style={styles.cancelled}>RESERVA CANCELADA</Text>
            ) : book.Rechazado === 1 ? (
              <Text style={styles.cancelled}>RESERVA RECHAZADA</Text>
            ) : book.Realizado === 1 ? (
              <Text style={styles.completed}>COMPLETADO</Text>
            ) : (
              <>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={confirmModalVisible}
                  onRequestClose={() => {
                    setConfirmModalVisible(!confirmModalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.productTitle}>Vehiculo en establecimiento</Text>
                      <View style={styles.vehicleCard}>
                        <Image style={styles.vehicleImage} source={{ uri: image }} />
                        <View style={styles.cardFooter}>
                          <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                            <Text style={styles.buttonText2}>Tomar fotografía</Text>
                          </TouchableOpacity>
                          <Modal visible={visible} animationType='slide' onRequestClose={() => {
                            hide();
                            setImage(sendImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                          }}>
                            <CameraVehicleConfirmed closeModal={hide} />
                          </Modal>
                          <TouchableOpacity style={styles.btnAdd2} onPress={dropImage}>
                            <Text style={styles.buttonText2}>Quitar imagen</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity onPress={onUploadOrder} style={[styles.buttonConfirm, { marginTop: 10 }]} >
                        <Text style={styles.buttonCText}>SUBIR IMAGEN</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </Modal>
                <Text style={styles.del} onPress={twoOptionAlert}>CANCELAR RESERVA</Text>
              </>
            )}
          </View>
        </View>
      </View>
      break;
    default:
      console.log("El tipo de reserva no es válido");
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
  qrButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  qrButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  }
});

export default BookingItem;
