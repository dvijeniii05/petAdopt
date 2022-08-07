import React, { PropsWithChildren } from 'react'
import {
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

const HideKeyboard = ({children} : PropsWithChildren) => (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
  );

  export default HideKeyboard