import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default function useKeyBoardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const keboardWillAndroidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keboardWillAndroidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );
    const keboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    return () => {
      keboardWillAndroidShowListener.remove();
      keboardWillAndroidHideListener.remove();
      keboardWillShowListener.remove();
      keboardWillHideListener.remove();
    };
  }, []);
  return keyboardOffsetHeight;
}
