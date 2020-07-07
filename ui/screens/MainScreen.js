import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../tools/HeaderButton'

import ViewPager from '@react-native-community/viewpager'
import { StyleSheet, View, Image, Dimensions, BackHandler } from 'react-native';
import { useHeaderHeight } from "@react-navigation/stack";
import { Video } from "expo-av";

import Colors from '../../constants/colors'
import IconButton from "../tools/IconButton";
import Text from '../tools/Text'
import ProfilePicture from '../components/ProfilePicture'

import { videos } from '../../resources/data'

const height = Dimensions.get('screen').height

const MainScreen = ({ navigation }) => {

  const headerHeight = useHeaderHeight()

  const [headerTitle, setHeaderTitle] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const [likes, setLikes] = useState('0')
  const [comments, setComments] = useState('0')
  const [duets, setDuets] = useState('0')
  const [shares, setShares] = useState('0')
  const [audio, setAudio] = useState('')
  const [description, setDescription] = useState('')

  const pageSelectedHandler = event => {
    const video = videos[event.nativeEvent.position]

    setHeaderTitle('@' + video.user)
    setProfilePicture(video.profile)
    setLikes(video.like)
    setComments(video.commment)
    setDuets(video.duet)
    setShares(video.share)
    setAudio(video.audio)
    setDescription(video.description)
  }

  navigation.setOptions({ title: headerTitle })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
            iconSize={23}
            color={Colors.GREY}
            onPress={() => {
              navigation.openDrawer()
            }} />
        </HeaderButtons>
      ),
      headerRight: () => (
        <ProfilePicture
          style={styles.profilePicture}
          picture={profilePicture}
          onPress={() => {
            navigation.navigate('UserProfile', { profilePicture, headerTitle })
          }} />
      )
    });
  })

  return (
    <View style={styles.container}>
      <ViewPager style={styles.pager} initialPage={0} onPageSelected={pageSelectedHandler}>
        {
          videos.map(vid =>
            <Video
              key={vid.id}
              source={{ uri: vid.video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.video}
            />
          )
        }

      </ViewPager>

      <View style={styles.space} />

      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            style={styles.icon}
            ios={'ios-musical-note'}
            android={'md-musical-note'}
            size={16}
            color={Colors.GREY} />

          <Text style={styles.text}>{audio}</Text>
        </View>

        <Text style={{ ...styles.text, marginTop: 5 }}>{description}</Text>

      </View>

      <View style={styles.bottomContainer}>
        <IconButton
          ios={'ios-share'}
          android={'md-share'}
          size={25}
          color={Colors.GREY}
          style={styles.icon}
          label={shares} />

        <IconButton
          ios={'ios-person-add'}
          android={'md-person-add'}
          size={25}
          color={Colors.GREY}
          style={styles.icon}
          label={duets} />

        <IconButton
          style={styles.circle}
          ios={'ios-add'}
          android={'md-add'}
          size={25}
          color={Colors.GREY} />

        <IconButton
          ios={'ios-chatboxes'}
          android={'md-chatboxes'}
          size={25}
          color={Colors.GREY}
          style={styles.icon}
          label={comments} />

        <IconButton
          ios={'ios-heart-empty'}
          android={'md-heart-empty'}
          size={25}
          color={Colors.GREY}
          style={styles.icon}
          label={likes} />
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  profilePicture: {
    height: 30,
    width: 30,
    borderRadius: 24
  },
  infoContainer: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  pager: {
    width: '100%',
    height: height,
    position: 'absolute'
  },
  video: {
    flex: 1
  },
  space: {
    flex: 1
  },
  bottomContainer: {
    margin: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  circle: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  text: {
    marginStart: 10,
    color: Colors.GREY,
    fontSize: 12,
    textShadowColor: Colors.BLACK,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
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
  }
});

export default MainScreen
