import Icons from 'common/icons';
import { BtnType } from 'common/type';
import Block from 'components/base/Block';
import IconMT from 'components/icon/IconMT';
import { colors } from 'constants/theme';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native-ui-lib';

const FloatCircleBtn = ({ onPress, bgColor, iconName, iconColor }: BtnType) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor ? bgColor : colors.BG_GREEN2,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      }}
      onPress={() => onPress()}>
      <Block flex={1} center middle p={10}>
        <IconMT
          name={iconName ? iconName : Icons.plus}
          size={24}
          color={iconColor ? iconColor : colors.WHITE}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default memo(FloatCircleBtn, isEqual);
