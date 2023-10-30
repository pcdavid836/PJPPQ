import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, ToastAndroid, Button } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../../firebaseConfig";
import CameraParkScreen from '../../TakePhoto/CameraPark/';
import { CheckBox } from 'react-native-elements';
import { getInfoPark, updateBasicPark } from '../../../../api';
import { AuthContext } from '../../../..//context/AuthContext';

const MyCardModInfo = ({ parkId, closeModal, updateMod }) => {
    const definedImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7&_gl=1*s19mo5*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5ODAwOTA3MS40My4x.1";
    const [image, setImage] = useState(definedImage);
    const [checked, setChecked] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const [mypark, setMyPark] = useState(null);
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

    const fetchData = async () => {
        try {
            const response = await getInfoPark(parkId);
            setMyPark(response);
            setImage(response.Url_imagen);
            setChecked(response.Disponibilidad === 1); // Make sure 'checked' reflects 'Disponibilidad'
        } catch (error) {
            console.error('Error fetching park details.', error);
        }
    };




    // Llama a la función de obtención de detalles del vehículo al cargar el componente
    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (name, value) => setMyPark({ ...mypark, [name]: value });

    const handleCheckBoxChange = () => {
        const newCheckedValue = !checked;
        setChecked(newCheckedValue);
        setMyPark({
            ...mypark,
            Disponibilidad: newCheckedValue ? 1 : 0,
        });
    };


    async function dropImage() {
        setImage(definedImage);
        mypark.Url_imagen = "defaultPark";
    }

    if (image === "defaultPark") {
        setImage("https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7&_gl=1*s19mo5*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5ODAwOTA3MS40My4xLjE2OTgwMDkwNzQuNTcuMC4w");
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

    async function takePic() {
        setImage(definedImage);
        show();
    }

    async function handleSubmit() {
        // Verificar si todos los campos requeridos están definidos
        updateBasicPark(parkId, mypark);
        //updatePost(myparkId, mypark);
        if (mypark.Url_imagen !== "defaultPark") {
            //agregar if donde si la imagen es igual a su response no se debe subir a la nube
            await uploadImage(image, "image");
        }
        closeModal();
        updateMod();

    }

    async function uploadImage(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "GarageImages/" + new Date().getTime() + "u" + userInfo.idUsuario + "pk")
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
                    // Asigna la URL de la imagen a la variable actualImage
                    // Luego, puedes realizar otras acciones con la URL de la imagen, si es necesario.
                }).catch((error) => {
                    console.error("Error al obtener la URL de la imagen:", error);
                });
            });
    }


    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Realiza cambios a tu parqueo</Text>
                    </View>
                    <Text style={styles.labelImage}>Modifica la imagen de tu parqueo</Text>
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
                                    <Text style={styles.buttonText2}>Tomar fotografía</Text>
                                </View>
                                <Modal visible={visible} animationType='slide' onRequestClose={() => {
                                    hide();
                                    setImage(definedImage); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
                                }}>
                                    <CameraParkScreen closeModal={hide} />
                                </Modal>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnAdd2} onPress={dropImage} >
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText2}>Quitar imagen</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Titulo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el nombre de tu puesto"
                            onChangeText={(text) => handleChange('Titulo', text)}
                            defaultValue={mypark ? mypark.Titulo : ''}
                        />
                        <View style={styles.checkboxContainer}>
                            <Text style={styles.label}>Disponible: </Text>
                            <CheckBox
                                checked={checked}
                                onPress={handleCheckBoxChange}
                                iconType="material-community"
                                checkedIcon="checkbox-outline"
                                uncheckedIcon={'checkbox-blank-outline'}
                                title={"Activo"}
                            />
                        </View>
                        <Text style={styles.label}>Ubicación</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa la Ubicación del lugar"
                            onChangeText={(text) => handleChange('Ubicacion', text)}
                            defaultValue={mypark ? mypark.Ubicacion : ''}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción del lugar"
                            multiline={true}
                            numberOfLines={6}
                            defaultValue={mypark ? mypark.Descripcion : ''}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonText}>Modificar Puesto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default MyCardModInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    cardFooter: {
        padding: 5,
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
        width: 300,
        marginBottom: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
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
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});