/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import AppDrawer from './Navigation/AppStack';
import { RecoilRoot } from 'recoil'
import NetInfo, {useNetInfo} from '@react-native-community/netinfo'
import { styles } from './AllStyles'
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'


const PERSISTENCE_KEY = 'NAVIGATION_STATE';

function App () {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  const [offline, setOffline] = useState(true)

   useEffect(() => {
     netInfo()
     restore()

     if(!isReady) {
       restore()
     }
   }, [isReady])

   function netInfo() {
    const infoSub = NetInfo.addEventListener((state) => {
      setOffline(!state.isConnected)
     })
     return () => infoSub()
   }

   async function restore() {
    try {

      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const state = savedStateString ? JSON.parse(savedStateString) : undefined;
      
      if (state !== undefined) {
        setInitialState(state);
        setTimeout(() => {SplashScreen.hide()}, 2000)
      }

    } finally {
      setIsReady(true);
      setTimeout(() => {SplashScreen.hide()}, 2000)
    }
   }

   function reload() {
    NetInfo.fetch().then(state => {
      setOffline(!state.isConnected)
      console.log(state.isConnected)
    });
   }

   const NoInternetModal = ({show}) => {
     return(
       <Modal visible={show} transparent={true}>
          <View style={styles.internet_modal_bg}>
            <View style={styles.internet_modal_container}>
              <View style={styles.internet_text_container}>
                <Text style={styles.internet_title}>Проблема сети</Text>
                <Text style={styles.internet_text}>Уупс! Похоже у вас пропала свзять с интернетом</Text>
              </View>
              <View style={styles.internet_button_container}>
                <TouchableOpacity style={styles.internet_button} onPress={reload}>
                  <Text style={styles.internet_button_text}>Попробовать еще раз</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
       </Modal>
     )
   }

   if (!isReady) {
    return null;
  }

  return (
    <RecoilRoot>
    <SafeAreaView style={[{flex:1}, offline && {opacity: 0.3}]}>
      <NoInternetModal show={offline}/>
    <NavigationContainer
    initialState={initialState}
    onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      <AppDrawer/>
    </NavigationContainer>
    </SafeAreaView>
    </RecoilRoot>
  )
}
export default App;
