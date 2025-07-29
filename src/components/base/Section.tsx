import isEqual from 'react-fast-compare';
import { Text, TextStyle, ViewStyle } from 'react-native';

import { stylesCustom } from 'constants/styleCustom';
import { ReactNode, memo } from 'react';
import Block from './Block';

interface SectionProps {
  title: ReactNode;
  require?: boolean;
  textStyle?: TextStyle;
  componentStyle?: ViewStyle;
}
const Section: React.FC<SectionProps> = ({
  title,
  require,
  componentStyle,
  textStyle,
}) => (
  <Block onPress={() => { }} style={{ ...stylesCustom.a, ...componentStyle }}>
    <Text style={{ ...stylesCustom.b, ...textStyle }}>
      {title}
      {require ? <Text style={stylesCustom.require}>*</Text> : ''}
    </Text>
  </Block>
);

export default memo(Section, isEqual);
