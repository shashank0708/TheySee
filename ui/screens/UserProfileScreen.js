import React, { useState } from 'react'
import { View, Image, StyleSheet, ImageBackground, FlatList, Dimensions } from 'react-native'
import Colors from '../../constants/colors'
import Text from '../tools/Text'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import { userVideos } from '../../resources/data'

const { width, height } = Dimensions.get('screen')

const UserProfileScreen = ({ navigation, route }) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const [buttonColor, setButtonColor] = useState('transparent')

    const picture = route.params.profilePicture
    const name = route.params.headerTitle

    navigation.setOptions({ title: '' })


    const followHandler = () => {
        setIsFollowing(!isFollowing)
        setButtonColor(isFollowing ? 'transparent' : Colors.ACCENT)
    }

    const renderVideoItem = (itemData) => {
        const video = itemData.item
        return (
            <View style={styles.gridItem}>
                <ImageBackground source={{ uri: video.image }} style={styles.gridImage} >
                    <Text>{video.views}</Text>
                </ImageBackground>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <ImageBackground source={{ uri: picture }} style={styles.profileBackground} blurRadius={5} >
                    <View style={styles.profilePictureContainer}>
                        <Image source={{ uri: picture }} style={styles.profilePicture} />
                    </View>
                    <Text style={styles.title}>Shashank Mishra</Text>
                    <Text style={styles.text}>{name}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback style={{ ...styles.button, backgroundColor: buttonColor }} onPress={followHandler}>
                            <Text style={styles.buttonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
                        </TouchableNativeFeedback>
                    </View>
                    
                    <View style={{ flex: 1 }} />
                    <View style={styles.infoContainer}>

                        <View style={styles.infoItem}>
                            <Text style={{ color: 'white' }}>Posts</Text>
                            <Text style={{ color: 'white' }}>79</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={{ color: 'white' }}>Followers</Text>
                            <Text style={{ color: 'white' }}>10.2k</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={{ color: 'white' }}>Following</Text>
                            <Text style={{ color: 'white' }}>1k</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <FlatList renderItem={renderVideoItem} data={userVideos} numColumns={2} />
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        width: width / 2,
        height: height / 3,
        margin:4
    },
    gridImage: {
        flex: 1,
        padding:10
    },
    buttonContainer: {
        borderColor: Colors.GREY,
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 10
    },
    button: {
        width: 120,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.GREY
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#00000090'
    },
    infoItem: {
        alignItems: 'center',
        margin: 10,
    },
    title: {
        color: Colors.WHITE,
        fontSize: 20,
        marginTop: 10
    },
    text: {
        color: Colors.GREY,
        fontSize: 15
    },
    profileContainer: {
        height: 400,
        width: '100%',
    },
    profileBackground: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    profilePictureContainer: {
        height: 150,
        width: 150,
        marginTop: 80,
        elevation: 10,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: Colors.GREY,
        borderWidth: 2
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    profilePicture: {
        width: '100%',
        height: '100%'
    }
})

export default UserProfileScreen