import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { updateUserPassword } from '../../../api';
import CryptoES from 'crypto-es';

const UpdatePasswordScreen = ({ user, closeModal }) => {
    //console.log(user.usuar.idUsuario); consoleario); consolesuario);

    const [newinfo, setNewInfo] = useState({
        Codex: '',
        Contrasena1: '',
        Contrasena2: '',
    });

    const handleChange = (name, value) => setNewInfo({ ...newinfo, [name]: value });

    const onCancel = async () => {
        closeModal();
    }

    const onNewConfirm = async () => {
        if (newinfo.Contrasena1 !== newinfo.Contrasena2) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }
        if (!newinfo.Contrasena1 || !newinfo.Contrasena2 || !newinfo.Codex) {
            Alert.alert("Error", "Todos los campos deben estar llenos.");
            return;
        }
        if (newinfo.Contrasena1.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        const hash = CryptoES.SHA256(newinfo.Contrasena1);
        if (user.usuario.Contrasena === hash.toString()) {
            Alert.alert("Error", "Debes ingresar una contraseña diferente a la anterior.");
            return;
        }
        try {
            const newData = {
                idUsuario: user.usuario.idUsuario,
                Codigo: newinfo.Codex,
                Contrasena: hash.toString()
            };
            const response = await updateUserPassword(newData);
            const result = await response.json();
            if (response.ok) {
                Alert.alert("Éxito", "Contraseña actualizada correctamente.");
                closeModal(); // Cierra el modal
            } else {
                Alert.alert("Error", result.mensaje);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al actualizar la contraseña.");
        }
    };



    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reiniciar Contraseña</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Código"
                        value={newinfo.Codex}
                        onChangeText={(text) => handleChange('Codex', text)}
                        style={styles.input}
                        maxLength={7}
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Ingresa tu nueva contraseña"
                        value={newinfo.Contrasena1}
                        onChangeText={(text) => handleChange('Contrasena1', text)}
                        style={styles.input}
                        secureTextEntry
                        maxLength={45}
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Repite tu nueva contraseña"
                        value={newinfo.Contrasena2}
                        onChangeText={(text) => handleChange('Contrasena2', text)}
                        style={styles.input}
                        secureTextEntry
                        maxLength={45}
                        autoCapitalize="none"
                    />
                </View>
                <View style={{ alignItems: 'center', marginBottom: 20, width: '80%' }}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#3B71F3', width: '80%' }]} onPress={onNewConfirm}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e8e8e8' }]} onPress={onCancel}>
                        <Text style={[styles.buttonText, { color: '#000' }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 45,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50, // Altura del TextInput
    },
    button: {
        width: '80%', // Ancho del botón
        marginTop: 10, // Margen superior
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default UpdatePasswordScreen