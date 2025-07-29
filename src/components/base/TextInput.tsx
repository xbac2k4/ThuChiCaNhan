import { colors } from 'constants/theme';
import { memo } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type TextInputView = TextInputProps & {
  onChangeText: (val: string) => void;
};

const TextInputView = ({ onChangeText, ...props }: TextInputView) => {
  return (
    <TextInput
      allowFontScaling={false}
      onChangeText={onChangeText}
      placeholderTextColor={colors.GRAY}
      style={{
        flex: 1,
        color: colors.BLACK,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.GRAY2,
      }}
      {...props}
    />
  );
};

export default memo(TextInputView);
