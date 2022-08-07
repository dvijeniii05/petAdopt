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
    Modal,
    Linking
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
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerParams } from '../Navigation/AppStack'
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type'
import { jabDef, stirilDef, strayDef } from '../Components/SyntaxAdjuster'
import { dataProps } from '../types/Types'

const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

type Props = DrawerScreenProps<DrawerParams, 'PostView'>

function PostView({route, navigation} : Props) {
    const ref = useRef(null)
    const [mobile, setMobile] = useState(null)
    const [data, setData] = useState<dataProps>({
        __v: '',
    _id: '',
    age: '',
    breed: '',
    data: '',
    description: '',
    gender: '',
    jab: '',
    mobile: '',
    stiril: '',
    stray: '',
    type: '',
    urls: []
    })
    const [imgArray, setImgArray] = useState<Array<object>>([])
    const [zoomImgArr,  setZoomImgArr] = useState<IImageInfo[]>()
    const {id} = route.params

    const [visible, setVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const [isCreator, setIsCreator] = useState<boolean>(false) 
    const [imageModal, setImageModal] = useState<boolean>(false)

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
                    for(let i = 0; i < resultUrls.length; i++) {
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
        console.log('DATA TYPES HERE', data)
    }, [id, likedState])

    function CarouselItem ({item} : any) {
    
        return(
            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={() => setImageModal(true)}>
                <Image source={{uri:`${item.img}`}} resizeMode='contain' style={styles.post_image}/>
            </TouchableOpacity>
        )
    }

    function likedPosts() {
        let newLikes : any = [...likedState]

        if(liked) {
            let filtereLikes = newLikes.filter((item: string) => item != id)
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


    async function saveLikes() {
            const saveLiked = await AsyncStorage.setItem('liked', JSON.stringify(likedState))
            
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
            navigation.navigate('AppTab', {
                Screen : 'Home'
            })
           }
        } catch(err : any) {
            console.log(err.response)
        }
    }

return(
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.bej}}>
    <View style={[{flex:1, backgroundColor:COLORS.bej}, (visible || loading) && {opacity:0.5}]}>
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
                <Text style={styles.post_category_text}>{data? strayDef(data) : ''}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data? stirilDef(data) : ''}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data? jabDef(data) : ''}</Text>
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