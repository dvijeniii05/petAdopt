import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { TabParams } from '../Navigation/bottomTab'

type Props = BottomTabScreenProps<TabParams, 'NotificationsScreen'>

function NotificationsScreen({navigation} : Props) {
    return(
        <View style={{flex:1, backgroundColor:'green'}}>
            <Text>Notification Screen</Text>
        </View>
    )
}

export default NotificationsScreen