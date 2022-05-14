
import React, {useState, useEffect} from 'react'
import {
    Modal,
    Text,
    Image,
    View,
    TouchableOpacity,
    Linking
} from 'react-native'
import {styles} from '../AllStyles'
import { COLORS } from '../assets/colors'

export default function ModalPopUp ({visible, children, number}) {
    const[show, setShow] = useState(false)
    useEffect(() => {
        toggleModal()
    }, [visible])
    function toggleModal() {
        if(visible) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    return(
        <Modal 
        animationType='slide'
        transparent={true} 
        visible={show}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                <View style={{flex:1, justifyContent:'flex-end',}}>
                    <Text style={{textAlign:'center', fontSize:18, color:COLORS.dark}}>Выберите один из методов общения:</Text>
                </View>
                <View style={{flex:2, width:'100%', justifyContent:'space-evenly', alignItems:'center'}}>
                    <TouchableOpacity 
                    onPress={() => Linking.openURL(`https://t.me/+447598022428`)}
                    style={{width:'70%', height:50, backgroundColor:'#0088cc',justifyContent:'center', flexDirection:'row', borderRadius:30, borderWidth:2, borderColor:COLORS.dark}}>
                        <View style={{flex:2, justifyContent:'center', paddingRight:15}}>
                            <Text style={{textAlign:'right', fontSize:19, color:'#181818', fontWeight:'600'}}>Telegram</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Image source={require('../assets/telegram.png')} resizeMode='contain' style={{height:'80%', width:'60%'}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => Linking.openURL(`https://wa.me/+447598022428`)}
                    style={{width:'70%', height:50, backgroundColor:'#6cc751',justifyContent:'center', flexDirection:'row', borderRadius:30,borderWidth:2, borderColor:COLORS.dark}}>
                        <View style={{flex:2, justifyContent:'center', paddingRight:15}}>
                            <Text style={{textAlign:'right', fontSize:19, color:'#181818', fontWeight:'600'}}>Whatsapp</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Image source={require('../assets/whatsapp.png')} resizeMode='contain' style={{height:'80%', width:'60%'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={{position:'absolute', right:5, top: 0}}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
