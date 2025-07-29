import { ReactNode, useState } from 'react';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import Block from './Block';
import Section from './Section';
import { colors, fontSizes } from 'constants/theme';
import { TextInput } from 'react-native-gesture-handler';
import IconMT from 'components/icon/IconMT';
import Icons from 'common/icons';
import { KeyboardTypeOptions, TextStyle } from 'react-native';

type SectionInput = {
  value: string;
  title: string;
  require?: boolean;
  onChangeText: (value: string) => void;
  placeholder?: string;
  isNote?: boolean;
  labelColor?: string;
  secureTextEntry?: boolean;
  keyBoadType?: KeyboardTypeOptions;
  error?: ReactNode;
  style?: TextStyle;
  editable?: boolean;
  titleStyle?: TextStyle;
};

const SectionInput = ({
  title,
  require,
  onChangeText,
  value,
  isNote,
  labelColor,
  placeholder,
  secureTextEntry,
  error,
  keyBoadType,
  style,
  editable,
  titleStyle,
}: SectionInput) => {
  const [secure, setSecure] = useState<boolean>(false);

  const isEdit = editable ?? true;

  const colorText = isEdit ? colors?.BLACK : colors?.GRAY2;

  return (
    <Block flex={1} ph={10} minWidth={150}>
      <Section
        componentStyle={{ backgroundColor: 'transparent' }}
        textStyle={{ color: labelColor ? labelColor : colors.COLOR_GRAY, ...titleStyle }}
        title={title}
        require={require ? require : false}
      />

      <Block
        ph={10}
        borderAll
        borderRadius={5}
        row
        center
        middle
        style={{ backgroundColor: colors.WHITE }}>
        <TextInput
          allowFontScaling={false}
          autoCapitalize="none"
          editable={isEdit}
          keyboardType={keyBoadType}
          onChangeText={onChangeText}
          textAlignVertical={isNote ? 'top' : undefined}
          multiline={isNote ? true : undefined}
          numberOfLines={isNote ? 3 : undefined}
          secureTextEntry={secureTextEntry && !secure ? secureTextEntry : false}
          placeholderTextColor={colors.GRAY2}
          placeholder={placeholder ? placeholder : ''}
          value={value}
          style={{
            flex: 1,
            color: colorText,
            fontSize: fontSizes.FONT_16,
            minHeight: isNote ? 80 : 45,
            ...style,
          }}
        />
        {secureTextEntry ? (
          <Block onPress={() => setSecure(!secure)}>
            <IconMT
              name={secure ? Icons.eye : Icons.eye_off}
              size={20}
              color={colors.GRAY2}
            />
          </Block>
        ) : null}
      </Block>
      {error ? error : null}
    </Block>
  );
};

export default memo(SectionInput, isEqual);
