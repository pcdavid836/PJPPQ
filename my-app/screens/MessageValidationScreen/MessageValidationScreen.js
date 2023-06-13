import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const MessageValidationScreen = () => {

  const navigation = useNavigation();
  const onSignInPressed = () => {
    navigation.navigate('UserSignIn');
  };


  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirmar tu correo</Text>
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

export default MessageValidationScreen;