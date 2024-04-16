import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, ToastAndroid, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import PhoneInput from "react-native-phone-number-input";
import CryptoES from 'crypto-es';
import { sendVerificationSMS, getUserExistenceByEmail } from '../../api';

const UserRegisterExternal = ({ route }) => {

    const { userLogged } = route.params;
    const hash = CryptoES.SHA256(userLogged.email); //TENER EN CUENTA QUE LA CONTRASEñA NO SE USA EN ESTE CASO


    console.log(userLogged);

    const [country, setCountry] = useState('');
    const phoneInput = React.useRef(null);
    const [countryCode, setCountryCode] = useState('');


    const local_data = [
        {
            value: 'CB',
            lable: 'CB',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'LP',
            lable: 'LP',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'SC',
            lable: 'SC',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'TJ',
            lable: 'TJ',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'CH',
            lable: 'CH',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'OR',
            lable: 'OR',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'PT',
            lable: 'PT',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'PA',
            lable: 'PA',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'BN',
            lable: 'BN',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'CIE',
            lable: 'CIE',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
    ];

    const navigation = useNavigation();
    const [user, setUser] = useState({
        Correo: userLogged.email,
        Nombres: userLogged.name,
        Primer_Apellido: userLogged.familyName,
        Segundo_Apellido: '',
        Celular: '',
        CI: '',
        Contrasena: hash.toString(), //INGRESAR ALGUN DATO ENCRIPTADO
        Url_imagen: userLogged.photo,
        Correo_Externo: 1,
    });

    const [phoneNumber, setPhoneNumber] = useState('');
    const [originalCI, setOriginalCI] = useState('');
    const [userPhone, setUserPhone] = useState({
        phoneNumber: '',
    });

    const handleChange = (name, value) => {
        setUser({ ...user, [name]: value });
        if (name === 'CI') {
            setOriginalCI(value);
        }
    };

    const onTermsOfUsePressed = () => {
        console.log('DOCUMENTO');
        console.log(user.Celular);
    };

    const onHandleSubmit = async () => {
        const callingCode = phoneInput.current.getCallingCode();
        let fullNumber = '+' + callingCode + phoneNumber; // Añade el código de país sólo cuando vayas a utilizar el número de teléfono completo

        if (!country) {
            Alert.alert('Error', 'Por favor, selecciona el código de tu CI');
            return;
        }
        console.log(fullNumber);
        if (fullNumber.length > 15) {
            Alert.alert('Error', 'El número de celular no debe tener más de 15 caracteres');
            return;
        }

        const completePhoneNumber = fullNumber;   // Almacena el número de teléfono completo en una nueva variable

        // Actualiza user.Celular con el número de teléfono completo
        user.Celular = completePhoneNumber;

        user.CI = originalCI;  // Restablece user.CI a su valor original

        user.CI = originalCI + country;  // Ahora añade country

        //console.log(user.CI);
        const { Correo, Nombres, Primer_Apellido, Segundo_Apellido, Celular, CI, Contrasena } = user;
        if (!Correo || !Nombres || !Primer_Apellido || !Segundo_Apellido || !Celular || !CI || !Contrasena) {
            Alert.alert('Por favor', 'Llena todos los datos');
            return;
        }

        // Verificar si se ingresó un número de teléfono
        if (Celular === '+' + callingCode) {
            Alert.alert('Error', 'Por favor, introduce un número de teléfono');
            return;
        }


        // Comprobar la existencia del correo electrónico
        const emailExistence = await getUserExistenceByEmail({
            Correo: userLogged.email,
            Celular: user.Celular
        });

        if (emailExistence.mensaje === "El correo electrónico o numero de celular ya está en uso") {
            Alert.alert('Error', 'El correo electrónico o numero de celular ya está en uso');
            return;
        }

        else {
            //console.log(user);

            //console.log(hash.toString());

            //saveUser(user)/*
            userPhone.phoneNumber = completePhoneNumber; // Usa la nueva variable aquí
            const verificationCode = await sendVerificationSMS(userPhone);
            navigation.navigate('VerificationCodeScreen', { user: user, verificationCode: verificationCode });
        }
    };





    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Datos Adicionales</Text>
                <TextInput
                    placeholder="Nombre o Nombres"
                    onChangeText={(text) => handleChange('Nombres', text)}
                    defaultValue={userLogged.name}
                    style={styles.container}
                    maxLength={45}
                />
                <TextInput
                    placeholder="Apellido"
                    onChangeText={(text) => handleChange('Primer_Apellido', text)}
                    defaultValue={userLogged.familyName}
                    style={styles.container}
                    maxLength={45}
                />
                <TextInput
                    placeholder="Segundo Apellido"
                    onChangeText={(text) => handleChange('Segundo_Apellido', text)}
                    style={styles.container}
                    maxLength={45}
                />
                <TextInput
                    placeholder="Correo Electronico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={userLogged.email}
                    style={styles.container}
                    maxLength={45}
                />
                <View style={styles.smallPcontainer}>
                    <PhoneInput
                        ref={phoneInput}
                        placeholder="Celular"
                        defaultCode='BO'
                        onChangeText={(text) => {
                            if (text.length <= 12) {
                                setPhoneNumber(text);
                            }
                        }}
                        onChangeCountry={(country) => setCountryCode(country.callingCode)}
                    />
                </View>
                <View style={[styles.row, { alignItems: 'center' }]}>
                    <TextInput
                        placeholder="CI"
                        keyboardType="numeric"
                        onChangeText={(text) => handleChange('CI', text)}
                        style={[styles.container, styles.input80]}
                        maxLength={12}
                    />
                    <SelectCountry
                        style={[styles.dropdown, styles.input20]}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        value={country}
                        data={local_data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="CI"
                        searchPlaceholder="Search..."
                        onChange={e => {
                            setCountry(e.value);
                        }}
                    />
                </View>
                <View style={{ paddingTop: 20, width: '100%' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onHandleSubmit}
                    >
                        <Text style={styles.buttonText}>Terminar registro</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>
                    Al momento de registrarte estas confirmando aceptar los
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terminos y condiciones de nuestra Politica de Privacidad.</Text>
                </Text>


            </View>
        </ScrollView>
    )
}


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
    container: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        height: 50,
        width: '100%',
    },
    smallPcontainer: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: -15,
        marginVertical: 5,
        height: 60,
        width: '100%',
        paddingLeft: -20,
    },
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
        width: '90%',
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input80: {
        width: '60%',
    },
    input20: {
        width: '40%',
    },
    button: {
        backgroundColor: '#007bff',
        width: '100%',
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

export default UserRegisterExternal