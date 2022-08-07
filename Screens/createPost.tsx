import React, {useRef, useState} from 'react'
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
    Alert,
    ListRenderItem
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../AllStyles'
import DropDownPicker from 'react-native-dropdown-picker'
import {Asset, launchImageLibrary} from 'react-native-image-picker'
import AntIcon from 'react-native-vector-icons/AntDesign'
import {ITEM_WIDTH} from './postView'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';
import { links } from '../Components/links'
import { COLORS } from '../assets/colors'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import { numberAtom } from '../atoms/numberAtom'
import { useRecoilState } from 'recoil'
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HideKeyboard from '../Components/HideKeyboard';
import { TabParams } from '../Navigation/bottomTab';
import { type, gender, age, stray, stiril, jab } from '../Components/constants/categoryValues';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

type Props = BottomTabScreenProps<TabParams, 'Create'>

interface itemType {
    uri: string
}

function CreatePost({navigation} : Props) {
    const[number, setNumber] = useRecoilState(numberAtom)
    
    const[typeOpen, setTypeOpen] =useState(false)
    const[genderOpen, setGenderOpen] = useState(false)
    const[ageOpen, setAgeOpen] = useState(false)
    const[strayOpen, setStrayOpen] = useState(false)
    const[stirilOpen, setStirilOpen] = useState(false)
    const[jabOpen, setJabOpen] = useState(false)
    const[typeValue, setTypeValue] = useState<any>(null)
    const[strayValue, setStrayValue] = useState<any>(null)
    const[stirilValue, setStirilValue] = useState<any>(null)
    const[jabValue, setJabValue] = useState<any>(null)
    const[breedValue, setBreedValue] = useState<string>('') // Change null to something else, possibly [] to get proper error from server when left empty
    const[ageValue, setAgeValue] = useState<any>(null)
    const[genderValue, setGenderValue] = useState<any>(null)
    const[desc, setDesc] = useState('') // Change null to something else, possibly [] to get proper error from server when left empty

    const[loading, setLoading] = useState(false)

    const[images, setImages] = useState<any>([])
    const textRef = useRef<TextInput>(null)

    const tabBarHeight = useBottomTabBarHeight()
    
    useFocusEffect(
        React.useCallback(() => {
            
            return () => {
            setTypeValue(null)
            setAgeValue(null)
            setJabValue(null)
            setBreedValue('')
            setStrayValue(null)
            setGenderValue(null)
            setStirilValue(null)
            setDesc('')
            setImages([])
            textRef.current?.clear()
            }
        }, [])
    )
    
    async function getImages() {

        const result = await launchImageLibrary ({mediaType:'photo',selectionLimit:2, maxWidth:ITEM_WIDTH, maxHeight:ITEM_WIDTH, quality:0.8})
        if(result.didCancel) {
            setImages([])
        } else {
            console.log('RESULTS ARE HERE!', result, 'ASSETS ARE HERE!!!', result.assets)
            setImages(result.assets)
        }
        
    }

    async function sendPost() {
        
        if(images.length === 2) {
            const jwt = await AsyncStorage.getItem('jwt')

            try{ 
                await axios.post(`${links.ALL_POSTS}`, {
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
                     'auth-token' : jwt? jwt : ''
                 }
             }) 
             setLoading(false)
             navigation.navigate('Home')
         } catch(err: any) {
             setLoading(false)
             Alert.alert(
                 'Внимание',
                     err.response.data,
                     [
                         {
                             text: 'Понятно',
                             style: 'default'
                         }
                     ]
             )
             console.log(err)
         }

        } else {
            Alert.alert(
                'Внимание',
                    'Необходимо добавить 2 фотографии',
                    [
                        {
                            text: 'Понятно',
                            style: 'default',
                            onPress: () => setLoading(false)
                        }
                    ]
            )
        }
    
    }

    async function sendImage() {
        if(images) {
            const dbUrls: string[] = []
            for(let i = 0; i < images.length; i++ ) {
                
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

    const renderItem: ListRenderItem<itemType> = ({item}) => {
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
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.bej}} edges={['top']}>
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
            style={{flex:1}}>
            <HideKeyboard>
            <View style={[styles.post_middle_container, {height: HEIGHT-tabBarHeight-45}]}>
                <Text>{/* 44 is the TopPadding for SafeAreaView */}</Text>
                <View style={[styles.post_create_image_container, {marginBottom:10}]}>
                    
                    {images?.length == 0  &&
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity 
                    style={styles.add_pic_button}
                    onPress={()=> getImages()}
                    >
                        <AntIcon name='plussquareo' size={50} color={COLORS.dark}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20, top:10, color:COLORS.dark}}>Добавить 2 фотографии</Text>
                    </View>
                     }
                    {images?.length == 1 &&
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity 
                    style={styles.add_pic_button}
                    onPress={()=> getImages()}
                    >
                        <AntIcon name='plussquareo' size={50} color={COLORS.dark}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20, top:10, color:COLORS.dark}}>Вам нужно выбрать 2 фотографии</Text>
                    </View>

                    }
                    {(images && images[1]) &&
                    <View style={{flex:1}}>
                    <Text style={{fontSize:25, top:10, textAlign:'center'}}>Фотографии добавлены</Text>
                    <View style={{width:WIDTH, height:ITEM_WIDTH, alignItems:'center', top:20}}>
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
                        placeholder='Порода'
                        onChangeText={setBreedValue}
                        value={breedValue}
                        style={styles.post_category_textinput}
                        placeholderTextColor='black'/>
                    </View>
            <View style={[styles.post_category_container, {flexDirection:'row'}]}>
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
                containerStyle={{width:'62%'}}/>
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
                    ref={textRef}
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
            </HideKeyboard>
            </KeyboardAwareScrollView>
            
        </View>
        </SafeAreaView>
    )
}

export default CreatePost