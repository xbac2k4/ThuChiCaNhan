import {Platform} from 'react-native';

const code = 1;

export const VERSION_CODE = Platform.select({
  ios: code,
  android: code,
});

export const VERSION_NAME = Platform.select({
  ios: `0.0.${code}`,
  android: `0.0.${code}`,
});
