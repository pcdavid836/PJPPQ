import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from '../CustomButton'

const SocialSignInButtons = () => {
    const onSignInGoogle = () => {
        console.warn('OnSignInGoogle');
    };


  return (
    <>
      <CustomButton 
            text="Iniciar sesión con Google" 
            onPress={onSignInGoogle}
            bgColor="#FAE9EA" 
            fgColor="#DD4D44"
        />
    </>
  )
}

export default SocialSignInButtons