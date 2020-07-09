import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'

import Text from '../tools/Text'
import Colors from '../../constants/colors'
import IconButton from "../tools/IconButton";

const height = Dimensions.get('screen').height
const statusHeight = StatusBar.currentHeight

const CameraScreen = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermisson] = useState(null)

    const [type, setType] = useState(Camera.Constants.Type.front);

    const [camera, setCamera] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const saveData = async (uri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        console.log(status)
        if (status === 'granted') {
            const asset = await MediaLibrary.createAssetAsync(uri)
            MediaLibrary.createAlbumAsync('TheySee', asset)
                .then(() => {
                    console.log('Asset Created')
                }).catch((ex) => {
                    console.log('Error : ' + ex)
                })

        } else {
            console.log('Permission denied')
        }
    }

    const snapPicture = async () => {
        if (camera) {
            let photo = await camera.takePictureAsync()
            saveData(photo.uri)
        }
    }

    const recordVideo = async () => {
        if (camera) {
            const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
            if (status === 'granted') {
                const result = await camera.recordAsync({ quality: 1, maxDuration: 5, mute: true, mirror: true })
                console.log('Recording ended')
                saveData(result.uri)
            }
        }
    }

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type} ratio={'16:9'} useCamera2Api >
            </Camera>
            <View style={styles.toolContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.title}>Black by James ft Roman Gray</Text>
                        <View style={styles.info}>
                            <IconButton ios={'ios-speedometer'} android={'md-speedometer'} color={Colors.GREY} size={21} />
                            <Text style={styles.infoText}>1x</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View>
                        <IconButton
                            ios={'ios-image'}
                            android={'md-flash'}
                            size={25}
                            color={Colors.GREY}
                            style={styles.icon}
                            label={'Flash'} />
                        <IconButton
                            ios={'ios-timer'}
                            android={'md-timer'}
                            size={25}
                            color={Colors.GREY}
                            style={styles.icon}
                            label={'Timer'} />
                        <IconButton
                            ios={'ios-speedometer'}
                            android={'md-speedometer'}
                            size={25}
                            color={Colors.GREY}
                            style={styles.icon}
                            label={'Speed'} />
                    </View>
                </View>
                <View style={{ flex: 1 }} />

                <View style={styles.bottomContainer}>
                    <IconButton
                        ios={'ios-image'}
                        android={'md-image'}
                        size={25}
                        color={Colors.GREY}
                        style={styles.icon}
                        label={'Gallery'} />

                    <IconButton
                        ios={'ios-musical-notes'}
                        android={'md-musical-notes'}
                        size={25}
                        color={Colors.GREY}
                        style={styles.icon}
                        label={'Audio'} />

                    <IconButton
                        ios={'ios-aperture'}
                        android={'md-aperture'}
                        size={70}
                        color={Colors.GREY}

                        onPress={recordVideo} />

                    <IconButton
                        ios={'ios-color-filter'}
                        android={'md-color-filter'}
                        size={25}
                        color={Colors.GREY}
                        style={styles.icon}
                        label={'Filter'} />

                    <IconButton
                        ios={'ios-reverse-camera'}
                        android={'md-reverse-camera'}
                        size={25}
                        color={Colors.GREY}
                        style={styles.icon}
                        label={'Flip'} />


                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.GREY,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    icon: {
        textShadowRadius: 5,
        textShadowOffset: {
            width: 0,
            height: 1
        },
        textShadowColor: Colors.BLACK,
        shadowOpacity: 0.1,
        shadowColor: Colors.PRIMARY,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 40,
        marginTop: 5
    },
    infoText: {
        color: 'white',
        color: Colors.GREY,
        textShadowColor: Colors.BLACK,
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,

    },
    container: {
        flex: 1
    },
    toolContainer: {
        paddingTop: statusHeight,
        marginVertical: 10,
        marginHorizontal: 20,
        flex: 1
    },
    camera: {
        height: height,
        width: ((9 / 16) * height),
        position: 'absolute'
    },
    title: {
        color: 'white',
        fontSize: 18,
        color: Colors.GREY,
        textShadowColor: Colors.BLACK,
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,
    }

})


export default CameraScreen