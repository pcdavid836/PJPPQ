import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const ConfirmEmailScreen = () => {
const [code, setCode] = useState('');
const [email, setEmail] = useState('');

const onConfirmPressed = () => {
    console.warn('ConfirmPressed');
};
const onSignInPressed = () => {
    console.warn('Back to sign in');
};
const onResendPressed = () => {
    console.warn('ResendPressed');
};


  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.title}>Confirmar tu correo</Text>
        <CustomInput 
            placeholder="Codigo de Verificación"
            value={code}
            setValue={setCode}
        />
        <Text style={styles.text}>
            Falta un paso mas ahora estas registrado pero para poder acceder nesesitaras ver tu correo electronico.
        </Text>
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

export default ConfirmEmailScreen;