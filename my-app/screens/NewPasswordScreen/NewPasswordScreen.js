import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const NewPasswordScreen = () => {
const [code, setCode] = useState('');
const [newPassword, setNewPassword] = useState('');

const onNewConfirm = () => {
    console.warn('ConfirmPressed');
};
const onSignInPressed = () => {
    console.warn('Backtosignin');
};


  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.title}>Reiniciar Contraseña</Text>
        <CustomInput 
            placeholder="Codigo"
            value={code}
            setValue={setCode}
        />
        <CustomInput 
            placeholder="Ingresa tu nueva contraña"
            value={newPassword}
            setValue={setNewPassword}
            secureTextEntry
        />
        <CustomButton 
            text="Enviar" 
            onPress={onNewConfirm} 
        />
        <CustomButton 
            text="Volver a inicio de sesión" 
            onPress={onSignInPressed} 
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

export default NewPasswordScreen;