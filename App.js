/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import AuthScreen from './Screens/auth';

const Stack = createNativeStackNavigator()



function App () {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='AuthScreen' component={AuthScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}
export default App;
