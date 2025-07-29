import isEqual from 'react-fast-compare';
import Block from './Block';
import Text from './Text';
import { memo } from 'react';
import { colors, fontSizes } from 'constants/theme';
import { TextStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ButtonType = {
  onPress?: () => void;
  name: string;
  styleBtn?: ViewStyle;
  textStyle?: TextStyle;
  shadow?: boolean;
  linearColors?: string[];
  colorText?: string;
};

const Button: React.FC<ButtonType> = ({
  onPress,
  name,
  styleBtn,
  textStyle,
  shadow,
  linearColors,
  colorText,
}) => {
  if (linearColors) {
    const bgColor = styleBtn?.backgroundColor
      ? styleBtn?.backgroundColor.toString()
      : colors.SECONDARY;
    return (
      <LinearGradient
        colors={linearColors ? linearColors : [bgColor, bgColor]}
        onTouchStart={() => onPress && onPress()}
        style={{
          flex: 1,
          ...styleBtn,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Block flex={1} center middle>
          <Text
            style={{
              color: colors.WHITE,
              textTransform: 'uppercase',
              fontSize: fontSizes.FONT_16,
              fontWeight: 'bold',
              ...textStyle,
            }}>
            {name}
          </Text>
        </Block>
      </LinearGradient>
    );
  }
  return (
    <Block
      shadow
      center
      middle
      style={{ backgroundColor: colors.PRIBTNYELLOW, ...styleBtn }}
      onPress={onPress}
      p={10}
    >
      <Text
        style={{
          color: colorText ? colorText : colors.PRIMARY,
          textTransform: 'uppercase',
          fontSize: fontSizes.FONT_16,
          fontWeight: 'bold',
          ...textStyle,
        }}>
        {name}
      </Text>
    </Block>
  );
};

export default memo(Button, isEqual);
