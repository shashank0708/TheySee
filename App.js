import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './ui/navigation/AppNavigator'

import MainScreen from './ui/screens/MainScreen'

export default function App() {
  return (
    <View style={styles.container}> 
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});