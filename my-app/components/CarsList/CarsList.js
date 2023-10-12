import React from 'react'
import { View, Text, FlatList } from 'react-native'
import CarsItem from '../CarsItem/CarsItem';

const CarsList = ({ cars, onModifyComplete, onDeleteComplete }) => {
  const renderItem = ({ item }) => {
    return <CarsItem cars={item} onModifyComplete={onModifyComplete} onDeleteComplete={onDeleteComplete} />
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={cars}
      keyExtractor={(item) => item.idVehiculo + ''}
      renderItem={renderItem}

    />
  );
};

export default CarsList