import React, {useState} from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native'
import { styles } from '../AllStyles'
import DropDownPicker from 'react-native-dropdown-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import AntIcon from 'react-native-vector-icons/AntDesign'
import {ITEM_WIDTH} from './postView'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';
import {ALL_POSTS} from '@env'
import { COLORS } from '../assets/colors'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import { numberAtom } from '../atoms/numberAtom'
import { useRecoilState } from 'recoil'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

function CreatePost({navigation}) {
    const [number, setNumber] = useRecoilState(numberAtom)
    const[typeOpen, setTypeOpen] =useState(false)
    const[genderOpen, setGenderOpen] = useState(false)
    const[ageOpen, setAgeOpen] = useState(false)
    const[strayOpen, setStrayOpen] = useState(false)
    const[stirilOpen, setStirilOpen] = useState(false)
    const[jabOpen, setJabOpen] = useState(false)
    const[typeValue, setTypeValue] =useState(null)
    const[strayValue, setStrayValue] = useState(null)
    const[stirilValue, setStirilValue] = useState(null)
    const[jabValue, setJabValue] = useState(null)
    const[breedValue, setBreedValue] = useState(null) // Change null to something else, possibly [] to get proper error from server when left empty
    const[ageValue, setAgeValue] = useState(null)
    const[genderValue, setGenderValue] = useState(null)
    const[desc, setDesc] = useState(null) // Change null to something else, possibly [] to get proper error from server when left empty

    const[loading, setLoading] = useState(false)

    const[images, setImages] = useState([])

    const type = [{
        label: '😺',
        value: 'cat'
    }, {
        label:'🐶',
        value:'dog'
    }]
    const gender = [{
        label: 'мальчик',
        value: 'Мальчик'
    }, {
        label:'девочка',
        value:'Девочка'
    }]
    const age = [{
        label: 'до 1 года',
        value: 'До 1 года'
    }, {
        label:'1 год',
        value:'1 год'
    },
    {
        label: '2 года',
        value: '2 года'
    },
    {
        label: '3 года',
        value: '3 года'
    },
    {
        label: '4 года',
        value: '4 года'
    },
    {
        label: '5 лет',
        value: '5 лет'
    },
    {
        label: '6 лет',
        value: '6 лет'
    },
    {
        label: '7 лет',
        value: '7 лет'
    },
    {
        label: '8 лет',
        value: '8 лет'
    },]
    const stray = [{
        label: 'да',
        value: 'Уличный'
    }, {
        label:'нет',
        value:'Домашний'
    }]
    const stiril = [{
        label: 'да',
        value: 'Стирильный'
    }, {
        label:'нет',
        value:'Не стирильный'
    }]
    const jab = [{
        label: 'да',
        value: 'Привит'
    }, {
        label:'нет',
        value:'Не привит'
    }]

    const tabBarHeight = useBottomTabBarHeight()
    
    async function getImages() {

        const result = await launchImageLibrary ({mediaType:'photo',selectionLimit:3, maxWidth:ITEM_WIDTH, maxHeight:ITEM_WIDTH})
        setImages(result.assets)
    }

    async function sendPost() {
        console.log(tabBarHeight, StatusBar.currentHeight)
        
        const jwt = await AsyncStorage.getItem('jwt')
        console.log(jwt)

       try{ 
           const result = await axios.post(`${ALL_POSTS}`, {
            type: typeValue,
            breed: breedValue,
            gender: genderValue,
            age: ageValue,
            stray: strayValue,
            stiril: stirilValue,
            jab: jabValue,
            description: desc,
            urls: await sendImage(),
            mobile: number
        }, {
            headers: {
                'auth-token' : jwt
            }
        }) 
        setLoading(false)
        navigation.navigate('Home')
        console.log(result.data)
    } catch(err) {
        setLoading(false)
        console.log('Tut', breedValue, desc)
        alert(err.response.data)
    }
    }

    async function sendImage() {
        if(images) {
            const dbUrls = []
            for(i = 0; i < images.length; i++ ) {
                const unicode = uuidv4()
                const locRef = storage().ref(`${unicode}`)
                const pathToImg = `${images[i].uri}`
                await locRef.putFile(pathToImg)

                await locRef.getDownloadURL()
                .then((url) => {
                dbUrls.push(url)
                })
            }
            return dbUrls
        }
        
        
    } 

    const renderItem = ({item}) => {
        return(
            <View style={{ alignItems:'center'}}>
                <Image source={{uri:item.uri}} 
                style={{width: ITEM_WIDTH*0.6, height:'100%', marginHorizontal:10}}
                resizeMode='contain'
                />
            </View>
)
    }

    return(
        <View style={[styles.create_post_background, loading && {opacity: 0.2}]}>
            <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
            <View style={styles.loader}>
            <ActivityIndicator
            animating={loading}
            size='large'
            color='#4B4F40'
            />
            </View>
            <KeyboardAwareScrollView
            keyboardShouldPersistTaps='always' 
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex:1}}>
            
            <View style={[styles.post_middle_container, {height: HEIGHT-tabBarHeight-StatusBar.currentHeight}]}>
                <View style={[styles.post_create_image_container, {marginBottom:10}]}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    {images === undefined || images.length !== 2  ?
                    <TouchableOpacity 
                    style={styles.add_pic_button}
                    onPress={()=> getImages()}
                    >
                        <AntIcon name='plussquareo' size={50} color={COLORS.dark}/>
                    </TouchableOpacity> :
                    <TouchableOpacity 
                    style={styles.add_pic_button}
                    >
                    </TouchableOpacity> 
                     }
                    
                    {images === undefined || images.length !== 2 ?
                    <Text style={{fontSize:20, top:10, color:COLORS.dark}}>Добавить 2 фотографии</Text> : <Text style={{fontSize:20, top:10}}>Фотографии добавлены</Text>
                    }
                    </View>
                    {images &&
                    <View style={{flex:0.8}}>
                    <View style={{width:WIDTH, height:ITEM_WIDTH*0.5, alignItems:'center'}}>
                        <FlatList
                        data={images}
                        renderItem={renderItem}
                        horizontal/>
                    </View>
                    </View>} 
                </View>
                <View style={styles.post_info_container}>
                    <View style={styles.post_textinput_container}>
                    <TextInput
                    placeholder='Парода'
                    onChangeText={setBreedValue}
                    value={breedValue}
                    style={styles.post_category_textinput}
                    placeholderTextColor='black'/>
                    </View>
                <View style={styles.post_category_container}>
            <View style={styles.post_category_one_container}>
            <View style={styles.post_category_one}>
                <View style={[styles.post_category_text_container, {zIndex:5}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>Питомец:</Text>
                <DropDownPicker
                open={typeOpen} 
                placeholder=''
                items={type}
                value={typeValue}
                setOpen={setTypeOpen}
                setValue={setTypeValue}
                style={{height:30}}
                containerStyle={{width:'60%'}}/>
                </View>
                <View style={[styles.post_category_text_container, {zIndex:4}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>Пол:</Text>
                <DropDownPicker
                open={genderOpen} 
                placeholder=''
                items={gender}
                value={genderValue}
                setOpen={setGenderOpen}
                setValue={setGenderValue}
                style={{height:30}}
                containerStyle={{width:'60%'}}/>
                </View>
                <View style={[styles.post_category_text_container, {zIndex:3}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>Возраст:</Text>
                <DropDownPicker
                open={ageOpen} 
                placeholder=''
                items={age}
                value={ageValue}
                setOpen={setAgeOpen}
                setValue={setAgeValue}
                style={{height:30}}
                containerStyle={{width:'60%'}}/>
                </View>
            </View>
            </View>
            <View style={styles.post_category_one_container}>
            <View style={styles.post_category_one}>
            <View style={[styles.post_category_text_container, {zIndex:5}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>Уличный:</Text>
                <DropDownPicker
                open={strayOpen} 
                placeholder=''
                items={stray}
                value={strayValue}
                setOpen={setStrayOpen}
                setValue={setStrayValue}
                style={{height:30}}
                containerStyle={{width:'60%'}}/>
                </View>
                <View style={[styles.post_category_text_container, {zIndex:4}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>Стирил.:</Text>
                <DropDownPicker
                open={stirilOpen} 
                placeholder=''
                items={stiril}
                value={stirilValue}
                setOpen={setStirilOpen}
                setValue={setStirilValue}
                style={{height:30}}
                containerStyle={{width:'60%'}}/>
                </View>
                <View style={[styles.post_category_text_container, {zIndex:3}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>Привит:</Text>
                <DropDownPicker
                open={jabOpen} 
                placeholder=''
                items={jab}
                value={jabValue}
                setOpen={setJabOpen}
                setValue={setJabValue}
                style={{height:30}}
                containerStyle={{width:'60%'}}/>
                </View>
            </View>
            </View>
            </View>
            <View style={styles.post_text_container}>
                <ScrollView style={styles.post_text_scroll}>
                    <TextInput
                    placeholder='Опишите все детали здесь'
                    placeholderTextColor='black'
                    onChangeText={(text)=> setDesc(text)}
                    multiline={true}
                    style={{fontSize:17, color:'black'}}/>
                </ScrollView>
            </View>
            <View style={styles.post_create_button_container}>
                <TouchableOpacity 
                style={styles.post_create_button}
                onPress={()=> {
                    setLoading(true)
                    sendPost()}}>
                    <Text style={{fontSize:18, color:COLORS.bej}}>Опубликовать</Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
            
            </KeyboardAwareScrollView>
        </View>
    )
}

export default CreatePost