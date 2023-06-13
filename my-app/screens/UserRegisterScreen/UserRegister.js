import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { saveUser } from '../../api';


const UserRegister = () => {

    const navigation = useNavigation();
    const [user, setUser] = useState({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        celular: '',
        ci: '',
        contraseña: '',
        contraseña2: '',
    });

    const handleChange = (name, value) => setUser({ ...user, [name]: value });

    const onTermsOfUsePressed = () => {
        console.warn('OnTermsOfUsePressed');
    };

    const onHandleSubmit = () => {
        const password = user.contraseña;
        const password2 = user.contraseña2;
        if (password !== password2) {
            ToastAndroid.show('Las contraseñas no coinciden!', ToastAndroid.SHORT);
            return;
        }
        else {
            console.log('success!');
            saveUser(user);
            navigation.navigate('MessageValidationScreen');

        }
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Crear una Cuenta</Text>
                <CustomInput
                    placeholder="Nombre o Nombres"
                    setValue={(text) => handleChange('nombres', text)}
                />
                <CustomInput
                    placeholder="Apellido"
                    setValue={(text) => handleChange('apellidoPaterno', text)}
                />
                <CustomInput
                    placeholder="Segundo Apellido"
                    setValue={(text) => handleChange('apellidoMaterno', text)}
                />
                <CustomInput
                    placeholder="Correo Electronico"
                    keyboardType="emailAddress"
                    setValue={(text) => handleChange('correo', text)}
                />
                <CustomInput
                    placeholder="Celular"
                    keyboardType="phone-pad"
                    setValue={(text) => handleChange('celular', text)}
                />
                <CustomInput
                    placeholder="CI"
                    setValue={(text) => handleChange('ci', text)}
                />
                <CustomInput
                    placeholder="Contraseña"
                    secureTextEntry
                    setValue={(text) => handleChange('contraseña', text)}
                />
                <CustomInput
                    placeholder="Repite la Contraseña"
                    secureTextEntry
                    setValue={(text) => handleChange('contraseña2', text)}
                />
                <CustomButton
                    text="Registrarse"
                    onPress={onHandleSubmit}
                />
                <Text style={styles.text}>
                    Al momento de registrarte estas confirmando aceptar los
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terminos y condiciones de nuestra Politica de Privacidad.</Text>
                </Text>


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
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default UserRegister;