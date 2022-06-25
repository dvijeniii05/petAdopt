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
    Alert
} from 'react-native'
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

function CarouselItem ({item, index}) {
    
    return(
        <View style={{flex:1, alignItems:'center'}}>
            <Image source={{uri:`${item.img}`}} resizeMode='contain' style={styles.post_image}/>
        </View>
    )
}
function PostView({route, navigation}) {
    const ref = useRef(null)
    const [mobile, setMobile] = useState(null)
    const [data, setData] = useState([])
    const [imgArray, setImgArray] = useState(null)
    const {id} = route.params

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState(false)
    const [isCreator, setIsCreator] = useState(false) 

    const [number, setNumber] = useRecoilState(numberAtom)
    const [likedState, setLikedState] = useRecoilState(likedAtom)

    useEffect(()=> {
        console.log('State check', likedState)
        async function getData() {
            setLoading(true)
            try{ 
                let urls = []
                const allData = await axios.get(`${links.ALL_POSTS}`+id)
                const resultUrls = allData.data.urls
                const resultMobile = allData.data.mobile
                console.log(allData.data)
                console.log(resultMobile)
                setMobile(resultMobile)
                setData(allData.data)
                if(resultUrls) {
                    for(i = 0; i < resultUrls.length; i++) {
                        urls.push({img: `${resultUrls[i]}`, title:'', text:''})
                    }
                }
                setImgArray(urls)
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
            console.log('Filtered likes',filteredLikes)
            if(filteredLikes[0]) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
        getData()
        checkLikes()
    }, [id, likedState])

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
    <View style={[{flex:1, backgroundColor:COLORS.bej}, visible || loading && {opacity:0.5}]}>
        <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
        <ModalPopUp visible={visible} number={mobile}>
            <TouchableOpacity onPress={() => setVisible(false)} style={{ width: 40, height: 40, justifyContent:'center', alignItems:'center'}}>
            <Icon name='cross' size={30} color={COLORS.dark}/>
            </TouchableOpacity>
        </ModalPopUp>
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
            <View style={styles.post_category_one_container}>
            <View style={styles.post_category_one_view}>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data.breed}</Text>
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
                <Text style={styles.post_category_text}>{data.stray}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data.stiril}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='dot-fill' size={17} color={COLORS.blue}/>
                <Text style={styles.post_category_text}>{data.jab}</Text>
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
            {isCreator && 
            <TouchableOpacity style={styles.post_delete_button} onPress={() => alertPost()}>
                <Feather name='trash-2' color={COLORS.dark} size={35}/>
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
)
}

export default PostView