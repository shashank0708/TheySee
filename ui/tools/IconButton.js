import React from 'react'
import { Platform, View, StyleSheet, Text } from "react-native";

import HeaderButton from '../tools/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/colors'

const IconButton = ({ ios, android, size, color, onPress, style, label }) => {
    return (
        <View style={styles.container}>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Buy"
                    color={color}
                    iconSize={size}
                    iconName={Platform.OS === 'ios' ? ios : android}
                    onPress={onPress}
                    style={style} />
            </HeaderButtons>
            {label &&
                <Text style={styles.text}>{label}</Text>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent:'center'
    },
    text: {
      margin: 2,
      fontSize: 13,
      color: 'white',
      textShadowColor: Colors.GREY,
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1,
      fontFamily:'MontserratRegular'
    }
  });

export default IconButton