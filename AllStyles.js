import React from 'react';
import {StatusBar} from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from './assets/colors';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

function heighInclStatBar() {
  return HEIGHT - StatusBar.currentHeight;
}

const styles = StyleSheet.create({
  background_container: {
    height: heighInclStatBar(),
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bej,
  },
  bg_auth_container: {
    height: '100%',
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bej,
  },
  auth_logo: {
    width: 300,
    height: 323.5,
  },
  auth_logo_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2.5,
    width: WIDTH,
  },
  auth_text_container: {
    flex: 0.8,
    width: WIDTH,
    paddingHorizontal: 10,
  },
  auth_buttons_container: {
    flex: 1.2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  sign_up: {
    width: 0.7 * WIDTH,
    height: 50,
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    justifyContent: 'center',
  },
  sing_up_text: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  sign_in: {
    width: 0.7 * WIDTH,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: COLORS.dark,
    borderRadius: 10,
    justifyContent: 'center',
  },
  sign_in_text: {
    color: COLORS.dark,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUp_top_container: {
    flex: 1,
    flexDirection: 'row',
  },
  signUp_text_container: {
    flex: 7,
    width: 300,
    alignItems: 'center',
  },
  signUp_avatart_container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp_bottom_container: {
    flex: 4,
    backgroundColor: COLORS.bej,
    width: WIDTH,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  signUp_allTextinputs_container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 3,
    width: WIDTH,
  },
  signUp_textinput: {
    flex: 1,
    zIndex: 2,
    left: 30,
    width: 0.8 * WIDTH - 40,
    fontSize: 20,
    color: COLORS.dark,
  },
  signUp_textinput_container: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.dark,
    width: 0.8 * WIDTH,
    height: 0.07 * HEIGHT,
    justifyContent: 'center',
  },
  signUp_textinput_text: {
    backgroundColor: COLORS.bej,
    color: COLORS.darkGreen,
    position: 'absolute',
    zIndex: 3,
    textAlign: 'center',
    left: 20,
    top: -12,
    width: 90,
  },
  signUp_button_container: {
    flex: 1,
    width: WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  signUp_button: {
    borderRadius: 10,
    width: 0.8 * WIDTH,
    height: 0.08 * HEIGHT,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
  },
  passwordIcon_container: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    zIndex: 2,
  },
  signIn_top_container: {
    flex: 1,
    width: WIDTH,
  },
  signIn_top_text_container: {
    flex: 1,
    paddingLeft: WIDTH * 0.1,
    justifyContent: 'center',
  },
  singIn_top_image_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signIn_top_image: {
    width: 0.3 * WIDTH,
    height: '100%',
    right: 0.1 * WIDTH,
    borderRadius: 50,
  },
  signIn_top_image2: {
    width: 0.4 * WIDTH,
    height: '100%',
  },
  signIn_bottom_container: {
    flex: 1.3,
    width: WIDTH,
    backgroundColor: COLORS.bej,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  home: {
    flex: 1,
    backgroundColor: COLORS.bej,
  },
  home_top_container: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  home_bottom_container: {
    flex: 8,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  home_icon_container: {
    flex: 1,
    justifyContent: 'center',
    height: '70%',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  home_search_container: {
    flex: 7,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
    paddingRight: 0.1 * WIDTH,
  },
  home_search_bar: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
    borderRadius: 10,
    zIndex: 2,
    fontSize: 20,
    color: 'white',
    paddingLeft: 40,
    height: '80%',
  },
  search_icon: {
    flex: 1,
    zIndex: 3,
    position: 'absolute',
    left: 20,
  },
  home_middle_container: {
    flex: 0.8,
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_category_container: {
    width: 0.35 * WIDTH,
    alignItems: 'center',
    marginVertical: 8,
  },
  home_category_pick: {
    backgroundColor: COLORS.dark,
    width: '45%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 7,
  },
  category_image: {
    height: '100%',
    flex: 1,
    tintColor: 'white',
  },
  item_container: {
    height: 0.25 * HEIGHT,
    width: 160,
    backgroundColor: COLORS.dark,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  item_image_container: {
    flex: 1.6,
    alignItems: 'center',
  },
  item_image: {
    width: '100%',
    height: '100%',
  },
  item_text_container: {
    flex: 1,
    paddingHorizontal: 0.03 * WIDTH,
    justifyContent: 'center',
  },
  drawer_main_bg: {
    flex: 1,
    backgroundColor: COLORS.bej,
  },
  drawer_top_container: {
    height: 0.21 * HEIGHT,
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  contentContainerStyle: {
    paddingTop: 10,
  },
  drawer_bottom_container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  post_top_container: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  post_create_middle_container: {
    width: WIDTH,
    height: HEIGHT,
  },
  post_middle_container: {
    flex: 1,
  },
  post_create_image_container: {
    flex: 1.5,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post_image_container: {
    flex: 1,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post_image: {
    flex: 1,
    width: '100%',
  },
  post_info_container: {
    flex: 2,
    width: WIDTH,
  },
  post_category_container: {
    flex: 1.9,
    zIndex: 3,
  },
  post_category_one_container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post_category_one: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  post_category_one_view: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  post_category_text_container_view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  post_category_text_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  post_category_text: {
    left: 10,
    fontSize: 18,
    color: COLORS.dark,
  },
  post_text_container: {
    flex: 2.4,
    paddingHorizontal: 15,
    paddingVertical: 7,
    zIndex: 2,
  },
  post_text_scroll: {
    flex: 1,
  },
  post_create_button_container: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post_create_button: {
    width: 0.4 * WIDTH,
    backgroundColor: COLORS.dark,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  post_bottom_container: {
    height: 0.08 * HEIGHT,
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  post_like_button: {
    position: 'absolute',
    right: 20,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  post_delete_button: {
    position: 'absolute',
    height: '100%',
    left: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post_buttons: {
    width: 0.5 * WIDTH,
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
  },
  post_buttons_text: {
    fontSize: 20,
    color: COLORS.bej,
  },
  post_category_textinput: {
    width: '60%',
    height: 35,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 0,
    paddingVertical: 0,
  },
  post_textinput_container: {
    width: WIDTH,
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center',
  },
  add_pic_button: {
    width: 0.2 * WIDTH,
    height: 0.2 * WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_post_background: {
    flex: 1,
    backgroundColor: COLORS.bej,
  },
  post_top_buttons: {
    width: 0.15 * WIDTH,
    height: '80%',
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  pick_category_image: {
    flex: 1,
    height: '80%',
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 0.7 * WIDTH,
    height: 0.4 * HEIGHT,
    backgroundColor: COLORS.bej,
    borderRadius: 40,
    borderColor: COLORS.dark,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_pick_main_container: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
  },
  avatar_text: {
    flex: 1,
    fontSize: 25,
    color: COLORS.dark,
    textAlignVertical: 'center',
  },
  avatar_inner_container: {
    flex: 9,
    alignItems: 'center',
  },
  avatar_flatlist_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    margin: 20,
    borderRadius: 20,
  },
  avatar_container: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 30,
  },
  internet_modal_bg: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  internet_modal_container: {
    width: WIDTH,
    height: 170,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  internet_text_container: {
    flex: 1.5,
  },
  internet_title: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: COLORS.dark,
    fontWeight: 'bold',
  },
  internet_text: {
    flex: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,

    color: COLORS.dark,
  },
  internet_button_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internet_button: {
    width: '85%',
    height: '85%',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    justifyContent: 'center',
  },
  internet_button_text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  donation_title: {
    fontSize: 20,
  },
  donation_item_parent: {
    marginBottom: 50,
    width: WIDTH,
    alignItems: 'center',
  },
  donation_item_name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  donation_item_img: {
    height: WIDTH * 0.8,
    width: WIDTH * 0.8,
    marginBottom: 15,
  },
  donation_item_desc: {
    width: WIDTH * 0.9,
    fontSize: 16,
    marginBottom: 10,
  },
  donation_item_button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: COLORS.dark,
    borderRadius: 15,
  },
  donation_item_link: {
    color: COLORS.bej,
    fontSize: 16,
  },
});

export {styles};
