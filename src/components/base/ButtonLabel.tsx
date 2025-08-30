import { memo, ReactNode } from 'react';
import { TextStyle } from 'react-native';
import Block from './Block';
import { colors } from 'constants/theme';
import Text from './Text';
import isEqual from 'react-fast-compare';
import IconMT from 'components/icon/IconMT';
import Icons from 'common/icons';

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

export const ButtonSettingHor: React.FC<BtnLabelType> = memo(
  ({ onPress, title, icon, textStyle, children, iconColor, bg, borderColor }) => {
    return (
      <Block mv={5}>
        <Block
          row
          center
          pv={5}
          middle
          justifyBetween
          borderBottom
          borderBottomWidth={1}
          borderColor={borderColor || colors.TRANSPARENT}
          ph={10}
          style={{ backgroundColor: bg || colors.TRANSPARENT }}
          onPress={onPress}>
          <Block row middle center>
            {
              icon && <IconMT name={icon} size={24} color={iconColor || colors.BLACK1} />
            }
            <Block pl={icon ? 10 : 0}>
              <Text style={textStyle}>{title}</Text>
            </Block>
          </Block>
          <IconMT color={colors.GRAY} name={Icons.chevron_right} size={24} />
        </Block>
      </Block>
    );
  },
  isEqual,
);

export const ButtonSettingVer: React.FC<BtnLabelType> = memo(
  ({ onPress, title, icon, textStyle, children, iconColor, bg, borderColor }) => {
    return (
      <Block mv={5}>
        <Block
          center
          pv={5}
          middle
          justifyBetween
          borderBottom
          borderBottomWidth={1}
          borderColor={borderColor || colors.TRANSPARENT}
          ph={5}
          style={{ backgroundColor: bg || colors.TRANSPARENT }}
          onPress={onPress}>
          {
            icon && <IconMT name={icon} size={24} color={iconColor || colors.BLACK1} />
          }
          <Block pt={icon ? 5 : 0}>
            <Text style={textStyle}>{title}</Text>
          </Block>
          {children && children}
        </Block>
      </Block>
    );
  },
  isEqual,
);