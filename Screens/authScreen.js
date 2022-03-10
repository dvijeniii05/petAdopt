import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    StatusBar,
    Touchable
} from 'react-native'
import {styles} from '../AllStyles'
import { COLORS } from '../assets/colors';

function AuthScreen ({navigation}) {
    return (
    <View style={styles.background_container}>
    <StatusBar backgroundColor={COLORS.background} hidden={true}/>
        <View style={styles.auth_logo_container}>
            <Image source={require('../assets/auth_logo.jpg')} style={styles.auth_logo}/>
        </View>
        <View style={styles.auth_text_container}>
        <Text style={{flex:2,fontSize:25, textAlign:'center'}}>Добро пожаловать в petAdopt</Text>
        <Text style={{flex:1.8,fontSize:12, textAlign:'center'}}>Пожалуйста пройдите регистрацию либо произведите вход в уже существующий аккаунт</Text>
        </View>
        <View style={styles.auth_buttons_container}>
            <TouchableOpacity 
            style={styles.sign_up}
            onPress={() => navigation.navigate('SignUpScreen')}
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