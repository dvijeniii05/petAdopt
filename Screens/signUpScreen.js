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
import { styles } from '../AllStyles'
import { COLORS } from '../assets/colors'
import Icon from 'react-native-vector-icons/Entypo'

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
  );

function SignUpScreen ({navigation}) {
    const [securePass, setSecurePass] = useState(true)
    const [eyeState, setEyeState] = useState('eye-with-line')

    function passwordState() {
        setSecurePass(!securePass)
        setEyeState(eyeState === 'eye-with-line' ? 'eye' : 'eye-with-line')
    }

    return(
        <HideKeyboard>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1}}>
            <View  style={[styles.background_container, {backgroundColor:COLORS.darkGreen}]}>
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
                <TextInput style={styles.signUp_textinput}>
                </TextInput>
                <Text style={styles.signUp_textinput_text}>Полное имя</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} autoComplete='email'>
                </TextInput>
                <Text style={[styles.signUp_textinput_text, {width:120}]}>Почтовый ящик</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} secureTextEntry={securePass}>
                
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
                    onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={{textAlign:'center', fontSize:15, color:'white'}}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            </KeyboardAvoidingView>
        </HideKeyboard>
    )
}

export default SignUpScreen
