import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar';
import {COLORS} from '../assets/colors';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {donationPages} from '../Components/donationPages';
import {styles} from '../AllStyles';

const DonationScreen = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.donation_item_parent}>
        <Text style={styles.donation_item_name}>{item.name}</Text>
        <Image
          source={item.img}
          resizeMode="stretch"
          style={styles.donation_item_img}
        />
        <Text style={styles.donation_item_desc}>{item.desc}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(item.link)}
          style={styles.donation_item_button}>
          <Text style={styles.donation_item_link}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bej}}>
      <FocusAwareStatusBar
        backgroundColor={COLORS.bej}
        barStyle="dark-content"
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.donation_title}>Фонды помощи!</Text>
        <FlatList
          data={donationPages}
          renderItem={renderItem}
          style={{marginTop: 30}}
        />
      </View>
    </SafeAreaView>
  );
};

export default DonationScreen;