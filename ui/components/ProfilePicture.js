import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import Colors from '../../constants/colors'

const ProfilePicture = ({picture}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.profile} source={require('../../resources/profile.jpeg')} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile: {
        height: 30,
        width: 30,
        borderRadius: 24,
        borderColor: Colors.GREY,
        borderWidth: 2,
        margin: 10
      },
})
export default ProfilePicture