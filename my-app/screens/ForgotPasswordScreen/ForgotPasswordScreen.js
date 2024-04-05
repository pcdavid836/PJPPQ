import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { emailSearchPasswordRecover } from '../../api';

const ForgotPasswordScreen = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState({
        Correo: '',
    });

    const navigation = useNavigation();

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const onConfirmPressed = async () => {
        if (!email.Correo) {
            Alert.alert("Error", "El campo de correo electrónico no puede estar vacío.");
            return;
        }
        if (!validateEmail(email.Correo)) {
            Alert.alert("Error", "El correo electrónico ingresado no es válido.");
            return;
        }
        try {
            const response = await emailSearchPasswordRecover(email);
            if (response.mensaje === "Correo de verificación enviado") {
                setUser(response.usuario);
                //console.log(response.usuario);
                navigation.navigate('NewPasswordScreen', { user: response.usuario });
            } else {
                Alert.alert("Error", response.mensaje);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al recuperar la contraseña.");
        }

    };

    const onSignInPressed = () => {
        navigation.navigate('UserSignIn');
    };


    //Usar si es nesesario
    const onResendPressed = () => {
        console.warn('ResendPressed');
    };

    const handleChange = (name, value) => setEmail({ ...email, [name]: value });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Recuperar Contraseña</Text>
                <TextInput
                    placeholder="Tu Email"
                    value={email.Correo}
                    onChangeText={(text) => handleChange('Correo', text)}
                    style={[styles.input, styles.textInput]}
                    maxLength={45}
                    autoCapitalize="none"
                />
                <CustomButton
                    text="Confirmar"
                    onPress={onConfirmPressed}
                />
                <CustomButton
                    text="Volver a inicio de sesión"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

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
    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    textInput: {
        height: 50, // Ajusta la altura del TextInput
        width: '80%',
    },
});

export default ForgotPasswordScreen;
