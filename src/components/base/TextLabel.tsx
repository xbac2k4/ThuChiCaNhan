import { colors, fontSizes } from '../../constants/theme';
import { StyleSheet, TextStyle } from 'react-native';
import Block from './Block';
import Text from './Text';
import { ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';

type TextLabelType = {
  title: string;
  text?: string;
  children?: ReactNode;
  textStyle?: TextStyle;
};

const TextLabel = ({ title, text, children, textStyle }: TextLabelType) => {
  return (
    <Block p={10}>
      <Text style={styles.textTitle}>{title}</Text>
      <Block p={5} borderBottom>
        {typeof text === 'string' && text ? (
          <Text
            style={{
              fontSize: fontSizes.FONT_14,
              fontWeight: '700',
              ...textStyle,
            }}>
            {text || ' '}
          </Text>
        ) : children ? (
          children
        ) : (
          <Text> </Text>
        )}
      </Block>
    </Block>
  );
};

export default memo(TextLabel, isEqual);

const styles = StyleSheet.create({
  textTitle: {
    color: colors.PRIMARY,
    fontSize: fontSizes.FONT_18,
    fontWeight: '400',
  },
});
