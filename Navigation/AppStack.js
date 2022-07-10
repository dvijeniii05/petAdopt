import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from '../Screens/authScreen';
import AvatarPick from '../Screens/avatarPick'
import SignInScreen from '../Screens/signInScreen';
import SignUpScreen from '../Screens/signUpScreen';
import DrawerContent from './drawerContent';
import BottomTab from './bottomTab';
import PostView from '../Screens/postView'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {GET_USER, ADD_LIKED} from '@env'
import { links } from '../Components/links'
import axios from 'axios';
import { avatarAtom } from '../atoms/avatarAtom';
import { realnameAtom } from '../atoms/realnameAtom';
import { numberAtom } from '../atoms/numberAtom';
import { emailAtom } from '../atoms/emailAtom';
import { likedAtom } from '../atoms/likedAtom'
import { useRecoilState } from 'recoil';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

function DrawerStack() {
  return(

    <Drawer.Navigator  screenOptions={{
      headerShown: false
    }} drawerContent={(props) => <DrawerContent {...props}/>}>
      <Drawer.Screen name='AppTab' component={BottomTab}/>
      <Drawer.Screen name='PostView' component={PostView}/>
    </Drawer.Navigator>

  )
}

function AppDrawer () {
  const [avatar, setAvatar] = useRecoilState(avatarAtom)
  const [realname, setRealname] = useRecoilState(realnameAtom)
  const [number, setNumber] = useRecoilState(numberAtom)
  const [emailUser, setEmailUser] = useRecoilState(emailAtom)
  const [liked, setLiked] = useRecoilState(likedAtom)

  useEffect(() => {
    console.log('DRAWER')
    getUser()
    getLiked()
  }, [emailUser])

  async function getUser() {
    const storedEmail = await AsyncStorage.getItem('email')
    console.log('EMAIL IS STORED', storedEmail)
    if(storedEmail) {
      try{
        const userInfo = await axios.post(`${links.GET_USER}`, {
          email: storedEmail
        })
        console.log('UserInfo from server', userInfo.data)
        setEmailUser(userInfo.data.email)
        setAvatar(userInfo.data.avatar)
        setNumber(userInfo.data.mobile)
        setRealname(userInfo.data.username)

      } catch(err) {
        console.log(err)
      }
    }
  }

  async function getLiked() {
    const getData = await AsyncStorage.getItem('liked')
    if(getData != null) {
      setLiked(JSON.parse(getData))
    } else {setLiked([])}
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Auth' component={AuthScreen}/>
      <Stack.Screen name='AvatarPick' component={AvatarPick}/>
      <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
      <Stack.Screen name='SignInScreen' component={SignInScreen}/>
      <Stack.Screen name='Drawer' component={DrawerStack} options={{gestureEnabled: false}}/>
    </Stack.Navigator>
  )
}

export default AppDrawer