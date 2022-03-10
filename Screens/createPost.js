import React, {useState} from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions
} from 'react-native'
import { styles } from '../AllStyles'
import DropDownPicker from 'react-native-dropdown-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import AntIcon from 'react-native-vector-icons/AntDesign'
import {ITEM_WIDTH} from './postView'
import axios from 'axios'

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

function CreatePost() {
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
    const[breedValue, setBreedValue] = useState(null)
    const[ageValue, setAgeValue] = useState(null)
    const[genderValue, setGenderValue] = useState(null)
    const[image, setImage] = useState(null)
    const[bnr, setBnr] =useState(null)
    const[desc, setDesc] = useState(null)

    const type = [{
        label: '😺',
        value: 'cat'
    }, {
        label:'🐶',
        value:'dog'
    }]
    const gender = [{
        label: 'мальчик',
        value: 'мальчик'
    }, {
        label:'девочка',
        value:'девочка'
    }]
    const age = [{
        label: 'до 1 года',
        value: 'до 1 года'
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
        value: 'уличный'
    }, {
        label:'нет',
        value:'домашний'
    }]
    const stiril = [{
        label: 'да',
        value: 'стирильный'
    }, {
        label:'нет',
        value:'не стирильный'
    }]
    const jab = [{
        label: 'да',
        value: 'привит'
    }, {
        label:'нет',
        value:'не привит'
    }]
    
    async function getImages() {

        const result = await launchImageLibrary ({mediaType:'photo',selectionLimit:3, maxWidth:ITEM_WIDTH, maxHeight:ITEM_WIDTH, includeBase64: true})
        
        setImage(result.assets)
        setBnr(result.assets.base64)
        console.log(image)

    }

    async function sendPost() {
        const URL = 'http://10.0.2.2:3000/posts/'
       try{ 
           await axios.post(URL, {
            type: typeValue,
            breed: breedValue,
            gender: genderValue,
            age: ageValue,
            stray: strayValue,
            stiril: stirilValue,
            jab: jabValue,
            description: desc
        }) 
    } catch(err) {
        console.log(err)
    }
    }

   /*  async function sendImage() {
        const fd = new FormData()
        const imgs = image
        if(imgs) {
            for(let i = 0; i < imgs.length; i++) {
                fd.append('image', {
                    name: imgs.fileName,
                    uri: imgs.uri,
                    type: 'image/jpeg'
                    })
            }
            console.log(fd)
            fetch('http://10.0.2.2:3000/images', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: fd,
                })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            }); 
        }
    } */

   /* async function sendImage() {

        const locRef = storage().ref('maybe.jpg')
        const pathToImg = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`

        await locRef.putFile(pathToImg)

    } */

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
        <View style={styles.create_post_background}>
            
            <View style={styles.post_middle_container}>
                <View style={[styles.post_image_container, {marginBottom:10}]}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity 
                    style={styles.add_pic_button}
                    onPress={()=> getImages()}
                    >
                        <AntIcon name='plussquareo' size={50} color='white'/>
                    </TouchableOpacity>
                    {!image ?
                    <Text style={{fontSize:20, top:10}}>Добавить фотографии</Text> : <Text style={{fontSize:20, top:10}}>Фотографии добавлены</Text>
                    }
                    </View>
                    {image &&
                    <View style={{flex:0.8}}>
                    <View style={{width:WIDTH, height:ITEM_WIDTH*0.5, alignItems:'center'}}>
                        <FlatList
                        data={image}
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
                <Text style={{color:'black'}}>Питомец:</Text>
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
                <Text style={{color:'black'}}>Пол:</Text>
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
                <Text style={{color:'black'}}>Возраст:</Text>
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
                <Text style={{color:'black'}}>Уличный:</Text>
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
                <Text style={{color:'black'}}>Стирил.:</Text>
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
                <Text style={{color:'black'}}>Привит:</Text>
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
                    multiline={true}/>
                </ScrollView>
            </View>
            <View style={styles.post_create_button_container}>
                <TouchableOpacity 
                style={styles.post_create_button}
                onPress={()=> sendImage()}>
                    <Text style={{fontSize:18, color:'white'}}>Опубликовать</Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
        </View>
    )
}

export default CreatePost