import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from '../Screens/authScreen';
import DrawerContent from './drawerContent';
import BottomTab from './bottomTab';
import PostView from '../Screens/postView'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

function AppStack() {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='AppTab' component={BottomTab}/>
      <Stack.Screen name='SignIn' component={AuthScreen}/>
      <Stack.Screen name='PostView' component={PostView}/>
    </Stack.Navigator>
  )
}

function AppDrawer () {
  return(
    <Drawer.Navigator  screenOptions={{
      headerShown: false
    }} drawerContent={(props) => <DrawerContent {...props}/>}>
      <Drawer.Screen name='AppStack' component={AppStack} />
    </Drawer.Navigator>
  )
}

export default AppDrawer