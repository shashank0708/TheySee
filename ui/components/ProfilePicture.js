import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import Colors from '../../constants/colors'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const ProfilePicture = ({ picture, onPress, style }) => {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
            <Image style={{...styles.profile, ...style}} source={{ uri: picture }} />
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile: {
        borderColor: Colors.GREY,
        borderWidth: 2,
        margin: 10
    },
})
export default ProfilePicture