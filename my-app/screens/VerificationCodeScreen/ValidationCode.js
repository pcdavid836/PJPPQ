import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { saveUser } from '../../api';
import { useNavigation } from '@react-navigation/native';

const ValidationCode = ({ route }) => {

    const navigation = useNavigation();
    const { user } = route.params;
    const { verificationCode } = route.params;

    //console.log(user);
    console.log(verificationCode);

    const [codeSMS, setCodeSMS] = useState('');

    const handleSubmit = async () => {
        if (String(codeSMS) !== String(verificationCode.verificationCode)) {
            alert('El código de verificación es incorrecto');
            return;
        }

        await saveUser(user);
        navigation.navigate('UserSignIn');
        alert('¡Registro exitoso!');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ingresa el código SMS:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setCodeSMS(text)}
                value={codeSMS}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        width: '80%',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ValidationCode;
