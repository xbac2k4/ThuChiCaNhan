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
  icon: string;
  textStyle?: TextStyle | TextStyle[];
  children?: ReactNode;
}

const ButtonLabel: React.FC<BtnLabelType> = memo(
  ({ onPress, title, icon, textStyle, children }) => {
    return (
      <Block m={5}>
        <Block
          row
          p={10}
          middle
          shadow
          style={{ backgroundColor: '#fff' }}
          onPress={onPress}>
          <IconMT name={icon} size={30} color={colors.PRIMARY} />
          <Block pl={40}>
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
