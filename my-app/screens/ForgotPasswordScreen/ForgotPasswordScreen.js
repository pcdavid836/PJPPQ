import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const ForgotPasswordScreen = () => {
const [email, setEmail] = useState('');

const onConfirmPressed = () => {
    console.warn('ConfirmPressed');
};
const onSignInPressed = () => {
    console.warn('Backtosignin');
};
const onResendPressed = () => {
    console.warn('ResendPressed');
};


  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <CustomInput 
            placeholder="Tu Email"
            value={email}
            setValue={setEmail}
        />
        <CustomButton 
            text="Confirmar" 
            onPress={onConfirmPressed} 
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

export default ForgotPasswordScreen;