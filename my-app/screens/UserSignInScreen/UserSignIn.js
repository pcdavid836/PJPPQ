import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../assets/images/adaptive-icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSignIn = () => {
    const [logser, setLogser] = useState({
        correo: '',
        contraseña: '',
    });

    const { height } = useWindowDimensions();

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('HomeScreen');
    };

    const onForgotPasswordPressed = () => {
        console.warn('OnForgotPasswordPressed');
    };

    const onSignInGoogle = () => {
        console.warn('OnSignInGoogle');
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
                    setValue={(text) => handleChange('correo', text)}
                />
                <CustomInput
                    placeholder="Contraseña"
                    setValue={(text) => handleChange('contraseña', text)}
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