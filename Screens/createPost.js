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
import { links } from '../Components/links'
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
        label: '????',
        value: 'cat'
    }, {
        label:'????',
        value:'dog'
    }]
    const gender = [{
        label: '??????????????',
        value: '??????????????'
    }, {
        label:'??????????????',
        value:'??????????????'
    }]
    const age = [{
        label: '???? 1 ????????',
        value: '???? 1 ????????'
    }, {
        label:'1 ??????',
        value:'1 ??????'
    },
    {
        label: '2 ????????',
        value: '2 ????????'
    },
    {
        label: '3 ????????',
        value: '3 ????????'
    },
    {
        label: '4 ????????',
        value: '4 ????????'
    },
    {
        label: '5 ??????',
        value: '5 ??????'
    },
    {
        label: '6 ??????',
        value: '6 ??????'
    },
    {
        label: '7 ??????',
        value: '7 ??????'
    },
    {
        label: '8 ??????',
        value: '8 ??????'
    },]
    const stray = [{
        label: '????',
        value: '??????????????'
    }, {
        label:'??????',
        value:'????????????????'
    }]
    const stiril = [{
        label: '????',
        value: '????????????????????'
    }, {
        label:'??????',
        value:'???? ????????????????????'
    }]
    const jab = [{
        label: '????',
        value: '????????????'
    }, {
        label:'??????',
        value:'???? ????????????'
    }]

    const tabBarHeight = useBottomTabBarHeight()
    
    async function getImages() {

        const result = await launchImageLibrary ({mediaType:'photo',selectionLimit:2, maxWidth:ITEM_WIDTH, maxHeight:ITEM_WIDTH, quality:0.6})
        setImages(result.assets)
    }

    async function sendPost() {
       // console.log(tabBarHeight, StatusBar.currentHeight)
        
        const jwt = await AsyncStorage.getItem('jwt')
        console.log(jwt)

       try{ 
           const result = await axios.post(`${links.ALL_POSTS}`, {
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
        //alert(err.response)
        console.log(err.response)
    }
    }

    async function sendImage() {
        if(images) {
            console.log('FOTKI', images)
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
                    <Text style={{fontSize:20, top:10, color:COLORS.dark}}>???????????????? 2 ????????????????????</Text> : <Text style={{fontSize:20, top:10}}>???????????????????? ??????????????????</Text>
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
                    placeholder='????????????'
                    onChangeText={setBreedValue}
                    value={breedValue}
                    style={styles.post_category_textinput}
                    placeholderTextColor='black'/>
                    </View>
                <View style={styles.post_category_container}>
            <View style={styles.post_category_one_container}>
            <View style={styles.post_category_one}>
                <View style={[styles.post_category_text_container, {zIndex:5}]}>
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>??????????????:</Text>
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
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>??????:</Text>
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
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>??????????????:</Text>
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
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>??????????????:</Text>
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
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>????????????.:</Text>
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
                <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:15}}>????????????:</Text>
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
                    placeholder='?????????????? ?????? ???????????? ??????????'
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
                    <Text style={{fontSize:18, color:COLORS.bej}}>????????????????????????</Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
            
            </KeyboardAwareScrollView>
        </View>
    )
}

export default CreatePost