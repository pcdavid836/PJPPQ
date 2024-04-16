import React from 'react'
import { View, Text, FlatList } from 'react-native'
import MutedUserItem from '../MutedUserItem';

const MutedUserList = ({ users, onDeleteComplete }) => {
  const renderItem = ({ item }) => {
    return <MutedUserItem users={item} onDeleteComplete={onDeleteComplete}/>
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={users}
      keyExtractor={(item) => item.usuario_idUsuario + ''}
      renderItem={renderItem}
    />
  );
};


export default MutedUserList