import { React, useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ToastAndroid, TextInput, Button } from 'react-native';
import Logo from '../../assets/images/logoEX.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getUserMail } from '../../api';
import { AuthContext } from '../../context/AuthContext';
//import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import CryptoES from 'crypto-es';

const UserSignIn = () => {
    const { login, updateUserImage } = useContext(AuthContext);
    const [error, setError] = useState();
    const [userInfo, setUsrInfo] = useState();

    /*
    const configureGoogleSignIn = () => {
        

        GoogleSignIn.configure({
            webClientId: "121681989018-befic7f8r6cd1ahrjq2oilngsi3n6uu4.apps.googleusercontent.com",
            androidClientId: "121681989018-befic7f8r6cd1ahrjq2oilngsi3n6uu4.apps.googleusercontent.com",
            iosClientId: "",
        });
    };
    */
    //Llamado de usuarios (prueba)
    /*
    const loadUsers = async () => {
        const res = await fetch('http://192.168.1.6:3000/user')
        const data = await res.json()
        console.log(data);
    };
    */

    useEffect(() => {
      /*  GoogleSignin.configure({
            webClientId:
                "121681989018-1jam5ikei19nur9knshk2n599pehkmh5.apps.googleusercontent.com",
        });*/
    }, []);
/*
    const signin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            setUsrInfo(user);
            setError();
        } catch (e) {
            setError(e);
        }
    };

    const logout = () => {
        setUserInfo();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    }

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
        navigation.navigate('ForgotPasswordScreen');
    };

    const onSignInGoogle = () => {
        console.log(logser);
    };

    const onSignInFacebook = () => {
        navigation.navigate('VerificationCodeScreen');
    };

    const onSignUpPress = () => {
        navigation.navigate('UserRegister');
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Bienvenido!</Text>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode='contain'
                />
                <View style={styles.container}>
                    <TextInput
                        value={logser.Correo}
                        onChangeText={(text) => handleChange('Correo', text)}
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                        style={styles.input}
                        maxLength={45}
                        autoCapitalize="none"
                    />
                    <TextInput
                        value={logser.Contrasena}
                        onChangeText={(text) => handleChange('Contrasena', text)}
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry
                        maxLength={45}
                        autoCapitalize="none"
                    />
                </View>
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
                    text="¿No tienes una cuenta? Registrate"
                    onPress={onSignUpPress}
                    type="TERTIARY"
                />
                {/*
                    <View style={styles.container}>
                        <Text>{JSON.stringify(error)}</Text>
                        {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
                        {userInfo ? (
                            <Button title="Logout" onPress={logout} />
                        ) : (
                            <GoogleSigninButton
                                size={GoogleSigninButton.Size.Standard}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={signin}
                            />
                        )}
                    </View>*/
                }
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    container: {
        width: '100%',
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textInput: {
        height: 50, // Ajusta la altura de los TextInput
    },
});

export default UserSignIn;