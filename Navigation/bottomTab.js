import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreatePost from '../Screens/createPost';
import HomeScreen from '../Screens/homeScreen';
import SignInScreen from '../Screens/signInScreen';
import SignUpScreen from '../Screens/signUpScreen';
import {COLORS} from '../assets/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import UserPosts from '../Screens/userPostsScreen'
import NotificationsScreen from '../Screens/notifications'
import ProfileScreen from '../Screens/profile'
import MessageCreator from '../Screens/messageCreator';
import ForumScreen from '../Screens/forumScreen';
import DonationScreen from '../Screens/donationScreen';

const Tab = createBottomTabNavigator()

function BottomTab ({navigation}) {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel:false,
            tabBarActiveTintColor: COLORS.blue,
            tabBarInactiveTintColor: COLORS.dark,
            tabBarHideOnKeyboard: true,
            tabBarStyle:{
                backgroundColor: COLORS.bej,
                borderTopWidth: 0,
            }
        }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({color}) => <AntDesign name='home' size={30} color={color}/>
            }}/>
            <Tab.Screen name='Create' component={CreatePost} options={{
                tabBarIcon: ({color}) => <AntDesign name='plus' size={30} color={color}/>
            }}/>
            <Tab.Screen name='Donation' component={DonationScreen} options={{
                tabBarIcon: ({color}) => <AntDesign name='notification' size={30} color={color}/>
            }}/>
            <Tab.Screen name='UserPosts' component={UserPosts} options={{tabBarItemStyle:{display:'none'}}}/>
            <Tab.Screen name='NotificationsScreen' component={NotificationsScreen} options={{tabBarItemStyle:{display:'none'}}}/>
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{tabBarItemStyle:{display:'none'}}}/>
            <Tab.Screen name='MessageCreator' component={MessageCreator} options={{tabBarItemStyle:{display:'none'}}}/>
        </Tab.Navigator>
    )
}

export default BottomTab