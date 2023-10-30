import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert, TouchableOpacity, Button } from 'react-native'
import { parkVehicleDeny, parkVehicleFinish } from '../../../api'


const ParkedVehicleItem = ({ vehicles, onDeleteComplete }) => {
    let veh = "";
    const [image, setImage] = useState(vehicles.Url_Imagen);
    const [modalVisible, setModalVisible] = useState(false);

    switch (vehicles.idTipo_Vehiculo) {
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
    const dateBooked = new Date(vehicles.Fecha_Reserva);
    const formattedDatedateBooked = dateBooked.toLocaleDateString();

    const startTimeBooked = new Date(`1970-01-01T${vehicles.Hora_Reserva_Inicio}Z`);
    startTimeBooked.setHours(startTimeBooked.getHours() + 4); // Ajusta la hora
    const formattedStartTimeBooked = startTimeBooked.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const endTimeBooked = new Date(`1970-01-01T${vehicles.Hora_Reserva_Fin}Z`);
    endTimeBooked.setHours(endTimeBooked.getHours() + 4); // Ajusta la hora
    const formattedEndTimeBooked = endTimeBooked.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const startTime = new Date(`1970-01-01T${vehicles.Hora_Ingreso}Z`);
    startTime.setHours(startTime.getHours() + 4); // Ajusta la hora
    const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    let formattedEndTime = "N/A";
    if (vehicles.Hora_Salida) {
        const endTime = new Date(`1970-01-01T${vehicles.Hora_Salida}Z`);
        endTime.setHours(endTime.getHours() + 4); // Adjust the time
        formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }


    const twoOptionAlert = () => {
        Alert.alert(
            // Título
            'Eliminar registro',
            // Cuerpo
            '¿Estás seguro?',
            [
                {
                    text: 'Sí',
                    onPress: () => {
                        parkVehicleDeny(vehicles.idParqueo_Vehiculo).then(() => {
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

    const FinishOtionAlert = () => {
        Alert.alert(
            // Título
            'Vehiculo retirado',
            // Cuerpo
            '¿El vehículo se retiró del establecimiento?',
            [
                {
                    text: 'Sí',
                    onPress: () => {
                        parkVehicleFinish(vehicles.idParqueo_Vehiculo).then(() => {
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


    const renderAdditionalText = () => {
        const numericValue = parseInt(vehicles.idTipo_Vehiculo);
        switch (numericValue) {
            case 1:
                return (
                    <View style={{ padding: 10, marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>{veh}</Text>
                        <Text style={{ fontWeight: 'bold' }} >Placa: {vehicles.Placa}</Text>
                        <Text style={{ fontWeight: 'bold' }} >Color: {vehicles.Color}</Text>
                        <Text style={{ textAlign: 'justify' }} >{vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            case 2:
                return (
                    <View>
                        <Text style={styles.modalText}>{veh}</Text>
                        <Text>Placa: {vehicles.Placa}</Text>
                        <Text>Color: {vehicles.Color}</Text>
                        <Text>Descripcion: {vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            case 3:
                return (
                    <View>
                        <Text style={styles.modalText}>{veh}</Text>
                        <Text>Color: {vehicles.Color}</Text>
                        <Text>Descripcion: {vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            case 4:
                return (
                    <View>
                        <Text style={styles.modalText}>{veh}</Text>
                        <Text>Placa: {vehicles.Placa}</Text>
                        <Text>Color: {vehicles.Color}</Text>
                        <Text>Descripcion: {vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            case 5:
                return (
                    <View>
                        <Text style={styles.modalText}>{veh}</Text>
                        <Text>Placa: {vehicles.Placa}</Text>
                        <Text>Color: {vehicles.Color}</Text>
                        <Text>Descripcion: {vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            case 6:
                return (
                    <View>
                        <Text style={styles.modalText}>{veh}</Text>
                        <Text>Placa: {vehicles.Placa}</Text>
                        <Text>Color: {vehicles.Color}</Text>
                        <Text>Descripcion: {vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            case 7:
                return (
                    <View>
                        <Text style={styles.modalText}>{veh}</Text>
                        <Text>Descripcion: {vehicles.Descripcion}</Text>
                    </View>
                );
                break;
            default:
                return null;
        }
    };

    return (
        <View>
            <View style={{ margin: 10 }}>
                <View style={styles.header}>
                    <Text style={styles.productTitle}>{veh}</Text>
                </View>
                <View style={styles.productCard}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={{ uri: image }} style={styles.productImage} />
                    </TouchableOpacity>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {renderAdditionalText()}

                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.productInfo}>
                        <View style={{ backgroundColor: '#ddc8f7', padding: 5, marginBottom:10}}>
                            <Text style={styles.productPrice}>Fecha Reservada: <Text style={styles.productPriceText}>{formattedDatedateBooked}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.productPrice}>Ingreso: <Text style={styles.productPriceText}>{formattedStartTimeBooked} </Text></Text>
                                <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTimeBooked}</Text></Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#ddc8f7', padding: 5 }}>
                            <Text style={styles.productPriceCenter}>CONTROL</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.productPrice}>Entrada: <Text style={styles.productPriceText}>{formattedStartTime} </Text></Text>
                                <Text style={styles.productPrice}>Salida: <Text style={styles.productPriceText}>{formattedEndTime}</Text></Text>
                            </View>
                        </View>
                        {(vehicles.Estado !== 0) && (
                            <TouchableOpacity style={styles.btnAdd3} onPress={FinishOtionAlert}>
                                <Text style={styles.buttonText2}>VEHICULO RETIRADO</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.footer}>
                    {vehicles.Cancelado === 1 ? (
                        <Text style={styles.cancelled}>CANCELADO</Text>
                    ) : vehicles.ConfirmacionSalida === 1 ? (
                        <Text style={styles.completed}>VEHICULO RETIRADO</Text>
                    ) : (
                        <>
                            <Text style={styles.del} onPress={twoOptionAlert}>SIN INGRESAR</Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'purple'
    },
    productPriceCenter: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'purple',
        textAlign: 'center'
    },
    productPriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666'
    },
    del: {
        fontSize: 14,
        color: '#fc0000',
        fontWeight: 'bold',
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
    completed: {
        color: 'green',
        fontWeight: 'bold',
    },
    btnAdd3: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
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

export default ParkedVehicleItem