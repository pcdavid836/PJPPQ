import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/images/adaptive-icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getUserMail } from '../../api';

const UserSignIn = () => {
    
    const loadUsers = async () => {
        const res = await fetch('http://192.168.1.13:3000/user')
        const data = await res.json()
        console.log(data);
    };

    const [logser, setLogser] = useState({
        Correo: '',
        Contraseña: '',
    });

    const handleChange = (name, value) => setLogser({ ...logser, [name]: value });

    const { height } = useWindowDimensions();

    const navigation = useNavigation();

   
       
    
    const onSignInPressed = async () => {
        const correo = logser.Correo;
        const contraseña = logser.Contraseña;
    
        const user = await getUserMail(logser);
        const email = user[0].Correo;
        const mainpassword = user[0].Contraseña;
        const mainId = user[0].idUsuario;
        

        console.log(user);

        console.log(correo);
        console.log(contraseña);

        if (email === correo && mainpassword === contraseña) {
            // Save the user's email to AsyncStorage
        await AsyncStorage.setItem('userId', mainId.toString());

            // Navigate to the HomeScreen
            navigation.navigate('HomeScreen');
        } else {
            // Show an error message
            ToastAndroid.show('Correo o Contraseña Incorrectos!', ToastAndroid.SHORT);
        }
     
    };

    const onForgotPasswordPressed = () => {
        console.warn('OnForgotPasswordPressed');
    };

    const onSignInGoogle = () => {
        console.log(logser);
    };

    const onSignInFacebook = () => {
        console.warn('onSignInFacebook');
    };

    const onSignUpPress = () => {
        navigation.navigate('UserRegister');
    };

    
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode='contain'
                />

                <CustomInput
                    placeholder="Correo Electronico"
                    setValue={(text) => handleChange('Correo', text)}
                />
                <CustomInput
                    placeholder="Contraseña"
                    setValue={(text) => handleChange('Contraseña', text)}
                    secureTextEntry
                />
                <CustomButton
                    text="¿Olvidaste tu contraseña?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
                <CustomButton
                    text="Iniciar Sesión"
                    onPress={onSignInPressed}

                />
                <CustomButton
                    text="Iniciar sesión con Google"
                    onPress={onSignInGoogle}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
                <CustomButton
                    text="Iniciar sesión con Facebook"
                    onPress={onSignInFacebook}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />

                <CustomButton
                    text="¿No tienes una cuenta? Registrate"
                    onPress={onSignUpPress}
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
    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100,
        padding: 40,
    },
});

export default UserSignIn;