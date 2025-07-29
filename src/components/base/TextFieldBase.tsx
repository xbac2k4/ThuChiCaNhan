import Block from './Block';
import Spacer from './Spacer';
import { colors, fontSizes } from 'constants/theme';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Assets, Button, Colors, TextField } from 'react-native-ui-lib';
import Text from './Text';

interface TextFieldBaseProps {
  title: string;
  onChangeValue: (value: string) => void;
  secureTextEntry?: boolean;
  icon?: string;
  autoFocus?: boolean;
  onFocus?: () => void;
  textValue: string;
  name: string;
  textPlaceHolder?: string;
  isrequire?: boolean;
}

const TextFieldBase: React.FC<TextFieldBaseProps> = ({
  title,
  onChangeValue,
  secureTextEntry,
  icon,
  autoFocus,
  onFocus,
  textValue,
  textPlaceHolder,
  isrequire,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <Block flex={1} key={title}>
      <Block row style={{ alignItems: 'center' }}>
        {icon ? (
          <Icon
            style={{ fontSize: fontSizes.FONT_16 }}
            name={icon}
            color={colors.GRAY4}
          />
        ) : null}
        <Text style={{ color: colors.GRAY4 }}>
          {` ${title}`}
          {isrequire ? <Text style={{ color: colors.ERROR }}> *</Text> : null}
        </Text>
      </Block>
      <Spacer height={5} />
      <TextField
        autoFocus={autoFocus ?? false}
        onFocus={() => {
          onFocus && onFocus();
        }}
        placeholder={textPlaceHolder}
        placeholderTextColor={colors.BLACK}
        onChangeText={(value: string) => onChangeValue(value)}
        // validate={isrequire}
        validationMessage={['Không được để trống']}
        maxLength={50}
        enableErrors={false}
        containerStyle={{
          width: '100%',
          borderWidth: 1,
          borderColor: colors.GRAY2,
          borderRadius: 30,
          padding: 8,
          backgroundColor: colors.GRAY4,
        }}
        autoCapitalize="none"
        value={textValue}
        style={{
          height: 30,
          color: colors.BLACK,
          paddingLeft: 10,
        }}
        trailingAccessory={
          secureTextEntry ? (
            <Button
              iconSource={showPassword ? Assets.icons.show : Assets.icons.hide}
              iconStyle={{ height: 18, width: 18 }}
              style={{ height: 25, width: 25 }}
              onPress={() => setShowPassword(prev => !prev)}
              link
              linkColor={Colors.$textDefault}
            />
          ) : undefined
        }
        {...{ secureTextEntry: secureTextEntry ? showPassword : false }}
      />
      <Spacer width={0} height={5} />
    </Block>
  );
};

export default TextFieldBase;
