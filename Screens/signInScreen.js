import React, {useState} from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
    Keyboard,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../AllStyles'
import { COLORS } from '../assets/colors'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import axios from 'axios'
import {SIGN_IN} from '@env'
import { useRecoilState } from 'recoil'
import { emailAtom } from '../atoms/emailAtom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/Entypo'

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

const HideKeyboard = ({children}) => {
    return(
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
    )
}

function SignInScreen ({navigation}) {
    const [emailUser, setEmailUser] = useRecoilState(emailAtom)
    const [loading, setLoading] = useState(false)
    const [securePass, setSecurePass] = useState(true)
    const [eyeState, setEyeState] = useState('eye-with-line')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function validation() {
        if(email && password) {
            sendDetails()
        } else {
            setLoading(false)
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
            await AsyncStorage.setItem('email', email)
            setEmailUser(email)
            setLoading(false)
            navigation.navigate('Drawer', {Screen: 'AppTab'})
        } catch(err) {
            setLoading(false)
            alert(err.response.data)
        }
    }

    function passwordState() {
        setSecurePass(!securePass)
        setEyeState(eyeState === 'eye-with-line' ? 'eye' : 'eye-with-line')
    }
    return(
        <HideKeyboard>
        <KeyboardAwareScrollView 
            keyboardShouldPersistTaps='always'
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex:1}}>
            <FocusAwareStatusBar backgroundColor={COLORS.dark} barStyle='light-content'/>
            <View style={styles.loader}>
            <ActivityIndicator
            animating={loading}
            size='large'
            color='#4B4F40'
            />
            </View>
            <View style={[styles.background_container, { backgroundColor:COLORS.dark} ]}>
            <View style={styles.signIn_top_container}>
                <View style={styles.signIn_top_text_container}>
            <Text style={{fontSize:32, color:COLORS.bej}}>Войти</Text>
            <Text style={{fontSize:17, color:COLORS.bej}}>Мы рады видеть Вас снова</Text>
                </View>
                <View style={styles.singIn_top_image_container}>
            <Image  source={require('../assets/2.jpg')} resizeMode='contain' style={styles.signIn_top_image}/>
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
                    onPress={() => {
                        setLoading(true)
                        validation()
                    }}>
                        <Text style={{textAlign:'center', fontSize:17, color:COLORS.bej}}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </KeyboardAwareScrollView>
        </HideKeyboard>
    )
}

export default SignInScreen