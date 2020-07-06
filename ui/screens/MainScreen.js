import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../tools/HeaderButton'

import ViewPager from '@react-native-community/viewpager'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useHeaderHeight } from "@react-navigation/stack";
import { Video } from "expo-av";

import Colors from '../../constants/colors'
import IconButton from "../tools/IconButton";
import ProfilePicture from '../components/ProfilePicture'

const height = Dimensions.get('screen').height

const MainScreen = ({ navigation }) => {
  const headerHeight = useHeaderHeight()

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
        <ProfilePicture picture='../../resources/profile.jpeg' />
      )
    });
  })

  return (
    <View style={styles.container}>
       <View style={{width:'100%', alignItems:'center', justifyContent:'center', zIndex:1, marginTop:headerHeight}}>
        <Image style={{height:45, width:45, alignSelf:'flex-end', marginEnd:10}} source={require('../../resources/icon2.png')}/>
      </View>
      <ViewPager style={styles.pager}>
        <Video
          source={{ uri: 'https://assets.mixkit.co/videos/download/mixkit-man-under-multicolored-lights-1237.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </ViewPager>
      
      <View style={styles.space} />
      <View style={styles.bottomContainer}>
        <IconButton ios={'ios-share'} android={'md-share'} size={25} color={Colors.GREY} label={"2.1k"} />
        <IconButton ios={'ios-person-add'} android={'md-person-add'} size={25} color={Colors.GREY} label={"4k"} />
        <IconButton style={styles.circle} ios={'ios-add'} android={'md-add'} size={25} color={Colors.GREY} />
        <IconButton ios={'ios-chatboxes'} android={'md-chatboxes'} size={25} color={Colors.GREY} label={"231"} />
        <IconButton ios={'ios-heart-empty'} android={'md-heart-empty'} size={25} color={Colors.GREY} label={"9k"} />
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  pager:{
    width: '100%',
    height: height,
    position: 'absolute'
  },
  video: {
    flex:1
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
