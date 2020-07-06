import React from 'react'
import { Platform } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from '../screens/MainScreen'
import Colors from '../../constants/colors'

const MainNavigator = createStackNavigator()

const defaultScreenOptions = {
    headerTransparent:true,
    headerStyle: {
        backgroundColor: 'transparent',
        elevation:0,
        shadowOpacity:0
    },
    headerTintColor: Colors.WHITE,
    headerTitleStyle: {
      alignSelf:'center',
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
                <MainNavigator.Screen name='Main' component={MainScreen} options={{title:'@shhshank'}}/>
            </MainNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Main

