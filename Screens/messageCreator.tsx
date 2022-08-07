import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Text

} from 'react-native'

import axios from 'axios'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
import { TabParams } from '../Navigation/bottomTab';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<TabParams,'MessageCreator'>

const MessageCreator = ({navigation} : Props) => {
    useEffect(() => {

    })
    return(
        <View style={{flex:1, backgroundColor:'red'}}>
            <Text>Messages Here!</Text>
        </View>
    )
}

export default MessageCreator