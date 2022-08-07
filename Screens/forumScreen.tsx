import React from 'react'
import {
    View,
    Image,
    Text
} from 'react-native'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import { COLORS } from '../assets/colors'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { TabParams } from '../Navigation/bottomTab'

type Props = BottomTabScreenProps<TabParams, 'Forum'>

const ForumScreen = ({navigation} : Props) => {
    return(
        <View style={{flex:1, backgroundColor: COLORS.bej}}>
            <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{fontSize:20}}>Скоро...</Text>
                <Image source={require('../assets/loading.gif')} resizeMode='contain' style={{ marginTop:10, width:120}}/>
            </View>
        </View>
    )
}

export default ForumScreen