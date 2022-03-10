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
  StatusBar
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import AppDrawer from './Navigation/AppStack';
import { COLORS } from './assets/colors';


function App () {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={COLORS.background} hidden={true}/>
    <NavigationContainer>
      <AppDrawer/>
    </NavigationContainer>
    </SafeAreaView>
  )
}
export default App;
