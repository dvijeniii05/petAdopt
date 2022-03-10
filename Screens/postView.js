import React, { useRef, useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { styles } from '../AllStyles'
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import Octicon from 'react-native-vector-icons/Octicons'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { COLORS } from '../assets/colors'
import axios from 'axios'

const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const Data = [
    {
        img: require('../assets/cat_walking.png'),
        title:'',
        text:'',
    },
    {
        img: require('../assets/cat_walking.png'),
        title:'',
        text:'',
    },
    {
        img: require('../assets/cat_walking.png'),
        title:'',
        text:'',
    }
]


function CarouselItem ({item, index}) {
    
    return(
        <View style={{flex:1, alignItems:'center'}}>
            <Image source={item.img} resizeMode='contain' style={styles.post_image}/>
        </View>
    )
}
function PostView({route, navigation}) {
    const [image, setImage] = useState(false) 
    const URL = 'http://10.0.2.2:3000/posts/'
    const ref = useRef(null)
    const [data, setData] = useState([])
    const {id} = route.params

    useEffect(()=> {
        async function getData() {
            try{
                const singleData = await axios.get(URL+id)
                console.log(singleData.data)
                setData(singleData.data)
            } catch(err) {
                console.log(err)
            }
        }

        async function getImg() {
            const URL = 'http://10.0.2.2:3000/images'
            try {
                const result = await axios.get(URL+`602643b5a04eecbfcc11c963ddebe721`)
                const data = result.data
                setImage(data)
             } catch(err) {
                console.log(err)
             } 
         }

        getData(),
        getImg()
    }, [])
 
return(
    <View style={{flex:1, backgroundColor:COLORS.background}}>
        <View style={styles.post_top_container}>
            <View style={{width:'10%'}}>
            <TouchableOpacity
            onPress={()=> navigation.goBack()}>
            <MatIcon name='keyboard-backspace' color={COLORS.superDarkGreen} size={40}/>
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.post_middle_container}>
        {!image ?
        <View style={styles.post_image_container}>
        <Carousel
        layout='default'
        ref={ref}
        data={Data}
        renderItem={CarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={false}
        />
        </View> : <View style={styles.post_image_container}>
            <Image source={{uri:`data:image/jpeg;base64,${image}`}} style={{width:'100%', height:'100%'}} resizeMode='contain'/>
        </View>}
        <View style={styles.post_info_container}>
            <View style={[styles.post_category_container, {flex:1.4}]}>
            <View style={styles.post_category_one_container}>
            <View style={styles.post_category_one_view}>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='primitive-dot' size={17} color='black'/>
                <Text style={styles.post_category_text}>{data.breed}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='primitive-dot' size={17} color='black'/>
                <Text style={styles.post_category_text}>{data.gender}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='primitive-dot' size={17} color='black'/>
                <Text style={styles.post_category_text}>{data.age}</Text>
                </View>
            </View>
            </View>
            <View style={styles.post_category_one_container}>
            <View style={[styles.post_category_one_view, {paddingLeft:15}]}>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='primitive-dot' size={17} color='black'/>
                <Text style={styles.post_category_text}>{data.stray}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='primitive-dot' size={17} color='black'/>
                <Text style={styles.post_category_text}>{data.stiril}</Text>
                </View>
                <View style={styles.post_category_text_container_view}>
                <Octicon name='primitive-dot' size={17} color='black'/>
                <Text style={styles.post_category_text}>{data.jab}</Text>
                </View>
            </View>
            </View>
            </View>
            <View style={styles.post_text_container}>
                <ScrollView style={styles.post_text_scroll}>
                    <Text style={{fontSize:15}}>{data.description}</Text>
                </ScrollView>
            </View>
        </View>
        </View>
        <View style={styles.post_bottom_container}>
            <TouchableOpacity style={styles.post_buttons}>
                <Text style={styles.post_buttons_text}>Забрать домой</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}

export default PostView