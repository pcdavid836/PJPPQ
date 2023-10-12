import React, { useState, useContext, useEffect } from 'react';
import { Image, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const ImageWithUpdate = ({ onUpdateImage }) => {
  const { userInfo } = useContext(AuthContext);
  const [image, setImage] = useState("");

  const [actualImage, setActualImage] = useState({
    Url_imagen: userInfo.Url_imagen,
  });

  if (actualImage.Url_imagen === "default") {
    actualImage.Url_imagen = 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/ProfileImages%2Fuser_default.png?alt=media&token=d6b24730-d87d-4be5-9275-df4a44f5c323';
  }


  const changeImageURI = (newImageURI) => {
    setImage(newImageURI);
    
  };

  changeImageURI(actualImage.Url_imagen);
  console.log(image);

  return (

      <Image source={{ uri: image }} />

  );
};

export default ImageWithUpdate;