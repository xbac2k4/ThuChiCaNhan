import Block from './Block';
import { colors, dimensions, fontSizes } from '../../constants/theme';
import React from 'react';
import { Text } from 'react-native';

interface SectionHeaderProps {
  label?: number;
  height?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, ...props }) => {
  return (
    <Block p={dimensions.LARGE} style={{ backgroundColor: colors.GRAY3 }}>
      <Text
        allowFontScaling={false}
        style={{ fontSize: fontSizes.FONT_20, fontWeight: '700' }}>
        {label}
      </Text>
    </Block>
  );
};

export default SectionHeader;
