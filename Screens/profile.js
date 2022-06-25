import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import {styles} from '../AllStyles'
import {COLORS} from '../assets/colors'
import axios from 'axios'
import {ALL_POSTS} from '@env'
import { links } from '../Components/links'
import { useFocusEffect } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { numberAtom } from '../atoms/numberAtom';
import { likedAtom } from '../atoms/likedAtom'

function ProfileScreen({navigation}) {

    const [data, setData] = useState()
    const [mobile, setMobile] = useRecoilState(numberAtom)
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
                console.log(liked)
                console.log(allData)
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
        <View style={{flex:1}}>
        <View style={styles.home}>
        <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
            
            <View style={styles.home_bottom_container}>
            {!liked[0] && <View style={{top:20}}><Text style={{fontSize:25, color:COLORS.darkGreen}}>Ваши Фавориты</Text></View>}
            <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            horizontal={false}
            keyExtractor={(item) => item._id}
            />
            </View>
        </View>
        </View>
    )
}

export default ProfileScreen