import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import {styles} from '../AllStyles'
import {COLORS} from '../assets/colors'
import axios from 'axios'
import { links } from '../Components/links'
import { useFocusEffect } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { likedAtom } from '../atoms/likedAtom'

function ProfileScreen({navigation}) {

    const [data, setData] = useState()
    const [liked, setLiked] = useRecoilState(likedAtom)

    useFocusEffect(
        React.useCallback( () => {
    
            async function getAll() {
                let allData = []
                for(i = 0; i < liked.length; i++) {
                    try{
                    const getData = await axios.get(`${links.ALL_POSTS}`+`${liked[i]}`)
                    allData.push(getData.data)
                    } catch(err) {
                        console.log(err)
                    }
                }
                setData(allData)
            }
    
            getAll()
    
        }, [liked])
    )

    const renderItem = ({item}) => {
        return(
            <View >
            <TouchableOpacity 
            style={styles.item_container}
            onPress={()=> navigation.navigate('PostView',{
                id: item._id
            })}>
                <View style={styles.item_image_container}>
                    <Image source={{uri: `${item.urls[0]}`}} resizeMode='cover' style={styles.item_image}/>
                </View>
                <View style={styles.item_text_container}>
                    <Text style={{textAlign:'center', color:COLORS.bej, fontSize:16}}>{item.gender}</Text>
                    <Text style={{textAlign:'center',color:COLORS.bej, fontSize:16}}>{item.age}</Text>
                    <Text style={{textAlign:'center', color:COLORS.bej, fontSize:16}}>{item.stray}</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.home}>
        <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
        <View style={styles.home_middle_container}>
                <View style={{top:20}}><Text style={{fontSize:25, color:COLORS.darkGreen}}>Ваши Фавориты</Text></View>
            </View>
            <View style={styles.home_bottom_container}>
            
            <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            horizontal={false}
            keyExtractor={(item) => item._id}
            />
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen