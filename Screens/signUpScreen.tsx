import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../AllStyles';
import {COLORS} from '../assets/colors';
import Icon from 'react-native-vector-icons/Entypo';
import {links} from '../Components/links';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {avatarAtom} from '../atoms/avatarAtom';
import {realnameAtom} from '../atoms/realnameAtom';
import {numberAtom} from '../atoms/numberAtom';
import {emailAtom} from '../atoms/emailAtom';
import IntlPhoneField from 'react-native-intl-phone-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import HideKeyboard from '../Components/HideKeyboard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParams} from '../Navigation/AppStack';

type Props = NativeStackScreenProps<StackParams>;

const SignUpScreen = ({route, navigation}: Props) => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useRecoilState(avatarAtom);
  const [realname, setRealname] = useRecoilState(realnameAtom);
  const [number, setNumber] = useRecoilState(numberAtom);
  const [emailUser, setEmailUser] = useRecoilState(emailAtom);
  const [securePass, setSecurePass] = useState(true);
  const [eyeState, setEyeState] = useState('eye-with-line');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [mobValid, setMobValid] = useState<boolean>(false);
  const {url, id} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert(
        'Важно!',
        'Пожалуйста впишите номер, который подвязан к вашему Telegram или WhatsApp. Это необходимо для связи с другими пользователями.',
        [
          {
            text: 'Понятно',
            style: 'default',
          },
        ],
      );
    }, []),
  );

  function passwordState() {
    setSecurePass(!securePass);
    setEyeState(eyeState === 'eye-with-line' ? 'eye' : 'eye-with-line');
  }

  function validation() {
    if (username && email && password && mobValid) {
      sendDetails();
    } else {
      setLoading(false);
      console.log('NOT GETTING PARAMS', url, id);
      Alert.alert(
        'Внимание!',
        'Вы оставили одно или несколько из полей пустыми',
        [
          {
            text: 'Вернуться',
            style: 'default',
          },
        ],
      );
    }
  }

  async function sendDetails() {
    try {
      const result = await axios.post(`${links.SIGN_UP}`, {
        username: username,
        email: email,
        password: password,
        mobile: mobile,
        avatar: id,
      });
      await AsyncStorage.setItem('jwt', result.data);
      await AsyncStorage.setItem('email', email);
      setAvatar(id);
      setRealname(username);
      setNumber(mobile);
      setEmailUser(email);
      setLoading(false);
      navigation.navigate('Drawer', {Screen: 'AppTab'});
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Внимание', error.response.data, [
        {
          text: 'Понятно',
          style: 'default',
        },
      ]);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={[
          {flex: 1, backgroundColor: COLORS.dark},
          loading && {opacity: 0.2},
        ]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loader}>
          <ActivityIndicator animating={loading} size="large" color="#4B4F40" />
        </View>
        <HideKeyboard>
          <View
            style={[
              styles.background_container,
              {backgroundColor: COLORS.dark},
            ]}>
            <View style={styles.signUp_top_container}>
              <View style={styles.signUp_text_container}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{fontSize: 30, color: 'white'}}>
                    Регистрация
                  </Text>
                </View>
                <Text style={{flex: 0.8, color: 'white', fontSize: 15}}>
                  Давайте создадим Вам аккаунт
                </Text>
              </View>
              <View style={styles.signUp_avatart_container}>
                <Image
                  source={url}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                  }}
                />
              </View>
            </View>
            <View style={styles.signUp_bottom_container}>
              <View style={{flex: 0.15}}></View>
              <View style={styles.signUp_allTextinputs_container}>
                <View style={styles.signUp_textinput_container}>
                  <TextInput
                    style={styles.signUp_textinput}
                    onChangeText={text => setUsername(text)}></TextInput>
                  <Text style={styles.signUp_textinput_text}>Полное имя</Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                  <TextInput
                    style={styles.signUp_textinput}
                    autoComplete="email"
                    keyboardType="email-address"
                    onChangeText={text =>
                      setEmail(text.toLowerCase())
                    }></TextInput>
                  <Text style={[styles.signUp_textinput_text, {width: 120}]}>
                    Почтовый ящик
                  </Text>
                </View>

                <View style={styles.signUp_textinput_container}>
                  <TextInput
                    style={styles.signUp_textinput}
                    secureTextEntry={securePass}
                    onChangeText={text => setPassword(text)}></TextInput>
                  <View style={styles.passwordIcon_container}>
                    <Icon
                      name={eyeState}
                      size={30}
                      onPress={() => passwordState()}
                    />
                  </View>
                  <Text style={[styles.signUp_textinput_text, {width: 60}]}>
                    Пароль
                  </Text>
                </View>

                <View
                  style={[
                    styles.signUp_textinput_container,
                    {overflow: 'hidden'},
                  ]}>
                  <IntlPhoneField
                    onEndEditing={(result: any) => console.log(result)}
                    onValidation={(isValid: boolean) => setMobValid(isValid)}
                    onValueUpdate={(value: string) => {
                      setMobile(value);
                    }}
                    defaultCountry="AZ"
                    defaultPrefix="+994"
                    defaultFlag="🇦🇿"
                    containerStyle={{paddingHorizontal: 20, height: '100%'}}
                    textInputStyle={{fontSize: 20, textAlign: 'center'}}
                  />
                </View>
              </View>
              <View style={styles.signUp_button_container}>
                <TouchableOpacity
                  style={styles.signUp_button}
                  onPress={() => {
                    setLoading(true);
                    validation();
                  }}>
                  <Text
                    style={{textAlign: 'center', fontSize: 17, color: 'white'}}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </HideKeyboard>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
