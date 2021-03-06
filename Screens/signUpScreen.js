import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Image,
    ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../AllStyles'
import { COLORS } from '../assets/colors'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import Icon from 'react-native-vector-icons/Entypo'
import { links } from '../Components/links'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { avatarAtom } from '../atoms/avatarAtom';
import { realnameAtom } from '../atoms/realnameAtom';
import { numberAtom } from '../atoms/numberAtom';
import { emailAtom } from '../atoms/emailAtom';
import IntlPhoneField from 'react-native-intl-phone-field'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
  );

function SignUpScreen ({route, navigation}) {
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useRecoilState(avatarAtom)
    const [realname, setRealname] = useRecoilState(realnameAtom)
    const [number, setNumber] = useRecoilState(numberAtom)
    const [emailUser, setEmailUser] = useRecoilState(emailAtom)
    const [securePass, setSecurePass] = useState(true)
    const [eyeState, setEyeState] = useState('eye-with-line')
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [mobValid, setMobValid] = useState(false)
    const {url, id} = route.params

    function passwordState() {
        setSecurePass(!securePass)
        setEyeState(eyeState === 'eye-with-line' ? 'eye' : 'eye-with-line')
    }

    function validation() {
        console.log(username, email, password)
        if(username && email && password && mobValid) {
            sendDetails()
        } else {
            setLoading(false)
            alert('???? ???????????????? ???????? ?????? ?????????????????? ???? ?????????? ??????????????')
        }
    }

    async function sendDetails () {
        try {
            const result = await axios.post(`${links.SIGN_UP}`, {
                username: username,
                email: email,
                password: password,
                mobile: mobile,
                avatar: id
            })
            console.log(result.data)
            const token = AsyncStorage.setItem('jwt', result.data)
            setAvatar(url)
            setRealname(username)
            setNumber(mobile)
            setEmailUser(email)
            console.log(token)
            setLoading(false)
            navigation.navigate('Drawer', {Screen: 'AppTab'})
        } catch(error) {
            setLoading(false)
            alert(error.response.data)
        }
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
            <View  style={[styles.background_container, {backgroundColor:COLORS.dark}]}>
                <View style={styles.signUp_top_container}>
                    <View style={styles.signUp_text_container}>
                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'flex-end'}}>
                            <Text style={{fontSize: 30, color:'white' }}>??????????????????????</Text>
                        </View>
                        <Text style={{flex:0.8, color:'white', fontSize:15}}>?????????????? ???????????????? ?????? ??????????????</Text>
                    </View>
                    <View style={styles.signUp_avatart_container}>
                        <Image source={url} style={{
                            width:100,
                            height:100,
                            resizeMode: 'cover',
                        }}/>
                    </View>
                </View>
            <View style={styles.signUp_bottom_container}>
                <View style={{flex:0.15}}></View>
                <View style={styles.signUp_allTextinputs_container}>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} onChangeText={(text) => setUsername(text)}>
                </TextInput>
                <Text style={styles.signUp_textinput_text}>???????????? ??????</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} autoComplete='email' keyboardType='email-address' onChangeText={(text) => setEmail(text.toLowerCase())}>
                </TextInput>
                <Text style={[styles.signUp_textinput_text, {width:120}]}>???????????????? ????????</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                <TextInput style={styles.signUp_textinput} secureTextEntry={securePass} onChangeText={(text) => setPassword(text)}>
                
                </TextInput>
                <View style={styles.passwordIcon_container}>
                <Icon name={eyeState} size={30} onPress={() => passwordState()}/>
                </View>
                <Text style={[styles.signUp_textinput_text, {width:60}]}>????????????</Text>
                </View>

                <View style={[styles.signUp_textinput_container, {overflow:'hidden'}]}>
                <IntlPhoneField
                onEndEditing={(result) => console.log(result)}
                onValidation={(isValid) => setMobValid(isValid)}
                onValueUpdate={(value) => {
                    setMobile(value)
                }}
                defaultCountry="AZ"
                defaultPrefix="+994"
                defaultFlag="????????"
                containerStyle={{ paddingHorizontal:20}}
                textInputStyle={{fontSize:20, textAlign:'center'}}
                />
                </View>

                </View>
                <View style={styles.signUp_button_container}>
                    <TouchableOpacity 
                    style={styles.signUp_button}
                    onPress={() => {
                        setLoading(true)
                        validation()
                    }}>
                        <Text style={{textAlign:'center', fontSize:17, color:'white'}}>????????????????????????????????????</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            </KeyboardAwareScrollView>
        </HideKeyboard>
    )
}

export default SignUpScreen
