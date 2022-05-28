import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import {
    DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import { styles } from '../AllStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../assets/colors'
import { useRecoilState } from 'recoil'
import { avatarAtom } from '../atoms/avatarAtom'
import { realnameAtom } from '../atoms/realnameAtom';
import { Avatars } from '../assets/avatars'

function DrawerContent (props) {
const [avatar, setAvatar] = useRecoilState(avatarAtom)
const [realname, setRealname] = useRecoilState(realnameAtom)

const avatarSelector = picker => {
    return Avatars[picker]
}

    return(
        <View style={styles.drawer_main_bg}>
            <View style={styles.drawer_top_container}>
                <View style={styles.avatar_container}>
                    <Image source={avatarSelector(avatar)} resizeMode='contain' style={{height:110, width:110}}/>
                </View>
                <View style={{paddingTop:20}}>
                        <Text style={{color:'black'}}>{realname}</Text>
                </View>
            </View>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainerStyle}>
            <View>
            <DrawerItem 
            label='Главная'
            icon={() => <AntDesign name='home' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={{color:COLORS.dark, fontSize:15}}
            />
            <DrawerItem 
            label='Мои посты'
            icon={() => <AntDesign name='user' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('DirectScreen')}
            labelStyle={{color:COLORS.dark, fontSize:15}}
            />
            <DrawerItem 
            label='Фавориты'
            icon={() => <AntDesign name='hearto' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('ProfileScreen')}
            labelStyle={{color:COLORS.dark, fontSize:15}}
            />
            <DrawerItem 
            label='Уведомления'
            icon={() => <AntDesign name='notification' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('Forum')}
            labelStyle={{color:COLORS.dark, fontSize:15}}
            />
            </View>
        </DrawerContentScrollView>
        <View style={styles.drawer_bottom_container}>
        <AntDesign name='setting' size={30} color={COLORS.dark}/>
        <AntDesign name='logout' size={28} color={COLORS.dark}/>
        </View>
        </View>
    )
}

export default DrawerContent