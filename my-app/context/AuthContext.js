import {React, createContext, useState, useEffect} from "react";
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    //const [test, setTest] = useState('Test Value');

    const key = 'q8&1}Q2!P){3OY7d{F)=H26C3*<Hvcv#';
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userImage, setUserImage] = useState(null);

    //Inicio de Sesion

    const login = (user) => {
        setIsLoading(true);
        const jwtoken = JWT.encode({userID: user.idUsuario,email: user.Correo, password: user.Contraseña}, key, { algorithm: 'HS256' });
        //ver token: console.log(jwtoken);
        setUserToken(jwtoken);
        setUserInfo(user);
        AsyncStorage.setItem('userInfo', JSON.stringify(user));
        AsyncStorage.setItem('userToken', jwtoken);
        setIsLoading(false);

        /* Para llamar Variables usar user con datos que son contenidos en la base de datos:
        //console.log('Datos: ' + user.Correo);
        //console.log('Datos: ' + user.idUsuario);
        */
    }


    // Cerrar Sesion

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if( userInfo ) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);   
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    const updateUserImage = (newImageURI) => {
        setUserImage(newImageURI);
      };

    useEffect(() => {
        isLoggedIn();
    },[]);

    return (
        <AuthContext.Provider value={{login, logout, updateUserImage, isLoading, userToken, userInfo, userImage}}>
            {children}
        </AuthContext.Provider>
    ); 
}