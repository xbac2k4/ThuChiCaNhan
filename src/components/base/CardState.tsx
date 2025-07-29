import { memo } from 'react';
import Block from './Block';
import isEqual from 'react-fast-compare';
import Text from './Text';
import { colors } from '../../constants/theme';
import { TextStyle } from 'react-native';

type CardState = {
  state_name: string;
  state_color: string;
  text_color?: string;
  textStyle?: TextStyle;
};

const CardState = ({
  state_color,
  state_name,
  text_color,
  textStyle,
}: CardState) => {
  return (
    <Block
      style={{ backgroundColor: state_color }}
      ph={4}
      mr={5}
      borderRadius={5}
      maxHeight={40}
      center>
      <Text
        style={{
          color: text_color ? text_color : colors.WHITE,
          fontWeight: 'bold',
          textAlign: 'center',
          ...textStyle,
        }}>
        {state_name}
      </Text>
    </Block>
  );
};

export default memo(CardState, isEqual);
