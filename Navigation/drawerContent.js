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

function DrawerContent (props) {
    return(
        <View style={styles.drawer_main_bg}>
            <View style={styles.drawer_top_container}>
                <Image source={require('../assets/drawerImg.jpg')} resizeMode='contain' style={{height:100, width:100}}/>
                <View style={{paddingTop:20}}>
                    <Text>Элариз Нардаранский</Text>
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
            label='Профиль'
            icon={() => <AntDesign name='user' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('DirectScreen')}
            labelStyle={{color:COLORS.dark, fontSize:15}}
            />
            <DrawerItem 
            label='Сообщения'
            icon={() => <AntDesign name='mail' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('ProfileScreen')}
            labelStyle={{color:COLORS.dark, fontSize:15}}
            />
            <DrawerItem 
            label='Уведомления'
            icon={() => <AntDesign name='notification' size={22} color={COLORS.dark}/>}
            onPress={() => props.navigation.navigate('NotificationsScreen')}
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