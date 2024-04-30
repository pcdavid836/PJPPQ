import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ToastAndroid, Modal, Button, Alert } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { AuthContext } from '../../../context/AuthContext';
import { updateUser, updateImageUser, emailSearchPasswordRecover } from '../../../api';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebaseConfig";
import Ionicons from 'react-native-vector-icons/Ionicons'
import StackNavigationGroup from '../../Navigation/StackNavigationGroup';
import CameraProfileScreen from '../TakePhoto/CameraProfile/CameraProfileScreen';
import UpdatePasswordScreen from '../UpdatePassword/UpdatePasswordScreen';
import defaultAvatar from '../../../assets/user.png'; // Asegúrate de que la ruta sea correcta




const ProfileScreen = () => {
  const { userInfo, userImage, updateUserImage } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const [actualUser, setActualUser] = useState({
    Nombres: userInfo.Nombres,
    Primer_Apellido: userInfo.Primer_Apellido,
    Segundo_Apellido: userInfo.Segundo_Apellido,
    Celular: userInfo.Celular,
    CI: userInfo.CI,
  });


  //USARLA PARA QUITAR BUG DE CONSOLE WARN Y HACER LO MISMO EN TOCAS LAS VISTAS QUE LO NESESITEN
  const defaultImage = require('../../../assets/images/unknown.png');

  const handleChangeImage = (uri) => {
    setActualImage({
      Url_imagen: uri,
    });
  };

  const [actualImage, setActualImage] = useState({
    Url_imagen: userInfo.Url_imagen,
  });


  //console.log("Imagen actual " + actualImage.Url_imagen);
  useEffect(() => {
    if (actualImage.Url_imagen === "default") {
      actualImage.Url_imagen = 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/ProfileImages%2Fuser_default.png?alt=media&token=d6b24730-d87d-4be5-9275-df4a44f5c323';
      updateUserImage(actualImage.Url_imagen); // Llama a la función para actualizar userImage en el contexto
    }

    // Actualiza la imagen cuando cambie userImage
    setActualImage({ Url_imagen: userImage });
  }, [userImage]);



  const handleChange = (name, value) => setActualUser({ ...actualUser, [name]: value });
  const handleChange2 = (name, value) => setActualImage({ ...actualImage, [name]: value });


  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);


  const TakePicture = () => {
    show();
  };


  async function editImageChange() {
    let result = await ImagePicker.launchImageLibraryAsync({
      cameraType: ImagePicker.CameraType.Back,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
      //Funcion que sube la imagen:
      await uploadImage(result.assets[0].uri, "image");

    }


    async function uploadImage(uri, fileType) {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, "ProfileImages/" + new Date().getTime() + "u" + userInfo.idUsuario)
      const uploadTask = uploadBytesResumable(storageRef, blob)

      //Eventos que suceden cuando se sube la imagen:
      //Cuadro de carga (no es usado aqui pero puede ser usado en otra vista)
      uploadTask.on("state_changed", (snapshot) => {
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          //console.log("Progress", progress + "% done");
          setProgress(progress.toFixed());
        }
      },
        (error) => {
          //handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //Imagen almacenada en base de datos y nube
            handleChange2("Url_imagen", downloadURL);
            updateImageUser(userInfo.idUsuario, downloadURL);
            actualImage.Url_imagen = downloadURL;
            updateUserImage(downloadURL);
            setImage("");
          })
        }
      )
    }
  }

  const onSaveUpdate = () => {
    // Verifica que todos los campos estén llenos
    if (!actualUser.Nombres || !actualUser.Primer_Apellido || !actualUser.Segundo_Apellido || !actualUser.CI || !actualUser.Celular) {
      ToastAndroid.show('Por favor, completa todos los campos!', ToastAndroid.SHORT);
      return;
    }

    // Si todos los campos están llenos, procede a actualizar el usuario
    updateUser(userInfo.idUsuario, actualUser);
    ToastAndroid.show('Cambios realizados con éxito!', ToastAndroid.SHORT);
  };

  const onModifyPassword = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que quieres modificar tu contraseña?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Sí", onPress: async () => {
            try {
              const response = await emailSearchPasswordRecover({ Correo: userInfo.Correo });
              //console.log(response);
              if (response.mensaje === "Correo de verificación enviado") {
                setUserData(response);
                setModalVisible(true);
              } else {
                Alert.alert("Error", response.mensaje);
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Ocurrió un error al recuperar la contraseña.");
            }
          }
        }
      ]
    );
  };

  return (
    <View>
      <StackNavigationGroup />
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={actualImage && actualImage.Url_imagen ? { uri: actualImage.Url_imagen } : defaultAvatar}
        />
      </View>

      <View style={styles.body}>
        <Menu renderer={renderers.ContextMenu}>
          <MenuTrigger style={styles.btnImage}>
            <Image
              style={styles.imageIcon}
              source={require('../../../assets/camera.png')}
            />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <MenuOption onSelect={() => TakePicture()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="camera-outline" size={22} style={{ marginRight: 8 }} />
                  <Text style={{ color: 'gray' }}>Tomar Fotografía</Text>
                </View>
              </MenuOption>
              <MenuOption onSelect={() => editImageChange()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="image-outline" size={22} style={{ marginRight: 8 }} />
                  <Text style={{ color: 'gray' }}>Subir Imagen</Text>
                </View>
              </MenuOption>
            </View>
          </MenuOptions>
        </Menu>
        <Modal visible={visible} animationType='slide' onRequestClose={hide}>
          <CameraProfileScreen closeModal={hide} />

        </Modal>

        <Text style={styles.name}>{userInfo.Correo}</Text>
        <Text style={styles.info}>{userInfo.Rol}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre o Nombres</Text>
          <TextInput
            style={styles.input}
            defaultValue={userInfo.Nombres}
            placeholder={'Nombre'}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange('Nombres', text)}
            maxLength={45}
          />
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            defaultValue={userInfo.Primer_Apellido}
            placeholder="Apellido"
            placeholderTextColor="#999"
            maxLength={45}
            onChangeText={(text) => handleChange('Primer_Apellido', text)}
          />
          <Text style={styles.label}>Segundo Apellido</Text>
          <TextInput
            style={styles.input}
            defaultValue={userInfo.Segundo_Apellido}
            placeholder="Segundo Apellido"
            placeholderTextColor="#999"
            maxLength={45}
            onChangeText={(text) => handleChange('Segundo_Apellido', text)}
          />
          <Text style={styles.label}>Carnet de Identidad</Text>
          <TextInput
            style={[styles.input, { color: '#6a0dad' }]} // Cambia el color del texto a un azul oscuro tirando a lila
            placeholder="CI"
            defaultValue={userInfo.CI}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange('CI', text.toUpperCase())}
            maxLength={10}
            editable={false}
          />
          <Text style={styles.label}>Celular</Text>
          <TextInput
            style={[styles.input, { color: '#6a0dad' }]} // Cambia el color del texto a un azul oscuro tirando a lila
            defaultValue={userInfo.Celular}
            placeholder="Celular"
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange('Celular', text)}
            keyboardType="numeric"
            maxLength={15}
            editable={false}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.button, styles.pass]} onPress={onModifyPassword}>
              <Text style={styles.buttonText}>Modificar Contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.save]} onPress={onSaveUpdate}>
              <Text style={styles.buttonText} >Guardar</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={isModalVisible} animationType='slide'>
            <UpdatePasswordScreen user={userData} closeModal={() => setModalVisible(false)} />
          </Modal>

          {/*<TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 2</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  PPcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: 'red',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
    Color: '#696969',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    alignSelf: 'center',
    paddingTop: 20,
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  label: {
    width: "100%",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  textOptions: {
    fontSize: 20,
    color: 'gray',
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    padding: 10,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
    alignSelf: 'center',
  },
  btnContainer: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-around'
  },
  button: {
    width: '48%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pass: {
    backgroundColor: '#eb8b00'
  },
  save: {
    backgroundColor: '#DB4437'
  },
  btnImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#D3D3D3',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 'auto',
    bottom: -20, // Distancia desde la parte inferior de la pantalla
    right: 130, // Distancia desde el lado derecho de la pantalla
  },
  imageIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

const optionsStyles = StyleSheet.create({
  optionsContainer: {
    padding: 10,
    marginLeft: 20,
  },
});

export default ProfileScreen;