import { React, useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ToastAndroid, TextInput, Button, Alert } from 'react-native';
import Logo from '../../assets/images/logoEX.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getUserMail, getExternalMail, updateExternalReturn } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import CryptoES from 'crypto-es';

const UserSignIn = () => {
    const { login, updateUserImage } = useContext(AuthContext);
    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();
    const [logser, setLogser] = useState({
        Correo: '',
        Contrasena: '',
    });

    const handleChange = (name, value) => setLogser({ ...logser, [name]: value });

    const [logserExt, setLogserExt] = useState({
        Correo: '',
    });

    const handleChangeExt = (name, value) => setLogserExt({ ...logserExt, [name]: value });


    //Llamado de usuarios (prueba)
    /*
    const loadUsers = async () => {
        const res = await fetch('http://192.168.1.6:3000/user')
        const data = await res.json()
        console.log(data);
    };
    */

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "121681989018-4gtrk5pnmmokcrlnkkdglhd839c5mil8.apps.googleusercontent.com",
        });
    }, []);

    /* EJEMPLO PARA COMPROBAR SI EL PROYECTO ESTA CONECTADO A FIREBASE DE GOOGLE Y QUE DATOS PUEDEN MANIPULARSE
    async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken, user } = await GoogleSignin.signIn();

            console.log('Nombre: ' + user.givenName);
            console.log('Apellidos: ' + user.familyName);
            console.log('Email: ' + user.email);
            //console.log('Número de teléfono: ' + user.phoneNumber); GOOGLE YA NO DA NUMEROS DE CELULAR
            Alert.alert('Success test');

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            Alert.alert('Inicio de Sesion, Hubo algun problema al iniciar sesion.');
            console.log(error)
        }

    }
    */
    const signin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const dataown = await GoogleSignin.signIn();
            setUserInfo(dataown);

            logserExt.Correo = dataown.user.email;

            const dataAnswer = await getExternalMail(logserExt);
            console.log(dataAnswer);

            // Verifica si dataAnswer es nulo, un objeto vacío, o contiene el mensaje "Credenciales incorrectas"
            if (!dataAnswer || Object.keys(dataAnswer).length === 0 || dataAnswer.mensaje === "No se encontró ningún usuario con ese correo electrónico") {
                navigation.navigate('UserRegisterExternalScreen', { userLogged: dataown.user });
                logout();
            }
            else {
                if (dataAnswer.Ban === 0) {
                    if (dataAnswer.Estado === 0) {
                        updateExternalReturn(dataAnswer.idUsuario);
                        Alert.alert('Se recupero tu cuenta con exito! intenta iniciar denuevo la sesion.');
                        logout();
                    } else {
                        login(dataAnswer);
                        updateUserImage(dataAnswer.Url_imagen);
                        navigation.navigate('HomeScreen');
                    }
                }
                else {
                    Alert.alert('Error, Su cuenta ha sido baneada permanentemente del servicio!');
                    return;
                }
            }

            setError();
        } catch (e) {
            setError(e);
            Alert.alert('Inicio de Sesion, Hubo algun problema al iniciar sesion.');
        }
    };


    const logout = () => {
        setUserInfo();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    }

    const { height } = useWindowDimensions();

    const navigation = useNavigation();

    const onSignInPressed = async () => {
        //console.log("actual");
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

        if (user.Correo_Externo === 1) {
            ToastAndroid.show('Esa cuenta ya esta registrada desde un correo electronico!', ToastAndroid.SHORT);
            return;
        }

        //console.log(user);
        const email = user.Correo;
        const mainpassword = user.Contrasena;
        //const mainId = user.idUsuario;

        /* Mostrar Contrasena y Email
        console.log(email);
        console.log(mainpassword);
        */

        //console.log(mainpassword); ver Contrasena despues del proceso


        //SE OBTIENE MEDIANTE getUserMail LOS DATOS DE UN USUARIO Y SE COMPRUEBA SI EL PASSWORD Y EL CORREO CONCUERDAN PARA LUEGO CREAR UN TOKEN
        if (email === correo && mainpassword === hashString) {
            // Navigate to the HomeScreen
            login(user);
            updateUserImage(user.Url_imagen);
            navigation.navigate('HomeScreen');
            console.log(mainpassword);


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
                {/*<Button title="Logout" onPress={logout} />*/}

                {/*
                <Button
                    title="Google Sign-In"
                    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                />
                */
                }
                {
                    <View style={styles.container}>
                        <GoogleSigninButton
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={signin}
                            style={{ width: '100%', height: 50 }} // Ajusta el tamaño aquí
                        />
                    </View>

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