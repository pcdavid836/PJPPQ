import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert, TouchableOpacity, Button, TextInput } from 'react-native'
import { deleteSidekick } from '../../../api'


const SidekickItem = ({ sidekick, onDeleteComplete }) => {
    //console.log(sidekick);
    const onKickSidekick = () => {
        Alert.alert(
            "Eliminar usuario",
            "¿Estás seguro de que quieres eliminar este usuario?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        handleDelete().then(() => {
                            onDeleteComplete();
                        });
                    }
                }
            ]
        );
    };

    const handleDelete = async () => {
        try {
            const idData = {
                usuario_idUsuario: sidekick.usuario_idUsuario,
                parqueo_idParqueo: sidekick.parqueo_idParqueo
            };
            await deleteSidekick(idData);
        } catch (error) {
            // Mostrar error si es nesesario
        }
    };
    


    let image = sidekick.Url_imagen === 'default'
        ? "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe"
        : sidekick.Url_imagen;


    let title = "Usuario";
    switch (sidekick.Co_cuidador) {
        case 0:
            title = "Dueño";
            break;
        case 1:
            title = "Ayudante";
            break;
        default:
            title = "Usuario";
            break;
    }

    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>
                <View style={styles.header}>
                    <Text style={styles.productTitle}>{title}</Text>
                </View>
                <View style={styles.productCard}>
                    <Image source={{ uri: image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>Nombre:
                            <Text style={styles.productPriceText}>
                                {sidekick.Nombres} {sidekick.Primer_Apellido} {sidekick.Segundo_Apellido}
                            </Text>
                        </Text>
                        <Text style={styles.productName}>Correo:
                            <Text style={styles.productPriceText}>
                                {sidekick.Correo}
                            </Text>
                        </Text>
                        <Text style={styles.productName}>Celular:
                            <Text style={styles.productPriceText}>
                                {sidekick.Celular}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    {sidekick.Co_cuidador === 1 && (
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                            onPress={() => onKickSidekick()}
                        >
                            <Text style={styles.textStyle}>Quitar Usuario</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        width: 325,
        marginTop: 20,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
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
    productPriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666'
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default SidekickItem