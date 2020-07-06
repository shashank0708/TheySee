import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../tools/HeaderButton'

import ViewPager from '@react-native-community/viewpager'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useHeaderHeight } from "@react-navigation/stack";
import { Video } from "expo-av";

import Colors from '../../constants/colors'
import IconButton from "../tools/IconButton";
import ProfilePicture from '../components/ProfilePicture'

import data from '../../resources/data'

const height = Dimensions.get('screen').height

const MainScreen = ({ navigation }) => {

  const headerHeight = useHeaderHeight()

  const [headerTitle, setHeaderTitle] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const [likes, setLikes] = useState('0')
  const [comments, setComments] = useState('0')
  const [duets, setDuets] = useState('0')
  const [shares, setShares] = useState('0')

  const pageSelectedHandler = event => {
    const video = data[event.nativeEvent.position]

    setHeaderTitle('@' + video.user)
    setProfilePicture(video.profile)
    setLikes(video.like)
    setComments(video.commment)
    setDuets(video.duet)
    setShares(video.share)
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
            onPress={() => {
              navigation.openDrawer()
            }} />
        </HeaderButtons>
      ),
      headerRight: () => (
        <ProfilePicture picture={profilePicture} />
      )
    });
  })

  return (
    <View style={styles.container}>
      <ViewPager style={styles.pager} initialPage={0} onPageSelected={pageSelectedHandler}>
        {
          data.map(vid =>
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
            />)
        }

      </ViewPager>

      <View style={styles.space} />
      
      <View style={styles.bottomContainer}>
        <IconButton ios={'ios-share'} android={'md-share'} size={25} color={Colors.GREY} label={shares} />
        <IconButton ios={'ios-person-add'} android={'md-person-add'} size={25} color={Colors.GREY} label={duets} />
        <IconButton style={styles.circle} ios={'ios-add'} android={'md-add'} size={25} color={Colors.GREY} />
        <IconButton ios={'ios-chatboxes'} android={'md-chatboxes'} size={25} color={Colors.GREY} label={comments} />
        <IconButton ios={'ios-heart-empty'} android={'md-heart-empty'} size={25} color={Colors.GREY} label={likes} />
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
  }
});

export default MainScreen
