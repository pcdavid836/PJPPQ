import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState, useContext } from 'react';
import { Camera, CameraType } from 'expo-camera';
//import { shareAsync } from 'expo-sharing'; Sirve para compartir fotos o archivos a distintas redes sociales
import * as MediaLibrary from 'expo-media-library';
import ButtonCamera from '../../../../components/ButtonCamera';
import { AuthContext } from '../../../../context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../../firebaseConfig";
import { updateImageUser } from '../../../../api';

export default function CameraProfileScreen( {closeModal} ) {
  const { userInfo, updateUserImage } = useContext(AuthContext);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);


  const [actualImage, setActualImage] = useState({
    Url_imagen: userInfo.Url_imagen,
  });

  const handleChange2 = (name, value) => setActualImage({ ...actualImage, [name]: value });

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "ProfileImages/" + new Date().getTime() + "u" + userInfo.idUsuario + "ph")
    const uploadTask = uploadBytesResumable(storageRef, blob)

    
    //Eventos que suceden cuando se sube la imagen:
    //Cuadro de carga (no es usado aqui pero puede ser usado en otra vista)
    uploadTask.on("state_changed", (snapshot) => {
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Progress", progress + "% done");
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
          //console.log(downloadURL);
          actualImage.Url_imagen = downloadURL;
          updateUserImage(downloadURL);
          setImage("");
        })
      }
    )
  }


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Pidiendo permisos...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permiso de la Cámara no conseguido. Por favor cambia esta opción en los ajustes de tu dispositivo.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      //console.log(photo.uri);
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
      setImage(photo.uri);
      //Funcion que sube la imagen:
      uploadImage(photo.uri, "image");
      closeModal();
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
          {hasMediaLibraryPermission ? <ButtonCamera title={"Guardar"} icon="checkmark-circle-outline" onPress={savePhoto} /> : undefined}
          <ButtonCamera title={"Descartar"} icon="trash-outline" onPress={() => setPhoto(undefined)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        flashMode={flash}
        type={type}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer} >
          <ButtonCamera icon={'swap-horizontal-outline'} onPress={() => {
            setType(type === CameraType.back ? CameraType.front : CameraType.back)
          }} />
          <ButtonCamera 
             icon={flash === Camera.Constants.FlashMode.off ? 'flash-off-outline' : 'flash-outline' }
            color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
            onPress={() => {
              setFlash(flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off 
              )
            }} />
        </View>
        
      </Camera>
      <View>
        <ButtonCamera title="Tomar Fotografía" icon="camera-outline" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    aspectRatio: 3 / 4
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    width: '75%',
  },
});