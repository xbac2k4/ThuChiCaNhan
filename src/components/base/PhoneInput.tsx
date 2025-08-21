import { colors } from 'constants/theme';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';

type ErrorType = {
  title: string;
  isError: boolean;
};

type PhoneInputProps = {
  onChangeValue: (value: string) => void;
  value: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  error?: ErrorType;
};

const PhoneInput = ({
  onChangeValue,
  value,
  placeholder = '000 000 000',
  containerStyle,
  inputStyle,
  error,
}: PhoneInputProps) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [callingCode, setCallingCode] = useState<string>('84');

  return (
    <View style={[containerStyle]}>
      <View style={styles.wrapper}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <View style={styles.divider} />
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeValue}
        />
      </View>
      {error?.isError && (
        <Text style={styles.errorText}>{error.title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#fff',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.GRAY,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: 'red',
  },
});

export default PhoneInput;
