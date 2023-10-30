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