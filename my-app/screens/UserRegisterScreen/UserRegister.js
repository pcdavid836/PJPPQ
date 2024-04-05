import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, ToastAndroid, TextInput, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { sendVerificationSMS, getUserExistenceByEmail } from '../../api';
import CryptoES from 'crypto-es';
import { SelectCountry } from 'react-native-element-dropdown';
import PhoneInput from "react-native-phone-number-input";


const UserRegister = () => {

    const [country, setCountry] = useState('CB');
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
        Correo: '',
        Nombres: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Celular: '',
        CI: '',
        Contrasena: '',
        Url_imagen: 'default',
    });

    const [userPhone, setUserPhone] = useState({
        phoneNumber: '',
    });


    const handleChange = (name, value) => setUser({ ...user, [name]: value });

    const onTermsOfUsePressed = () => {
        console.log('DOCUMENTO');
        console.log(user.Celular);
    };


    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = (password) => {
        // Debe tener al menos 6 caracteres
        return password.length >= 6;
    }


    const onHandleSubmit = async () => {
        let fullNumber = '';
        const callingCode = phoneInput.current.getCallingCode();
        fullNumber = '+' + callingCode + user.Celular;
        if (fullNumber.length > 15) {
            Alert.alert('Error', 'El número de celular no debe tener más de 15 caracteres');
            return;
        }
        const completePhoneNumber = fullNumber; // Almacena el número de teléfono completo en una nueva variable
        const { Correo, Nombres, Primer_Apellido, Segundo_Apellido, Celular, CI, Contrasena } = user;
        if (!Correo || !Nombres || !Primer_Apellido || !Segundo_Apellido || !Celular || !CI || !Contrasena) {
            Alert.alert('Por favor', 'Llena todos los datos');
            return;
        }

        if (!validateEmail(Correo)) {
            Alert.alert('Error', 'Por favor, introduce un correo electrónico válido');
            return;
        }

        if (!validatePassword(Contrasena)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra mayúscula, un número o símbolo');
            return;
        }

        // Verificar si se ingresó un número de teléfono
        if (Celular === '+' + callingCode) {
            Alert.alert('Error', 'Por favor, introduce un número de teléfono');
            return;
        }

        // Comprobar la existencia del correo electrónico
        const emailExistence = await getUserExistenceByEmail({ 
            Correo: Correo.toLowerCase(), 
            Celular: user.Celular 
        });
        
        if (emailExistence.mensaje === "El correo electrónico o numero de celular ya está en uso") {
            Alert.alert('Error', 'El correo electrónico o numero de celular ya está en uso');
            return;
        }

        const password = user.Contrasena;
        const password2 = user.Contrasena2;
        if (password !== password2) {
            ToastAndroid.show('Las Contraseñas no coinciden!', ToastAndroid.SHORT);
            return;
        }
        else {
            console.log(user);
            const hash = CryptoES.SHA256(password);

            user.Contrasena = hash.toString();
            user.CI = user.CI + country;

            //console.log(hash.toString());

            //saveUser(user)
            userPhone.phoneNumber = completePhoneNumber; // Usa la nueva variable aquí
            const verificationCode = await sendVerificationSMS(userPhone);
            navigation.navigate('VerificationCodeScreen', { user: user, verificationCode: verificationCode });
        }
    };



    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Crear una Cuenta</Text>
                <TextInput
                    placeholder="Nombre o Nombres"
                    onChangeText={(text) => handleChange('Nombres', text)}
                    style={styles.container}
                    maxLength={45}
                />
                <TextInput
                    placeholder="Apellido"
                    onChangeText={(text) => handleChange('Primer_Apellido', text)}
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
                    onChangeText={(text) => handleChange('Correo', text)}
                    style={styles.container}
                    maxLength={45}
                />
                <View style={styles.smallPcontainer}>
                    <PhoneInput
                        ref={phoneInput}
                        placeholder="Celular"
                        defaultCode='BO'
                        onChangeText={(text) => {
                            if (text.length <= 11) {
                                handleChange('Celular', text);
                            }
                        }}
                        onChangeCountry={(country) => setCountryCode(country.callingCode)}
                        maxLength={12}
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
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={(text) => handleChange('Contrasena', text)}
                    style={styles.container}
                    maxLength={45}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Repite la Contraseña"
                    secureTextEntry
                    onChangeText={(text) => handleChange('Contrasena2', text)}
                    style={styles.container}
                    maxLength={45}
                    autoCapitalize="none"
                />
                <View style={{ paddingTop: 20, width: '100%' }}>
                    <CustomButton
                        text="Registrarse"
                        onPress={onHandleSubmit}
                    />
                </View>
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
});

export default UserRegister;