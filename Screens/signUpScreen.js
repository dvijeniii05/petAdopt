import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../AllStyles'
import { COLORS } from '../assets/colors'
import Icon from 'react-native-vector-icons/Entypo'
import {SIGN_UP, ALL_POSTS} from '@env'
import axios from 'axios'

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
  );

function SignUpScreen ({navigation}) {
    const [securePass, setSecurePass] = useState(true)
    const [eyeState, setEyeState] = useState('eye-with-line')
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function passwordState() {
        setSecurePass(!securePass)
        setEyeState(eyeState === 'eye-with-line' ? 'eye' : 'eye-with-line')
    }

    function validation() {
        console.log(username, email, password)
        if(username && email && password) {
            sendDetails()
        } else {
            alert('Вы оставили одно или несколько из полей пустыми')
        }
    }

    async function sendDetails () {
        try {
            const result = await axios.post(`${SIGN_UP}`, {
                username: username,
                email: email,
                password: password
            })
            console.log(result.data)
            const token = AsyncStorage.setItem('jwt', result.data)
            console.log(token)
            navigation.navigate('AppTab')
        } catch(error) {
            alert(error.response.data)
        }
    }

    return(
        <HideKeyboard>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={{flex:1}}>
            <View  style={[styles.background_container, {backgroundColor:COLORS.dark}]}>
            <View style={styles.signUp_top_container}>
                <View style={{flex:1, alignItems:'flex-start', justifyContent:'flex-end',}}>
                <Text style={{fontSize: 30, color:'white' }}>Регистрация</Text>
                </View>
                <Text style={{flex:0.8, color:'white', fontSize:15}}>Давайте создадим Вам аккаунт</Text>
            </View>
            <View style={styles.signUp_bottom_container}>
                <View style={{flex:0.15}}></View>
                <View style={styles.signUp_allTextinputs_container}>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} onChangeText={(text) => setUsername(text)}>
                </TextInput>
                <Text style={styles.signUp_textinput_text}>Полное имя</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} autoComplete='email' keyboardType='email-address' onChangeText={(text) => setEmail(text.toLowerCase())}>
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
                        <Text style={{textAlign:'center', fontSize:17, color:'white'}}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            </KeyboardAvoidingView>
        </HideKeyboard>
    )
}

export default SignUpScreen
