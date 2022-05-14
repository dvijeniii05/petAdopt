import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Text

} from 'react-native'

import {ALL_POSTS, HOST} from '@env'
import axios from 'axios'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

function MessageCreator ({navigation}) {
    useEffect(() => {
        const socket = io(`${HOST}`)

    })
    return(
        <View style={{flex:1, backgroundColor:'red'}}>
            <Text>Messages Here!</Text>
        </View>
    )
}

export default MessageCreator