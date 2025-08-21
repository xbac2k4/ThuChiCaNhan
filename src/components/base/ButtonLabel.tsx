import { memo, ReactNode } from 'react';
import { TextStyle } from 'react-native';
import Block from './Block';
import { colors } from 'constants/theme';
import Text from './Text';
import isEqual from 'react-fast-compare';
import IconMT from 'components/icon/IconMT';

interface BtnLabelType {
  onPress: () => void;
  title: string;
  icon?: string;
  iconColor?: string;
  bg?: string;
  borderColor?: string
  textStyle?: TextStyle | TextStyle[];
  children?: ReactNode;
}

const ButtonLabel: React.FC<BtnLabelType> = memo(
  ({ onPress, title, icon, textStyle, children, iconColor, bg, borderColor }) => {
    return (
      <Block mv={5}>
        <Block
          row
          borderAll
          borderColor={borderColor || colors.TRANSPARENT}
          center
          borderRadius={15}
          p={10}
          middle
          style={{ backgroundColor: bg || colors.BASE }}
          onPress={onPress}>
          {
            icon && <IconMT name={icon} size={30} color={iconColor || colors.WHITE} />
          }
          <Block pl={icon ? 10 : 0}>
            <Text style={textStyle}>{title}</Text>
          </Block>
        </Block>
        {children && children}
      </Block>
    );
  },
  isEqual,
);

export default ButtonLabel;
