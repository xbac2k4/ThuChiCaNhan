import Block from 'components/base/Block';
import Text from 'components/base/Text';
import IconMT from 'components/icon/IconMT';
import {colors, dimensions, fontSizes} from 'constants/theme';
import React, {ReactNode, memo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, TextStyle} from 'react-native';

type CardItemType = {
  title: string;
  content?: string | number;
  color?: string;
  textColor?: string;
  rTextStyle?: any;
  labelTextStyle?: any;
};

const CardInfoItem = memo(
  ({
    title,
    content,
    color,
    textColor,
    rTextStyle,
    labelTextStyle,
  }: CardItemType) => {
    return (
      <Block pv={5} ph={20} row borderColor={colors.PLACEHOLDER}>
        <Block center>
          <Text style={{...styles.textB, ...labelTextStyle}}>{title}</Text>
        </Block>
        <Block ph={5} borderRadius={5} row flex={1}>
          <Block flex={1} />
          {color ? (
            <Block
              width={120}
              borderRadius={5}
              middle
              center
              style={{backgroundColor: color}}>
              <Text
                style={{
                  fontSize: fontSizes.FONT_14,
                  fontWeight: '700',
                  color: colors.WHITE,
                  ...rTextStyle,
                }}>
                {content}
              </Text>
            </Block>
          ) : (
            <Text
              style={{
                fontSize: fontSizes.FONT_14,
                fontWeight: '700',
                color: textColor ?? colors.BLACK,
                ...rTextStyle,
              }}>
              {content}
            </Text>
          )}
        </Block>
      </Block>
    );
  },
  isEqual,
);

export default memo(CardInfoItem, isEqual);

export const FeildText = memo(({title, content}: CardItemType) => {
  return (
    <Block row pv={5} justifyBetween flex={1}>
      <Block>
        <Text>{title}: </Text>
      </Block>
      <Block ph={5} borderRadius={5} row flex={1}>
        <Text
          style={{
            fontSize: fontSizes.FONT_14,
            fontWeight: '700',
            color: colors.BLACK,
          }}>
          {content}
        </Text>
      </Block>
    </Block>
  );
}, isEqual);

type FeildInTextType = CardItemType & {
  icon: string;
  children?: ReactNode;
};

export const FeildInText = memo(
  ({content, color, icon, children}: FeildInTextType) => {
    return (
      <Block row pb={5} ph={5}>
        {icon ? (
          <Block pl={10} pr={20}>
            <IconMT name={icon} color={colors.BLACK} size={20} />
          </Block>
        ) : null}

        {children ? (
          children
        ) : (
          <Block pr={10} flex={1}>
            <Text style={{...styles.bold, color: color ? color : colors.BLACK}}>
              {content}
            </Text>
          </Block>
        )}
      </Block>
    );
  },
  isEqual,
);

type CardType = CardItemType & {onPress?: () => void};

export const CardItem = memo(({content, color, title, onPress}: CardType) => {
  return (
    <Block row center>
      <Block flex={1}>
        <Text style={{fontSize: fontSizes.FONT_16, color: color, fontWeight: 'bold'}}>{title}</Text>
      </Block>
      <Block flex={1} onPress={onPress}>
        <Text style={{...styles.bold, fontSize: fontSizes.FONT_16, fontWeight: 'normal'}}>
          {content}
        </Text>
      </Block>
    </Block>
  );
}, isEqual);

const styles = StyleSheet.create({
  textB: {
    color: colors.BLACK,
    fontSize: fontSizes.FONT_16,
    maxWidth: dimensions.SCREEN_WIDTH * 0.5,
    fontWeight: '500',
  },
  textA: {
    color: colors.BLACK,
    fontSize: fontSizes.FONT_16,
    fontWeight: '700',
  },
  bold: {
    fontSize: fontSizes.FONT_14,
    fontWeight: 'bold',
    // width: dimensions.SCREEN_WIDTH * 0.6,
  },
});
