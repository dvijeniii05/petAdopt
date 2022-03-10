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
            icon={() => <AntDesign name='home' size={22}/>}
            onPress={() => props.navigation.navigate('Home')}
            activeTintColor='green'
            activeBackgroundColor='blue'
            />
            <DrawerItem 
            label='Профиль'
            icon={() => <AntDesign name='user' size={22}/>}
            onPress={() => props.navigation.navigate('DirectScreen')}
            activeTintColor='green'
            activeBackgroundColor='blue'
            />
            <DrawerItem 
            label='Сообщения'
            icon={() => <AntDesign name='mail' size={22}/>}
            onPress={() => props.navigation.navigate('ProfileScreen')}
            />
            <DrawerItem 
            label='Уведомления'
            icon={() => <AntDesign name='notification' size={22}/>}
            onPress={() => props.navigation.navigate('NotificationsScreen')}
            />
            </View>
        </DrawerContentScrollView>
        <View style={styles.drawer_bottom_container}>
        <AntDesign name='setting' size={30} color='black'/>
        <AntDesign name='logout' size={28} color='black'/>
        </View>
        </View>
    )
}

export default DrawerContent