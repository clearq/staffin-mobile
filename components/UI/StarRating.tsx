import Colors from '@/constants/Colors';
import React, {useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Read only
const StarRatingReadOnly = ({ rating }: { rating: number }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 5 }, (_, index) => (
        <MaterialCommunityIcons
          key={index}
          name={index < rating ? 'star' : 'star-outline'}
          size={24}
          color={index < rating ? Colors.secondary : Colors.textGray}
        />
      ))}
    </View>
  );
};



// Editable

// Add New Rating

export  { StarRatingReadOnly, };