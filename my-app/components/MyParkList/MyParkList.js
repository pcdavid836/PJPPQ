import React from 'react'
import { View, Text, FlatList } from 'react-native'
import MyParkItem from '../MyParkItem/MyParkItem';

const MyParkList = ({ mypark, onModifyComplete, onDeleteComplete }) => {
    const renderItem = ({ item }) => {
        return <MyParkItem mypark={item} onModifyComplete={onModifyComplete} onDeleteComplete={onDeleteComplete} />
      };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={mypark}
      keyExtractor={(item) => item.idParqueo + ''}
      renderItem={renderItem}
    />
  )
}

export default MyParkList