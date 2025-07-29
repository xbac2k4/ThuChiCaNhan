import React, { memo, ReactNode } from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { stylesCustom } from 'constants/styleCustom';
import { dimensions, fontSizes } from 'constants/theme';

interface TextViewProps extends TextProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
}

const TextView: React.FC<TextViewProps> = ({ children, style, ...props }) => {
  return (
    <Text
      allowFontScaling={false}
      style={{
        color: 'black',
        fontSize: fontSizes.FONT_14,
        ...stylesCustom.textFont,
        ...style,
      }}
      {...props}>
      {children}
    </Text>
  );
};

export default memo(TextView);
