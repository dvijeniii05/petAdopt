import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../AllStyles'
import { COLORS } from '../assets/colors';
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'

function AuthScreen ({navigation}) {
    return (

    <View style={styles.background_container}>
        <FocusAwareStatusBar backgroundColor={COLORS.bej} barStyle='dark-content'/>
        <View style={styles.auth_logo_container}>
            <Image source={require('../assets/1.jpg')} style={styles.auth_logo} />
        </View>
        <View style={styles.auth_text_container}>
        <Text style={{flex:2, fontSize:25, textAlign:'center', color:COLORS.dark}}>Добро пожаловать в Pet Me</Text>
        <Text style={{flex:1.8, fontSize:12, textAlign:'center',color:COLORS.dark}}>Пожалуйста пройдите регистрацию либо произведите вход в уже существующий аккаунт</Text>
        </View>
        <View style={styles.auth_buttons_container}>
            <TouchableOpacity 
            style={styles.sign_up}
            onPress={() => navigation.navigate('AvatarPick')}
            >
                <Text style={styles.sing_up_text}>Регистрация</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.sign_in}
            onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={styles.sign_in_text}>Войти</Text>
            </TouchableOpacity>
        </View>
        
    </View>
    
    )
}

export default AuthScreen