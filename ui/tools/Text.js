import React from 'react'
import { Text, StyleSheet } from 'react-native'


const TextView = props => {
    return (
        <Text {...props} style={{ ...styles.text, ...props.style }} >{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily:'MontserratRegular'
    }
})


export default TextView