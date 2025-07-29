import { BtnType } from '../../common/type';
import Block from '../../components/base/Block';
import IconMT from '../../components/icon/IconMT';
import { colors } from '../../constants/theme';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

const FloatCircleBtn = ({ onPress, bgColor, iconName, iconColor }: BtnType) => {
  return (
    <Block
      onPress={() => onPress()}
      shadow
      mb={10}
      borderAll
      style={{ backgroundColor: bgColor ? bgColor : colors.SECONDARY }}
      borderRadius={30}>
      <Block flex={1} center middle p={10}>
        <IconMT
          name={iconName ? iconName : 'push'}
          size={40}
          color={iconColor ? iconColor : colors.WHITE}
        />
      </Block>
    </Block>
  );
};

export default memo(FloatCircleBtn, isEqual);
