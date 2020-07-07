import React from 'react'
import { Platform, View, StyleSheet } from "react-native";

import Text from '../tools/Text'
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/colors'

const IconButton = ({ ios, android, size, color, onPress, style, label }) => {
  return (
    <View style={styles.container}>
      <Ionicons 
        name={Platform.OS === 'ios' ? ios : android}
        color={color}
        size={size}
        style={style}
        />
      {label &&
        <Text style={styles.text}>{label}</Text>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    margin: 2,
    fontSize: 13,
    color: 'white',
    textShadowColor: Colors.BLACK,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    fontFamily: 'MontserratRegular'
  }
});

export default IconButton