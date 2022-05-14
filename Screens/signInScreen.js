import React, {useState} from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../AllStyles'
import { COLORS } from '../assets/colors'
import axios from 'axios'
import {SIGN_IN} from '@env'

import Icon from 'react-native-vector-icons/Entypo'

const HideKeyboard = ({children}) => {
    return(
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
    )
}

function SignInScreen ({navigation}) {
    const [securePass, setSecurePass] = useState(true)
    const [eyeState, setEyeState] = useState('eye-with-line')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function validation() {
        if(email && password) {
            sendDetails()
        } else {
            alert('Пожалуйста заполните все поля')
        }
    }

    async function sendDetails () {
        try {
            const result = await axios.post(`${SIGN_IN}`, {
                email: email,
                password: password
            })
            await AsyncStorage.setItem('jwt', result.data)
            navigation.navigate('AppTab')
        } catch(err) {
            alert(err.response.data)
        }
    }

    function passwordState() {
        setSecurePass(!securePass)
        setEyeState(eyeState === 'eye-with-line' ? 'eye' : 'eye-with-line')
    }
    return(
        <HideKeyboard>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{flex:1}}>
            <View style={[styles.background_container, {backgroundColor:COLORS.dark}]}>
            <View style={styles.signIn_top_container}>
                <View style={styles.signIn_top_text_container}>
            <Text style={{fontSize:32, color:COLORS.bej}}>Войти</Text>
            <Text style={{fontSize:17, color:COLORS.bej}}>Мы рады видеть Вас снова</Text>
                </View>
                <View style={styles.singIn_top_image_container}>
            <Image  source={require('../assets/cat_walking.webp')} resizeMode='contain' style={styles.signIn_top_image}/>
                </View>
            </View>
            <View style={styles.signIn_bottom_container}>
            <View style={styles.signUp_allTextinputs_container}>
                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} autoComplete='email' onChangeText={(text) => setEmail(text.toLowerCase())}>
                </TextInput>
                <Text style={[styles.signUp_textinput_text, {width:120}]}>Почтовый ящик</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} secureTextEntry={securePass} onChangeText={(text) => setPassword(text)}>
                
                </TextInput>
                <View style={styles.passwordIcon_container}>
                <Icon name={eyeState} size={30} onPress={() => passwordState()}/>
                </View>
                <Text style={[styles.signUp_textinput_text, {width:60}]}>Пароль</Text>
                </View>
            </View>
            <View style={styles.signUp_button_container}>
                    <TouchableOpacity 
                    style={styles.signUp_button}
                    onPress={() => validation()}>
                        <Text style={{textAlign:'center', fontSize:17, color:COLORS.bej}}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </KeyboardAvoidingView>
        </HideKeyboard>
    )
}

export default SignInScreen