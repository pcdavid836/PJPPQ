import React from 'react'
import { View, Text, FlatList } from 'react-native'
import SidekickItem from '../SidekickItem';

const SidekickList = ({ sidekick, onDeleteComplete }) => {
  const renderItem = ({ item }) => {
    return <SidekickItem sidekick={item} onDeleteComplete={onDeleteComplete}/>
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={sidekick}
      keyExtractor={(item) => item.usuario_idUsuario + ''}
      renderItem={renderItem}
    />
  );
};


export default SidekickList