import Block from './Block';
import Spacer from './Spacer';
import { colors, fontSizes } from 'constants/theme';
import { memo, useState } from 'react';
import { TextField } from 'react-native-ui-lib';
import isEqual from 'react-fast-compare';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
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
                ...titleStyle,
              }}>
              {` ${title}`}{' '}
              {error ? <Text style={{ color: colors.ERROR }}>*</Text> : null}{' '}
            </Text>
          </Block>
          <Spacer height={5} />
        </>
      ) : null}

      <TextField
        autoFocus={autoFocus ?? false}
        onFocus={onFocus}
        useGestureHandlerInput={true}
        placeholder={textPlaceHolder}
        placeholderTextColor={colors.BLACK}
        onChangeText={val => onChangeValue(val)}
        enableErrors={false}
        containerStyle={{ ...styles.containerStyle, ...containerStyle }}
        autoCapitalize="none"
        allowFontScaling={false}
        multiline={mutilLine}
        value={textValue}
        style={{ ...styles.defaultStyle, ...inputStyle }}
        trailingAccessory={
          secureText ? (
            <Block p={5} onPress={() => setShowPassword(!showPassword)}>
              <IconMT
                name={showPassword ? Icons.eye_off : Icons.eye}
                size={20}
                color={colors.GRAY}
              />
            </Block>
          ) : undefined
        }
        {...{ secureTextEntry: secureText ? showPassword : false }}
      />
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
    padding: 8,
    backgroundColor: colors.GRAY4,
    overflow: 'hidden',
  },
  defaultStyle: {
    minHeight: 30,
    color: colors.BLACK,
    paddingLeft: 10,
    textAlign: 'left',
    writingDirection: 'ltr',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
});
