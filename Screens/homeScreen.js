import React, {useState, useEffect} from 'react'
import {  
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    FlatList,
} from 'react-native'
import { styles } from '../AllStyles'
import { COLORS } from '../assets/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

const allPostsUrl = 'http://10.0.2.2:3000/posts/'

function HideKeyboard ({children}) {
    return(
        <TouchableWithoutFeedback>
            {children}
        </TouchableWithoutFeedback>
    )
}

function HomeScreen ({navigation}) {
const [data, setData] = useState([])

useEffect(()=> {
    getAll()
}, [])

async function getAll() {
    try{
        const allData = await axios.get(allPostsUrl)
        console.log(allData.data)
        setData(allData.data)
    } catch(err) {
        console.log(err)
    }
}

async function filterByType (type) {
    const URL = `http://10.0.2.2:3000/posts/${type}`
    try {
        const filteredCats = await axios.get(URL)
        console.log(filteredCats.data)
        setData(filteredCats.data)
    } catch(err) {
        console.log(err)
    }
}

    const renderItem = ({item}) => {
        return(
            <View>
            <TouchableOpacity 
            style={styles.item_container}
            onPress={()=> navigation.navigate('PostView',{
                id: item._id
            })}>
                <View style={styles.item_image_container}>
                    <Image source={require('../assets/cat_walking.webp')} resizeMode='contain' style={styles.item_image}/>
                </View>
                <View style={styles.item_text_container}>
                    <Text>Name: {item.type}</Text>
                    <Text>Age: {item.breed}</Text>
                    <Text>Location: {item.gender}</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
    
    return (
        <HideKeyboard>
        <View style={{flex:1}}>
        <View style={styles.home}>
            <View style={styles.home_top_container}>
                <TouchableOpacity style={styles.home_icon_container}>
                <Ionicons name='menu-outline' size={30} color={'white'} />
                </TouchableOpacity>
                <View style={styles.home_search_container}>
                    <TextInput style={styles.home_search_bar}/>
                    <View style={styles.search_icon}>
                        <Icon name='search1' size={25} color={'white'}/>
                    </View>
                </View>
            </View>
            <View style={styles.home_middle_container}>
                <View style={styles.home_category_container}>
                <TouchableOpacity
                onPress={() => filterByType('cats')}
                style={styles.home_category_pick}>
                    <Image source={require('../assets/cat.png')} resizeMode='contain' style={styles.category_image}/>
                </TouchableOpacity>
                </View>
                <View style={styles.home_category_container}>
                <TouchableOpacity
                onPress={() => getAll()}
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
            keyExtractor={(item) => item.name}
            />
            </View>
        </View>
        </View>
        </HideKeyboard>
    )
}

export default HomeScreen