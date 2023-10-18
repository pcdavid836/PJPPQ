import React from 'react'
import { FlatList } from 'react-native'
import PlacesItem from '../PlacesItem'

const PlacesList = ({ parks }) => {
  const renderItem = ({ item }) => {
    //console.log('Render item:', item);
    return <PlacesItem parks={item} />
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={parks}
      keyExtractor={(item) => item.idParqueo + ''}
      renderItem={renderItem}
    />
  )
}

export default PlacesList;
