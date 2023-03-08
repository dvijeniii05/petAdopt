import React, {useState, useEffect} from 'react'
import {  
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    FlatList,
    LogBox,
    BackHandler
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../AllStyles'
import axios from 'axios'
import { links } from '../Components/links'
import { useFocusEffect } from '@react-navigation/native'
import { COLORS } from '../assets/colors'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import AsyncStorage from '@react-native-async-storage/async-storage'

LogBox.ignoreLogs(['Encountered two children with the same key, ...'])

function HideKeyboard ({children}) {
    return(
        <TouchableWithoutFeedback>
            {children}
        </TouchableWithoutFeedback>
    )
}

function HomeScreen ({navigation}) {
const [data, setData] = useState([])

useFocusEffect(
    React.useCallback( () => {

        async function getAll() {
            try{
                const allData = await axios.get(`${links.ALL_POSTS}`)
                setData(allData.data)
            } catch(err) {
                console.log(err)
            }
        }

        getAll()
        showNewFeatureAlert()
    }, [])
)

 useEffect(() => {   //ADD THIS ONCE FINISHED WITH APP TO PREVENT GOING BACK FROM HOME SCREEN!!!
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
}, [])   

async function filterByType (type) {
    try {
        const filteredCats = await axios.get(`${links.ALL_POSTS}${type}`)
        
        setData(filteredCats.data)
    } catch(err) {
        console.log(err)
    }
}

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

    const showNewFeatureAlert = async () => {
        const newFeatureStored = await AsyncStorage.getItem('newFeature');
        if (newFeatureStored == null) {
          Alert.alert(
            'Новый экран!🚀',
            'Теперь вы можете увидеть список некоторых приютов/фондов помощи для животных в Баку. Нажмите на иконку РУПОР - 📢  в нижней консоли навигации. Давайте поможем животным вместе!',
            [
              {
                text: 'Понятно',
                style: 'default',
                onPress: () => {
                  AsyncStorage.setItem('newFeature', 'seen');
                },
              },
            ],
          );
        }
      };
    
    return (
        <HideKeyboard>
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.bej}} edges={['top']}>
        <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
            <View style={styles.home_middle_container}>
                <View style={styles.home_category_container}>
                <TouchableOpacity
                onPress={() => filterByType('cats')}
                style={styles.home_category_pick}>
                    <Image source={require('../assets/cat.png')} resizeMode='contain' style={styles.category_image} />
                </TouchableOpacity>
                </View>
                <View style={styles.home_category_container}>
                <TouchableOpacity
                onPress={() => filterByType('')}
                style={styles.home_category_pick}>
                    <Image source={require('../assets/pets.png')} resizeMode='contain' style={styles.category_image}/>
                </TouchableOpacity>
                </View>
                <View style={styles.home_category_container}>
                <TouchableOpacity 
                onPress={() => filterByType('dogs')}
                style={styles.home_category_pick}>
                    <Image source={require('../assets/dog.png')} resizeMode='contain' style={styles.category_image}/>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.home_bottom_container}>
            <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled={true}
            keyExtractor={(item) => item._id}
            />
            </View>
        </SafeAreaView>
        </HideKeyboard>
    )
}

export default HomeScreen