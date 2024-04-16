import { React, useContext, useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { AuthContext } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin'


const CustomDrawer = (props) => {
    const { logout, userInfo, userImage, updateUserImage } = useContext(AuthContext);
    //console.log('primero:', userInfo)

    const logoutGoogle = () => {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    }


    const [actualCustomImage, setActualCustomImage] = useState({
        Url_imagen: userInfo.Url_imagen,
    });
    //console.log('segundo:' + actualCustomImage.Url_imagen)
    //Ver informacion de la imagen que llega
    //console.log("Imagen actual " + actualCustomImage.Url_imagen);
    //console.log("Imagen actual userImage " + userImage);

    useEffect(() => {
        if (actualCustomImage.Url_imagen === "default") {
            actualCustomImage.Url_imagen = 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/ProfileImages%2Fuser_default.png?alt=media&token=d6b24730-d87d-4be5-9275-df4a44f5c323';
            updateUserImage(actualCustomImage.Url_imagen); // Llama a la función para actualizar userImage en el contexto
        }

        // Actualiza la imagen cuando cambie userImage
        setActualCustomImage({ Url_imagen: userImage });
    }, [userImage]);



    const nombre = userInfo.Nombres.split(" ")[0];

    let rolText = "";

    switch (userInfo.idRol) {
        case 1:
            rolText = "Usuario";
            break;
        case 2:
            rolText = "Cuidador";
            break;
        case 3:
            rolText = "Administrador";
            break;
        case 4:
            rolText = "Super Administrador";
            break;
        default:
            rolText = "Usuario";
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8c182b' }}>
                <ImageBackground
                    source={require('../../assets/menu-bg.jpeg')}
                    style={{ padding: 20 }}>
                    <Image
                        source={{ uri: actualCustomImage.Url_imagen }}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 10,
                            marginBottom: 5,
                        }}>
                        {nombre} {userInfo.Primer_Apellido}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: '#fff',
                                marginRight: 5,
                            }}>
                            {rolText}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>

                    <DrawerItemList {...props} />

                </View>

            </DrawerContentScrollView>

            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity
                    onPress={() => {
                        logout();
                        logoutGoogle();
                    }}
                    style={{ paddingVertical: 15 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={{
                            fontSize: 15,
                            marginLeft: 5,
                        }}>
                            Cerrar Sesión
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer