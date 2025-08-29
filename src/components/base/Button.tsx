import isEqual from 'react-fast-compare';
import Block from './Block';
import Text from './Text';
import { memo } from 'react';
import { colors, fontSizes } from 'constants/theme';
import { TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
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
  if (linearColors && linearColors.length > 0) {
    const bgColor = styleBtn?.backgroundColor
      ? styleBtn?.backgroundColor.toString()
      : colors.SECONDARY;

    return (
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={onPress}>
        <LinearGradient
          colors={linearColors ?? [bgColor, bgColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            ...styleBtn,
          }}>
          <Text
            style={{
              color: colorText ?? colors.WHITE,
              textTransform: 'uppercase',
              fontSize: fontSizes.FONT_16,
              fontWeight: 'bold',
              ...textStyle,
            }}>
            {name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <Block
      center
      borderAll
      middle
      style={{ backgroundColor: colors.PRIBTNYELLOW, ...styleBtn }}
      onPress={onPress}
      p={10}>
      <Text
        style={{
          color: colorText ?? colors.PRIMARY,
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
