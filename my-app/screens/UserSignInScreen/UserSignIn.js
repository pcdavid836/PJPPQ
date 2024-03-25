import { React, useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native';
import Logo from '../../assets/images/logoEX.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getUserMail } from '../../api';
import { AuthContext } from '../../context/AuthContext';
//import { GoogleSignIn, GoogleSignInButton, statusCodes } from '@react-native-google-signin/google-signin'
import CryptoES from 'crypto-es';

const UserSignIn = () => {
    const { login, updateUserImage } = useContext(AuthContext);
    const configureGoogleSignIn = () => {
        GoogleSignIn.configure({
            webClientId: "121681989018-befic7f8r6cd1ahrjq2oilngsi3n6uu4.apps.googleusercontent.com",
            androidClientId: "121681989018-befic7f8r6cd1ahrjq2oilngsi3n6uu4.apps.googleusercontent.com",
            iosClientId: "",
        });
    };
    //Llamado de usuarios (prueba)
    /*
    const loadUsers = async () => {
        const res = await fetch('http://192.168.1.6:3000/user')
        const data = await res.json()
        console.log(data);
    };
    */
/*
    useEffect(() => {
        configureGoogleSignIn();
    });

    const signIn = () => {
        console.log('pressed')
    };
*/
    const [logser, setLogser] = useState({
        Correo: '',
        Contrasena: '',
    });

    const handleChange = (name, value) => setLogser({ ...logser, [name]: value });

    const { height } = useWindowDimensions();

    const navigation = useNavigation();

    const onSignInPressed = async () => {

        if (logser.Correo === '' || logser.Contrasena === '') {
            ToastAndroid.show('Debes llenar los datos requeridos!', ToastAndroid.SHORT);
            return;
        }

        const correo = logser.Correo;
        //console.log("actual: " + logser.Contrasena);

        const hash = CryptoES.SHA256(logser.Contrasena);
        const hashString = hash.toString();
        logser.Contrasena = hashString;

        //console.log("actual 2: " + logser.Contrasena);

        //Realzar busqueda API y obtener correo electronico y Contrasena.
        const user = await getUserMail(logser);

        //console.log(user);
        const email = user.Correo;
        const mainpassword = user.Contrasena;
        //const mainId = user.idUsuario;

        /* Mostrar Contrasena y Email
        console.log(email);
        console.log(mainpassword);
        */

        //console.log(mainpassword); ver Contrasena despues del proceso

        if (email === correo && mainpassword === hashString) {
            // Navigate to the HomeScreen
            login(user);
            updateUserImage(user.Url_imagen);
            navigation.navigate('HomeScreen');


        } else {
            // Show an error message
            ToastAndroid.show('Correo o Contrasena Incorrectos!', ToastAndroid.SHORT);
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
        console.log(login);
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
                    maxLength={45}
                />
                <CustomInput
                    placeholder="Contraseña"
                    setValue={(text) => handleChange('Contrasena', text)}
                    secureTextEntry
                    maxLength={16}
                />
                <CustomButton
                    text="¿Olvidaste tu Contraseña?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
                <CustomButton
                    text="Iniciar Sesión"
                    onPress={onSignInPressed}
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