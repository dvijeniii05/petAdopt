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
import {USER_POSTS} from '@env'
import { useFocusEffect } from '@react-navigation/native'
import {useRecoilState} from 'recoil'
import { numberAtom } from '../atoms/numberAtom';

function UserPosts({navigation}) {

    const [data, setData] = useState(null)
    const [mobile, setMobile] = useRecoilState(numberAtom)

    useFocusEffect(
        React.useCallback( () => {
    
            async function getAll() {
                try{
                    const allData = await axios.get(`${USER_POSTS}`+mobile)
                    
                    setData(allData.data)
                } catch(err) {
                    console.log(err)
                }
            }
    
            getAll()
            console.log('TTUTUUT',data)
    
        }, [])
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
            {data.message && <View style={{top:20}}><Text style={{fontSize:25, color:COLORS.darkGreen}}>Ваши Обьявления</Text></View>}
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

export default UserPosts