import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import BookingItem from '../BookingItem';

const BookingList = ({ book, onDeleteComplete, onModifyComplete }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onDeleteComplete().then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => {
    return <BookingItem book={item} onDeleteComplete={onModifyComplete} onModifyComplete={onModifyComplete}/>
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={book}
      keyExtractor={(item) => item.idReserva + ''}
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

export default BookingList;

/* Vieja sintaxis

import React from 'react'
import { View, Text, FlatList } from 'react-native'
import BookingItem from '../BookingItem';

const BookingList = ({ book, onDeleteComplete, onModifyComplete }) => {
  const renderItem = ({ item }) => {
    return <BookingItem book={item} onDeleteComplete={onDeleteComplete} onModifyComplete={onModifyComplete}/>
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={book}
      keyExtractor={(item) => item.idReserva + ''}
      renderItem={renderItem}
    />
  );
};


export default BookingList

*/