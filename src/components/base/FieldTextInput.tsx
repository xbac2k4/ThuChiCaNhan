/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { memo, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';
import Block from './Block';
import React from 'react';
import Text from './Text';
import { colors, fontSizes } from 'constants/theme';
import { TextInput } from 'react-native';
import IconMT from 'components/icon/IconMT';
import Icons from 'common/icons';

type Props = {
  value: string;
  title: string;
  onBlur?: () => void;
  editable?: boolean;
  onChange: (val: string) => void;
  placeholder?: string;
  plusAction?: () => void;
};

const FieldTextInput = ({
  value,
  title,
  editable,
  onBlur,
  onChange,
  placeholder,
  plusAction,
}: Props) => {
  const prevValueRef = useRef<string>('');
  useEffect(() => {
    prevValueRef.current = value;
  }, []);

  const handleBlur = () => {
    if (value != prevValueRef.current) {
      onBlur && onBlur();
      prevValueRef.current = value;
    }
  };
  return (
    <Block flex={1} p={5}>
      <Block flex={1} pb={10} ph={10}>
        <Text style={{ fontSize: fontSizes.FONT_16, fontWeight: 'bold' }}>
          {title}
        </Text>
      </Block>
      <Block
        pv={5}
        bg={colors.WHITE}
        borderRadius={5}
        row
        center
        middle
        borderAll
        minHeight={45}>
        <Block ph={10} flex={1}>
          <TextInput
            editable={editable ?? true}
            allowFontScaling={false}
            onPointerEnter={handleBlur}
            onBlur={handleBlur}
            value={value}
            onChangeText={(val: string) => onChange(val)}
            style={{
              color: editable ?? true ? colors.BLACK : colors.GRAY2,
              flex: 1,
              fontSize: fontSizes.FONT_16,
            }}
            placeholderTextColor={colors.GRAY}
            placeholder={placeholder ? placeholder : ''}
          />
        </Block>
        <Block pv={20} />
        {plusAction && (
          <Block
            borderLeft
            onPress={plusAction}
            center
            middle
            height={40}
            width={50}>
            <IconMT
              name={Icons.chevron_down}
              size={30}
              color={colors.PRIMARY}
            />
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default memo(FieldTextInput, isEqual);
