import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../assets/colors'
import { styles } from '../AllStyles'
import { avatarsData } from '../assets/avatarsData'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'

function AvatarPick({navigation}) {

    function renderItem({item}) {
        return(
            <TouchableOpacity style={styles.avatar_flatlist_container}
            onPress={() => navigation.navigate('SignUpScreen',{
                url: item.uri,
                id: item.id
            })}
            >
                <Image source={item.uri} style={{
                    width:100,
                    height:100,
                    resizeMode: 'cover',
                }}/>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.bej}}>
            <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
            <View style={styles.avatar_pick_main_container}>
                <Text style={styles.avatar_text}>
                    Выберите аватар
                </Text>
                <View style={styles.avatar_inner_container}>
                    <FlatList
                    keyExtractor={(item) => item.uri}
                    data={avatarsData}
                    renderItem={renderItem}
                    numColumns={2}
                    horizontal={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AvatarPick