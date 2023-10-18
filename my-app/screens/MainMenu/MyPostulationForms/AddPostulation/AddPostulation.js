import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, ToastAndroid, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../../firebaseConfig";
import { AuthContext } from '../../../..//context/AuthContext';
import { postulate } from '../../../../api';
import CameraParkScreen from '../../TakePhoto/CameraPark/';
import PlaceMyLocation from '../PlaceMyLocation';
import * as DocumentPicker from 'expo-document-picker';


const data = [
    { label: 'Privado', value: '1' },
    { label: 'Publico', value: '2' },
    { label: 'Taller mecánico', value: '3' },
    { label: 'Taller de bicicletas', value: '4' },
];

const AddPostulation = ({ closeModal, onComplete }) => {
    let definedImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7&_gl=1*jwsgmu*_ga*MTkxMTcyMTI0MC4xNjk0ODIyNzI3*_ga_CW55HF8NVT*MTY5NzYwMzQyMS4zOC4xLjE2OTc2MDM1MzguMzYuMC4w";
    const [progress, setProgress] = useState(0);
    const { userInfo } = useContext(AuthContext);
    const [image, setImage] = useState(definedImage);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [visible, setVisible] = useState(false);
    const [fileName, setFileName] = useState('Esperando contenido...');
    const [capturedImageUri, setCapturedImageUri] = useState(null); // Estado para almacenar la URI de la imagen capturada
    const [document, setDocumentUri] = useState('defaultFile');
    const [secondModalVisible, setSecondModalVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = (imageUri) => {
        setVisible(false);
        if (imageUri) {
            // Realiza las acciones necesarias con la URI de la imagen capturada
            setImage(imageUri);
            // Aquí puedes hacer la lógica para subir la imagen a Firebase u otras acciones
        }
    };

    let varFileName = '';
    const [fastUbi, setFastUbi] = useState("");

    const toggleSecondModal = () => {
        setSecondModalVisible(!secondModalVisible);
    };

    const [myparkValues, setMyparkValues] = useState({
        Ubicacion: '',
        Tamaño: '',
        Descripcion: '',
        Tipo_Parqueo_idTipo_Parqueo: '',
        Titulo: '',
        Url_imagen: '',
        Url_validacion: '',
        Latitud: '',
        Longitud: '',
        usuario_idUsuario: ''
    });

    const handleChange = (name, value) => setMyparkValues({ ...myparkValues, [name]: value });

    const handleLocationSelect = (locationData) => {
        // Aquí puedes acceder a los datos de ubicación, que incluyen latitud, longitud y dirección.
        // Realiza la lógica necesaria con estos datos.
        console.log('Datos de ubicación seleccionados:', locationData);
        setFastUbi(locationData.address);
        console.log(locationData.address);
        
        // Ejemplo de cómo asignar la ubicación a myparkValues:
        setMyparkValues({
            ...myparkValues,
            Latitud: locationData.latitude,
            Longitud: locationData.longitude,
            // Otras asignaciones de datos, si es necesario
        });
    };



    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Selecciona la categoría del establecimiento
                </Text>
            );
        }
        return null;
    };

    async function pickDocument() {
        setFileName('fileName');
        setDocumentUri('defaultFile');
        let result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            multi: false,
        });

        if (!result.canceled) {
            setFileName(result.assets[0].name);
            setDocumentUri(result.assets[0].uri);
        }

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
        myparkValues.Url_imagen = "defaultPark";
    }

    async function takePic() {
        setImage(definedImage);
        show();
    }

    async function handleSubmit() {
        // Verificar si todos los campos requeridos están definidos
        myparkValues.Url_validacion = document;
        myparkValues.Tipo_Parqueo_idTipo_Parqueo = value;
        myparkValues.usuario_idUsuario = userInfo.idUsuario;
        myparkValues.Url_imagen = image;
        if (
            myparkValues.Ubicacion &&
            myparkValues.Tamaño &&
            myparkValues.Descripcion &&
            myparkValues.Tipo_Parqueo_idTipo_Parqueo &&
            myparkValues.Titulo &&
            myparkValues.Url_imagen &&
            myparkValues.Url_validacion &&
            myparkValues.Latitud &&
            myparkValues.Longitud &&
            myparkValues.usuario_idUsuario
        ) {

            postulate(myparkValues);
            await uploadImage(image, "image");
            await uploadFile(document, "file");
            closeModal();
            onComplete();


        } else {
            ToastAndroid.show('Completa los campos restantes!', ToastAndroid.SHORT);
        }
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

    async function uploadFile(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "GarageDocuments/" + new Date().getTime() + "u" + userInfo.idUsuario + "pkd")
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
                    setDocumentUri(downloadURL);
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
                        <Text style={styles.title}>Ingresa información sobre tu postulación</Text>
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
                    <View>
                        <Text style={styles.label}>Título</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="¿Cómo deseas llamar a este lugar?"
                            onChangeText={(text) => handleChange('Titulo', text)}
                        />
                        <Text style={styles.label}>Ubicación</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Menciona la Dirección del lugar"
                            onChangeText={(text) => handleChange('Ubicacion', text)}
                        />
                        <Text style={styles.label}>Tamaño en metros cuadrados</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Menciona un tamaño aproximado del lguar a ceder"
                            onChangeText={(text) => handleChange('Tamaño', text)}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            placeholder="Menciona toda la informacion que quieras a dar a conocer de este lguar..."
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={(text) => handleChange('Descripcion', text)}
                        />
                        <View style={{ margin: 10 }}>
                            <Text style={styles.label}>Indicar Dirección del establecimiento</Text>
                            <Button
                                style={styles.buttonShowMap}
                                title={'Mostrar Mapa'}
                                onPress={toggleSecondModal} // Llama a la función para mostrar el segundo modal
                            />
                            <Text style={{ textAlign: 'center' }}>Dirección: {fastUbi}</Text>
                            <Modal visible={secondModalVisible} animationType='slide' onRequestClose={toggleSecondModal}>
                                <View style={styles.secondModalContainer}>
                                    <PlaceMyLocation closeModal={toggleSecondModal} onLocationSelect={handleLocationSelect} />
                                </View>
                            </Modal>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={styles.label}>Subir documento de propiedad</Text>
                            <Button style={styles.buttonSub} title={'Subir archivo'} onPress={pickDocument} />
                            <Text style={{ textAlign: 'center' }}>{fileName}</Text>
                        </View>
                    </View>
                    <Text style={styles.labelImage}>Ingresa una imagen de referencia</Text>
                    <View style={styles.vehicleCard}>
                        <Image style={styles.vehicleImage} source={{ uri: image }} />
                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={styles.btnAdd} onPress={editImageChange} >
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText2}>Subir imagen</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnAdd3} onPress={takePic} >
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText2}>Tomar fotografía </Text>
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

                    <TouchableOpacity style={styles.buttonSub} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonText}>Subir Postulación</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
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
        backgroundColor: '#1cab00',
        borderRadius: 5,
        paddingVertical: 12,
        marginTop: 20,
    },
    buttonShowMap: {
        backgroundColor: '#ffbb00',
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

export default AddPostulation   