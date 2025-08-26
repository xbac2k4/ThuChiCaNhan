import Block from './Block';
import Spacer from './Spacer';
import { colors, fontSizes } from 'constants/theme';
import { memo, useState } from 'react';
import { TextInput, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import isEqual from 'react-fast-compare';
import Icons from 'common/icons';
import IconMT from 'components/icon/IconMT';
import Text from './Text';

interface TextFieldBaseProps {
  title?: string;
  onChangeValue: (value: string) => void;
  autoFocus?: boolean;
  onFocus?: () => void;
  textValue: string | undefined;
  textPlaceHolder?: string;
  titleStyle?: TextStyle | TextStyle[];
  inputStyle?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  error?: {
    title: string;
    isError: boolean;
  };
  secureText?: boolean;
  mutilLine?: boolean;
}

const InputLabel: React.FC<TextFieldBaseProps> = ({
  title,
  onChangeValue,
  autoFocus,
  onFocus,
  textValue,
  textPlaceHolder,
  containerStyle,
  titleStyle,
  inputStyle,
  error,
  secureText,
  mutilLine,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <Block key={title}>
      {title ? (
        <>
          <Block justifyBetween>
            <Text
              style={{
                color: colors.BLACK,
                fontWeight: 'bold',
                fontSize: fontSizes.FONT_16,
                ...(titleStyle as object),
              }}>
              {` ${title}`}
              {error ? <Text style={{ color: colors.ERROR }}> *</Text> : null}
            </Text>
          </Block>
          <Spacer height={5} />
        </>
      ) : null}

      <Block
        row
        middle
        style={{ ...styles.containerStyle, ...(containerStyle as object) }}>
        <TextInput
          autoFocus={autoFocus ?? false}
          onFocus={onFocus}
          placeholder={textPlaceHolder}
          placeholderTextColor={colors.GRAY}
          onChangeText={val => onChangeValue(val)}
          autoCapitalize="none"
          allowFontScaling={false}
          multiline={mutilLine}
          value={textValue}
          secureTextEntry={secureText ? showPassword : false}
          style={{ ...styles.defaultStyle, ...(inputStyle as object) }}
        />

        {secureText ? (
          <Block p={5} onPress={() => setShowPassword(!showPassword)}>
            <IconMT
              name={showPassword ? Icons.eye_off : Icons.eye}
              size={20}
              color={colors.GRAY}
            />
          </Block>
        ) : null}
      </Block>

      <Block pt={5}>
        {error?.isError ? (
          <Text
            style={{
              fontSize: fontSizes.FONT_12,
              color: colors.ERROR,
              fontWeight: 'bold',
            }}>
            {error?.title}
          </Text>
        ) : null}
      </Block>
      <Spacer width={0} height={5} />
    </Block>
  );
};

export default memo(InputLabel, isEqual);

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.GRAY2,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: colors.GRAY4,
    overflow: 'hidden',
  },
  defaultStyle: {
    flex: 1,
    minHeight: 30,
    color: colors.BLACK,
    paddingLeft: 10,
    textAlign: 'left',
    writingDirection: 'ltr',
  },
});
