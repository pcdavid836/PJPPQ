import React from 'react'
import { View, Text, FlatList } from 'react-native'
import ParkedVehicleItem from '../ParkedVehicleItem';

const ParkedVehicleList = ({ vehicles, onDeleteComplete }) => {
    const renderItem = ({ item }) => {
        return <ParkedVehicleItem vehicles={item} onDeleteComplete={onDeleteComplete} />
    };

    return (
        <FlatList
            style={{ width: '100%' }}
            data={vehicles}
            keyExtractor={(item) => item.idParqueo_Vehiculo + ''}
            renderItem={renderItem}
        />
    );
};

export default ParkedVehicleList