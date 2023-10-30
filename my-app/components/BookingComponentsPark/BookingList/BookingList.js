import React from 'react'
import { View, Text, FlatList } from 'react-native'
import BookingItem from '../BookingItem';

const BookingList = ({ book, onDeleteComplete }) => {
  const renderItem = ({ item }) => {
    return <BookingItem book={item} onDeleteComplete={onDeleteComplete}/>
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