import React from 'react'
import { Platform } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import TestScreen from '../screens/TestScreen'

import MainScreen from '../screens/MainScreen'
import UserProfileScreen from '../screens/UserProfileScreen'
import CameraScreen from '../screens/CameraScreen'


import Colors from '../../constants/colors'

const MainNavigator = createStackNavigator()

const defaultScreenOptions = {
    headerTransparent: true,
    headerTintColor: Colors.GREY,
    headerTitleStyle: {
        alignSelf: 'center',
        fontFamily: 'MontserratRegular',
        textShadowColor: Colors.PRIMARY,
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,
    },



}

const Main = () => {
    return (
        <NavigationContainer>
            <MainNavigator.Navigator
                screenOptions={defaultScreenOptions}>
                <MainNavigator.Screen name='Test' component={TestScreen} options={{ title: '' }} />
                <MainNavigator.Screen name='Camera' component={CameraScreen} options={{ title: '' }} />
                <MainNavigator.Screen name='Main' component={MainScreen} options={{ title: '@shhshank' }} />
                <MainNavigator.Screen name='UserProfile' component={UserProfileScreen} options={{ title: '@shhshank' }} />
            </MainNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Main

