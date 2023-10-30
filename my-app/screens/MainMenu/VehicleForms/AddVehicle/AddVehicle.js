import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../../firebaseConfig";
import { AuthContext } from '../../../..//context/AuthContext';
import CameraVehicleScren from '../../../MainMenu/TakePhoto/CameraVehicle'
import { saveVehicle } from '../../../../api';

const data = [
    { label: 'Automóvil', value: '1' },
    { label: 'Motocicleta', value: '2' },
    { label: 'Bicicleta', value: '3' },
    { label: 'Camión', value: '4' },
    { label: 'Autobus', value: '5' },
    { label: 'Minibus', value: '6' },
    { label: 'Otro', value: '7' },
];

const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe&_gl=1*tl3swp*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5Njk1NjY5MC4zMy4xLjE2OTY5NTY3NDIuOC4wLjA.";

const AddVehicle = ({ closeModal, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const { userInfo } = useContext(AuthContext);
    const [image, setImage] = useState(defaultImageUrl);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [visible, setVisible] = useState(false);
    const [capturedImageUri, setCapturedImageUri] = useState(null); // Estado para almacenar la URI de la imagen capturada

    const show = () => setVisible(true);
    const hide = (imageUri) => {
        setVisible(false);
        if (imageUri) {
            // Realiza las acciones necesarias con la URI de la imagen capturada
            setImage(imageUri);
            // Aquí puedes hacer la lógica para subir la imagen a Firebase u otras acciones
        }
    };

    const [vehicle, setVehicle] = useState({
        Placa: 'N/A',
        Color: 'N/A',
        Marca: 'N/A',
        Descripcion: '',
        Tipo_Vehiculo_idTipo_Vehiculo: '',
        usuario_idUsuario: '',
        Url_imagen: 'defaultVehicle',
    });

    const handleChange = (name, value) => setVehicle({ ...vehicle, [name]: value });

    const [actualImage, setActualImage] = useState(defaultImageUrl);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Selecciona la categoría de tu vehículo
                </Text>
            );
        }
        return null;
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
                setActualImage(image);
                //console.log(result.assets[0].uri);
                //Funcion que sube la imagen:
                //await uploadImage(result.assets[0].uri, "image");
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
        }
    }
    async function dropImage() {
        setImage(defaultImageUrl);
        vehicle.Url_imagen = "defaultVehicle";
    }

    async function handleSubmit() {
        if (value === 3 || value === 7) {
            vehicle.Placa = "N/A";
            vehicle.Marca = "N/A";
        }
        // Verifica si todos los campos requeridos están definidos
        vehicle.Tipo_Vehiculo_idTipo_Vehiculo = value;
        vehicle.usuario_idUsuario = userInfo.idUsuario;
        vehicle.Url_imagen = image;
        if (
            vehicle.Placa &&
            vehicle.Color &&
            vehicle.Marca &&
            vehicle.Descripcion &&
            vehicle.Tipo_Vehiculo_idTipo_Vehiculo &&
            vehicle.usuario_idUsuario &&
            vehicle.Url_imagen
        ) {

            saveVehicle(vehicle);
            await uploadImage(image, "image");
            closeModal();
            onComplete();


        } else {
            ToastAndroid.show('Completa los campos restantes!', ToastAndroid.SHORT);
        }
        /*
       
        console.log(vehicle);
        saveVehicle(vehicle);
        */
        /*
        await uploadImage(actualImage, "image");
        console.log(actualImage);
        vehicle.Url_imagen = actualImage;
       
        
        */

    }

    async function takePic() {
        setImage(defaultImageUrl);
        show();
    }

    async function uploadImage(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "VehicleImages/" + new Date().getTime() + "u" + userInfo.idUsuario + "vh")
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
                    setActualImage(downloadURL);
                    // Asigna la URL de la imagen a la variable actualImage
                    // Luego, puedes realizar otras acciones con la URL de la imagen, si es necesario.
                }).catch((error) => {
                    console.error("Error al obtener la URL de la imagen:", error);
                });
            });
    }



    const renderAdditionalText = () => {
        const numericValue = parseInt(value);
        switch (numericValue) {
            case 1:
                return (
                    <View>
                        <Text style={styles.label}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa la placa de tu vehículo"
                            onChangeText={(text) => handleChange('Placa', text)}
                        />
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Marca del vehículo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿Cuál es la marca de tu vehículo?"
                            onChangeText={(text) => handleChange('Marca', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            case 2:
                return (
                    <View>
                        <Text style={styles.label}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa la placa de tu vehículo"
                            onChangeText={(text) => handleChange('Placa', text)}
                        />
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Marca del vehículo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿Cuál es la marca de tu vehículo?"
                            onChangeText={(text) => handleChange('Marca', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            case 3:
                return (
                    <View>
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            case 4:
                return (
                    <View>
                        <Text style={styles.label}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa la placa de tu vehículo"
                            onChangeText={(text) => handleChange('Placa', text)}
                        />
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Marca del vehículo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿Cuál es la marca de tu vehículo?"
                            onChangeText={(text) => handleChange('Marca', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            case 5:
                return (
                    <View>
                        <Text style={styles.label}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa la placa de tu vehículo"
                            onChangeText={(text) => handleChange('Placa', text)}
                        />
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Marca del vehículo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿Cuál es la marca de tu vehículo?"
                            onChangeText={(text) => handleChange('Marca', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            case 6:
                return (
                    <View>
                        <Text style={styles.label}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa la placa de tu vehículo"
                            onChangeText={(text) => handleChange('Placa', text)}
                        />
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Marca del vehículo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿Cuál es la marca de tu vehículo?"
                            onChangeText={(text) => handleChange('Marca', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            case 7:
                return (
                    <View>
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿De que color es tu vehículo?"
                            onChangeText={(text) => handleChange('Color', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona una breve descripción de tu vehículo"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                    </View>
                );
                break;
            default:
                return null;
        }
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Añadir Vehículo</Text>
                    </View>
                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Selecciona una opción' : '...'}
                        searchPlaceholder="Buscar..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                    {renderAdditionalText()}
                    <Text style={styles.labelImage}>Ingresa una imagen de tu vehículo</Text>
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
                                    setImage(defaultImageUrl); // Establece la imagen en defaultImageUrl cuando se cierra el Modal
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
                        <Text style={styles.buttonText}>Agregar vehículo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

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

export default AddVehicle;
