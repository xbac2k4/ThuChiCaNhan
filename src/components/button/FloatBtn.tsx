import Block from 'components/base/Block';
import Button from 'components/base/Button';
import {stylesCustom} from 'constants/styleCustom';
import {colors} from 'constants/theme';
import React, {memo, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Keyboard, ViewStyle} from 'react-native';

type FloatingButton = {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
};

const FloatBtn = ({onPress, title, containerStyle}: FloatingButton) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  if (isKeyboardVisible) {
    return <></>;
  }
  return (
    <Block style={[stylesCustom.floatButton, containerStyle]}>
      <Button
        styleBtn={{
          borderRadius: 5,
          backgroundColor: colors.SECONDARY,
        }}
        textStyle={{
          color: colors.WHITE,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        name={title}
        onPress={onPress}
      />
    </Block>
  );
};
export default memo(FloatBtn, isEqual);
