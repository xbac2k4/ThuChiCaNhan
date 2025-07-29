import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const {dirs} = RNFetchBlob.fs;

const code = 18;

export const VERSION_CODE = Platform.select({
  ios: code,
  android: code,
});

export const VERSION_NAME = Platform.select({
  ios: `1.1.${code}`,
  android: `1.1.${code}`,
});

export const dirToSave =
  Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
