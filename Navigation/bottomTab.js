import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreatePost from '../Screens/createPost';
import HomeScreen from '../Screens/homeScreen';
import SignInScreen from '../Screens/signInScreen';
import {COLORS} from '../assets/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DirectScreen from '../Screens/direct'
import NotificationsScreen from '../Screens/notifications'
import ProfileScreen from '../Screens/profile'

const Tab = createBottomTabNavigator()

function BottomTab ({navigation}) {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel:false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: COLORS.superDarkGreen,
            tabBarStyle:{
                backgroundColor: COLORS.homeBackground
            }
        }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({color}) => <AntDesign name='home' size={30} color={color}/>
            }}/>
            <Tab.Screen name='Create' component={CreatePost} options={{
                tabBarIcon: ({color}) => <AntDesign name='plus' size={30} color={color}/>
            }}/>
            <Tab.Screen name='Forum' component={SignInScreen} options={{
                tabBarIcon: ({color}) => <AntDesign name='notification' size={30} color={color}/>
            }}/>
            <Tab.Screen name='DirectScreen' component={DirectScreen} options={{tabBarItemStyle:{display:'none'}}}/>
            <Tab.Screen name='NotificationsScreen' component={NotificationsScreen} options={{tabBarItemStyle:{display:'none'}}}/>
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{tabBarItemStyle:{display:'none'}}}/>
        </Tab.Navigator>
    )
}

export default BottomTab