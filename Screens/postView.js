import React, { useRef, useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    Alert,
    Modal
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../AllStyles'
import ModalPopUp from '../Components/modalPopUp'
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import Octicon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { numberAtom } from '../atoms/numberAtom'
import { likedAtom } from '../atoms/likedAtom'
import { useRecoilState } from 'recoil'
import { COLORS } from '../assets/colors'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import axios from 'axios'
import { links } from '../Components/links'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

function PostView({route, navigation}) {
    const ref = useRef(null)
    const [mobile, setMobile] = useState(null)
    const [data, setData] = useState([])
    const [imgArray, setImgArray] = useState(null)
    const [zoomImgArr,  setZoomImgArr] = useState(null)
    const {id} = route.params

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState(false)
    const [isCreator, setIsCreator] = useState(false)
    const [imageModal, setImageModal] = useState(false)

    const [number, setNumber] = useRecoilState(numberAtom)
    const [likedState, setLikedState] = useRecoilState(likedAtom)

    useEffect(()=> {
        async function getData() {
            setLoading(true)
            try{ 
                let urls = []
                let urlsZoom = []
                const allData = await axios.get(`${links.ALL_POSTS}`+id)
                const resultUrls = allData.data.urls
                const resultMobile = allData.data.mobile
                setMobile(resultMobile)
                setData(allData.data)
                if(resultUrls) {
                    for(i = 0; i < resultUrls.length; i++) {
                        urls.push({img: `${resultUrls[i]}`, title:'', text:''})
                        urlsZoom.push({url: `${resultUrls[i]}`})
                    }
                }
                setImgArray(urls)
                setZoomImgArr(urlsZoom)
                if(number == resultMobile) {
                    setIsCreator(true)
                } else {
                    setIsCreator(false)
                }
                setLoading(false)
            } catch(err) {
                console.log('Here', err)
                setLoading(false)
            }
        }
        function checkLikes() {
            let newLikes = [...likedState]
            let filteredLikes = newLikes.filter(item => item == id)
            if(filteredLikes[0]) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
        getData()
        checkLikes()
    }, [id, likedState])

    function CarouselItem ({item, index}) {

        return(
            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={() => setImageModal(true)}>
                <Image source={{uri:`${item.img}`}} resizeMode='contain' style={styles.post_image}/>
            </TouchableOpacity>
        )
    }


    function likedPosts() {
        let newLikes = [...likedState]

        if(liked) {
            let filtereLikes = newLikes.filter(item => item != id)
            setLikedState(filtereLikes)
            setLiked(!liked)
            saveLikes()
        } else {
            newLikes.push(id)
            setLikedState(newLikes)
            setLiked(!liked)
            saveLikes()
        }
    }

    function strayDef () {
        if(data.stray === 'Домашний' && data.gender === 'Девочка') {
            return 'Домашняя'
        } else if (data.stray === 'Домашний' && data.gender === 'Мальчик') {
            return 'Домашний'
        } else if (data.stray === 'Уличный' && data.gender === 'Мальчик') {
            return 'Уличный'
        } else if (data.stray === 'Уличный' && data.gender === 'Девочка') {
            return 'Уличная'
        } 
    }

    function stirilDef () {
        if(data.stiril === 'Стерильный' && data.gender === 'Девочка') {
            return 'Стерильная'
        } else if (data.stiril === 'Стерильный' && data.gender === 'Мальчик') {
            return 'Стерильный'
        } else if (data.stiril === 'Не стерильный' && data.gender === 'Мальчик') {
            return 'Не стерильный'
        } else if (data.stiril === 'Не стерильный' && data.gender === 'Девочка') {
            return 'Не стерильная'
        } 
    }

    function jabDef () {
        if(data.jab === 'Привит' && data.gender === 'Девочка') {
            return 'Привита'
        } else if (data.jab === 'Привит' && data.gender === 'Мальчик') {
            return 'Привит'
        } else if (data.jab === 'Не привит' && data.gender === 'Мальчик') {
            return 'Не Привит'
        } else if (data.jab === 'Не привит' && data.gender === 'Девочка') {
            return 'Не Привита'
        } 
    }

    async function saveLikes() {
            const saveLiked = await AsyncStorage.setItem('liked', JSON.stringify(likedState))
            console.log('Saved!')
    }
    function alertPost() {
        Alert.alert('Вы уверены?', 'Что хотите удалить это обьявление?',
        [
            {
                text: 'Да',
                onPress: () => deletePost()
            },
            {
                text: 'Нет'
            }
        ])
    }
 
    async function deletePost () {
        try{
            const deletion = await axios.get(`${links.DELETE_POST}`+id)
           if(deletion.status == 200) {
            navigation.navigate('Home')
           }
        } catch(err) {
            console.log(err.response)
        }
    }
    
/* async function addToFav() {
    try {
        const data = await axios.post(`http://10.0.2.2:3000/user/addFavor`, {number, favor: id, liked})
        console.log(data)
        setLiked(!liked)
    } catch(err) {
        console.log(err)
    }
} */

return(
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.bej}}>
    <View style={[{flex:1, backgroundColor:COLORS.bej}, visible || loading && {opacity:0.5}]}>
        <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
        <ModalPopUp visible={visible} number={mobile}>
            <TouchableOpacity onPress={() => setVisible(false)} style={{ width: 40, height: 40, justifyContent:'center', alignItems:'center'}}>
            <Icon name='cross' size={30} color={COLORS.dark}/>
            </TouchableOpacity>
        </ModalPopUp>
        <Modal visible={imageModal} transparent={true}>
            <ImageViewer 
                imageUrls={zoomImgArr}
                enableSwipeDown={true}
                onSwipeDown={()=>setImageModal(false)}
                enableImageZoom={true}/>
        </Modal>
        <View style={styles.loader}>
            <ActivityIndicator
            animating={loading}
            size='large'
            color='#4B4F40'
            />
            </View>
        <View style={styles.post_top_container}>
            <View style={{width:'10%'}}>
            <TouchableOpacity
            onPress={()=> navigation.goBack()}>
            <MatIcon name='keyboard-backspace' color={COLORS.dark} size={40}/>
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.post_middle_container}>
        <View style={styles.post_image_container}>
        <Carousel
        layout='default'
        ref={ref}
        data={imgArray}
        renderItem={CarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={false}
        />
        </View> 
        <View style={styles.post_info_container}>
            <View style={[styles.post_category_container, {flex:1.4}]}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', top:5}}>
                    <View style={[styles.post_category_text_container_view]}>
                        <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                        <Text style={styles.post_category_text}>{data.breed}</Text>
                    </View>
                </View>
                <View style={{flex:4, flexDirection:'row'}}>
                <View style={styles.post_category_one_container}>
            <View style={styles.post_category_one_view}>
                <View style={styles.post_category_text_container_view}>
                <Icon name='phone' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data.mobile}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data.gender}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data.age}</Text>
                </View>
            </View>
            </View>
            <View style={styles.post_category_one_container}>
            <View style={[styles.post_category_one_view, {paddingLeft:15}]}>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{strayDef()}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{stirilDef()}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{jabDef()}</Text>
                </View>
            </View>
            </View>
                </View>
           
            </View>
            <View style={styles.post_text_container}>
                <ScrollView style={styles.post_text_scroll}>
                    <Text style={{fontSize:18, color:'black', fontWeight:'600'}}>{data.description}</Text>
                </ScrollView>
            </View>
        </View>
        </View>
        <View style={styles.post_bottom_container}>
        {isCreator ? 
            <TouchableOpacity style={styles.post_delete_button} onPress={() => alertPost()}>
                <Feather name='trash-2' color={COLORS.dark} size={35}/>
            </TouchableOpacity> 
            :
            <TouchableOpacity style={styles.post_delete_button} onPress={() => Linking.openURL(`tel://${mobile}`)}>
                <Feather name='phone-call' color={COLORS.dark} size={35}/>
            </TouchableOpacity> 
            }
            <TouchableOpacity style={styles.post_buttons} onPress={() => setVisible(true)}>
                <Text style={styles.post_buttons_text}>Забрать домой!</Text>
            </TouchableOpacity>
            <Pressable style={styles.post_like_button} onPress={()=> likedPosts()}>
                <AntDesign name={liked? 'heart' : 'hearto'} color={'red'}  size={35}/>
            </Pressable>
        </View>
    </View>
    </SafeAreaView>
)
}

export default PostView