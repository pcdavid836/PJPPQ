import React, { useState } from 'react';
import { RefreshControl, FlatList } from 'react-native';
import { getCars } from '../../api';
import CarsItem from '../CarsItem/CarsItem';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CarsList = ({ cars, onModifyComplete, onDeleteComplete, idUser }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Aquí puedes llamar a la función que recarga los datos
    // Por ejemplo: loadCars();
    getCars(idUser).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => {
    return <CarsItem cars={item} onModifyComplete={onModifyComplete} onDeleteComplete={onDeleteComplete} />
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={cars}
      keyExtractor={(item) => item.idVehiculo + ''}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default CarsList;
