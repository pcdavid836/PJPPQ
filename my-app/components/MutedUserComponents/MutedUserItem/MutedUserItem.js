import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert, TouchableOpacity, Button, TextInput } from 'react-native'
import { unMuteUser } from '../../../api'


const MutedUserItem = ({ users, onDeleteComplete }) => {
    console.log(users);
    const onKickusers = () => {
        Alert.alert(
            "Eliminar usuario",
            "¿Estás seguro de Quitar de esta lista a este usuario?",
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
                usuario_idUsuario: users.usuario_idUsuario,
                parqueo_idParqueo: users.parqueo_idParqueo
            };
            await unMuteUser(idData);
        } catch (error) {
            // Mostrar error si es nesesario
        }
    };



    let image = users.Url_imagen === 'default'
        ? "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe"
        : users.Url_imagen;


    let title = "Usuario";

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
                                {users.Nombres} {users.Primer_Apellido} {users.Segundo_Apellido}
                            </Text>
                        </Text>
                        <Text style={styles.productName}>Correo:
                            <Text style={styles.productPriceText}>
                                {users.Correo}
                            </Text>
                        </Text>
                        <Text style={styles.productName}>Celular:
                            <Text style={styles.productPriceText}>
                                {users.Celular}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: '#b8281d', padding: 10, borderRadius: 10 }}
                        onPress={() => onKickusers()}
                    >
                        <Text style={styles.textStyle}>Quitar Usuario</Text>
                    </TouchableOpacity>
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

export default MutedUserItem