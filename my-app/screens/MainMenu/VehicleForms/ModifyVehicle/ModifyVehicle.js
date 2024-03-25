import { React, useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, ToastAndroid } from 'react-native';
import { AuthContext } from '../../../..//context/AuthContext';
import { getVehicleInfo } from '../../../../api';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../../../firebaseConfig";
import CameraVehicleScren from '../../../MainMenu/TakePhoto/CameraVehicle'
import { updateVehicle } from '../../../../api';


const ModifyVehicle = ({ closeModal, vehicleType, vehicleId, onComplete }) => {
  let definedImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe&_gl=1*y586ao*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5Njk2MDM4Mi4zNC4wLjE2OTY5NjAzODIuNjAuMC4w"
  const [progress, setProgress] = useState(0);
  const { userInfo } = useContext(AuthContext);
  const [image, setImage] = useState(definedImage);
  const [vehicle, setVehicle] = useState(null);
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = (imageUri) => {
    setVisible(false);
    if (imageUri) {
      // Realiza las acciones necesarias con la URI de la imagen capturada
      setImage(imageUri);
      // Aquí puedes hacer la lógica para subir la imagen a Firebase u otras acciones
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para obtener los detalles del vehículo
  const fetchVehicleInfo = async () => {
    try {
      const response = await getVehicleInfo(vehicleId);
      //console.log('Respuesta del servidor:', response);

      // Actualiza el estado con los detalles del vehículo
      setVehicle(response);
      // Establece la imagen una vez que se hayan cargado los detalles del vehículo
      setImage(response.Url_imagen);

    } catch (error) {
      console.error('Error al obtener los detalles del vehículo', error);
    }
  };

  const handleChange = (name, value) => setVehicle({ ...vehicle, [name]: value });

  // Llama a la función de obtención de detalles del vehículo al cargar el componente
  useEffect(() => {
    fetchVehicleInfo();
  }, []);


  // Verifica si los detalles del vehículo se han cargado antes de renderizar
  if (!vehicle) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  async function takePic() {
    setImage(definedImage);
    show();
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "VehicleImages/" + new Date().getTime() + "u" + userInfo.idUsuario + "vh")
    const uploadTask = uploadBytesResumable(storageRef, blob)

    // Eventos que suceden cuando se sube la imagen:
    // Cuadro de carga (no es usado aquí pero puede ser usado en otra vista)
    return new Promise((resolve, reject) => {
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed());
      },
        (error) => {
          // Rechaza la promesa con el error
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Actualiza el estado del vehículo y la imagen
            setImage(downloadURL);
            vehicle.Url_imagen = downloadURL;
            console.log(vehicle.Url_imagen);
            // Resuelve la promesa cuando la imagen se haya subido
            resolve();
          }).catch((error) => {
            // Rechaza la promesa con el error
            reject(error);
          });
        });
    });
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    if (
      vehicle.Placa &&
      vehicle.Color &&
      vehicle.Marca &&
      vehicle.Descripcion &&
      vehicle.Url_imagen
    ) {

      try {
        // Espera a que la imagen se suba antes de guardar el vehículo
        await uploadImage(image, "image");
        updateVehicle(vehicle.idVehiculo, vehicle);
        onComplete(vehicle);
        closeModal();
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }

    } else {
      ToastAndroid.show('Completa los campos restantes!', ToastAndroid.SHORT);
    }
    setIsSubmitting(false);
  }

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
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  }

  async function dropImage() {
    setImage(definedImage);
    vehicle.Url_imagen = "defaultVehicle";
  }

  if (image === "defaultVehicle") {
    setImage("https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe&_gl=1*y586ao*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5Njk2MDM4Mi4zNC4wLjE2OTY5NjAzODIuNjAuMC4w");
  }

  switch (vehicleType) {
    case 1:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Automóvil</Text>
              </View>
              <View>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la placa de tu vehículo"
                  maxLength={15}
                  defaultValue={vehicle.Placa}
                  onChangeText={(text) => handleChange('Placa', text.toUpperCase())}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Marca del vehículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cuál es la marca de tu vehículo?"
                  maxLength={25}
                  onChangeText={(text) => handleChange('Marca', text.toUpperCase())}
                  defaultValue={vehicle.Marca}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    case 2:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Motocicleta</Text>
              </View>
              <View>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la placa de tu vehículo"
                  maxLength={15}
                  onChangeText={(text) => handleChange('Placa', text.toUpperCase())}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Marca del vehículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cuál es la marca de tu vehículo?"
                  maxLength={25}
                  onChangeText={(text) => handleChange('Marca', text.toUpperCase())}
                  defaultValue={vehicle.Marca}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    case 3:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Bicicleta</Text>
              </View>
              <View>
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    case 4:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Camión</Text>
              </View>
              <View>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la placa de tu vehículo"
                  maxLength={15}
                  defaultValue={vehicle.Placa}
                  onChangeText={(text) => handleChange('Placa', text.toUpperCase())}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Marca del vehículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cuál es la marca de tu vehículo?"
                  maxLength={25}
                  onChangeText={(text) => handleChange('Marca', text.toUpperCase())}
                  defaultValue={vehicle.Marca}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    case 5:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Autobus</Text>
              </View>
              <View>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la placa de tu vehículo"
                  maxLength={15}
                  onChangeText={(text) => handleChange('Placa', text.toUpperCase())}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Marca del vehículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cuál es la marca de tu vehículo?"
                  maxLength={25}
                  onChangeText={(text) => handleChange('Marca', text.toUpperCase())}
                  defaultValue={vehicle.Marca}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    case 6:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Minibus</Text>
              </View>
              <View>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la placa de tu vehículo"
                  maxLength={15}
                  defaultValue={vehicle.Placa}
                  onChangeText={(text) => handleChange('Placa', text.toUpperCase())}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Marca del vehículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cuál es la marca de tu vehículo?"
                  maxLength={25}
                  onChangeText={(text) => handleChange('Marca', text.toUpperCase())}
                  defaultValue={vehicle.Marca}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    case 7:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Vehiculo</Text>
              </View>
              <View>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;

    default:
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Modificar Vehiculo</Text>
              </View>
              <View>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la placa de tu vehículo"
                  maxLength={15}
                  defaultValue={vehicle.Placa}
                  onChangeText={(text) => handleChange('Placa', text.toUpperCase())}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿De que color es tu vehículo?"
                  maxLength={15}
                  defaultValue={vehicle.Color}
                  onChangeText={(text) => handleChange('Color', text.toUpperCase())}
                />
                <Text style={styles.label}>Marca del vehículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="¿Cuál es la marca de tu vehículo?"
                  maxLength={25}
                  onChangeText={(text) => handleChange('Marca', text.toUpperCase())}
                  defaultValue={vehicle.Marca}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Menciona una breve descripción de tu vehículo"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={(text) => handleChange('Descripcion', text)}
                  defaultValue={vehicle.Descripcion}
                  maxLength={150}
                />
              </View>
              <Text style={styles.labelImage}>Modifica la imagen de tu vehículo</Text>
              <View style={styles.vehicleCard}>
                <Image style={styles.vehicleImage} source={{ uri: image }} />
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.btnAdd} onPress={editImageChange}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Subir imagen</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd3} onPress={takePic}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Tomar fotografía </Text>
                    </View>
                    <Modal visible={visible} animationType='slide' onRequestClose={() => {
                      hide();
                      setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                    }}>
                      <CameraVehicleScren closeModal={hide} />
                    </Modal>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText2}>Quitar imagen</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()} disabled={isSubmitting}>
                <Text style={styles.buttonText}>Modificar Vehiculo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
      break;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelImage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
    fontSize: 14,
  },
  largeInput: {
    height: 120, // Ajusta la altura según tus necesidades

  },
  buttonSub: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  cardFooter: {
    padding: 10,
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
  buttonText2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAdd: {
    flex: 1,
    backgroundColor: '#008ffc', // Cambia el color del botón según tus necesidades
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center', // Esta línea alinea el texto al medio
  },
  btnAdd2: {
    flex: 1,
    backgroundColor: '#b8281d', // Cambia el color del botón según tus necesidades
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center', // Esta línea alinea el texto al medio
  },
  btnAdd3: {
    flex: 1,
    backgroundColor: 'green', // Cambia el color del tercer botón según tus necesidades
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center', // Esta línea alinea el texto al medio
  },
  vehicleImage: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default ModifyVehicle