import {memo} from 'react';
import isEqual from 'react-fast-compare';
import {TextStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MTIconType = {
  name: string;
  color: string;
  size: number;
  iconStyle?: TextStyle | TextStyle[];
};

const IconMT = ({name, color, size, iconStyle}: MTIconType) => {
  return <Icon style={iconStyle} name={name} color={color} size={size} />;
};

export default memo(IconMT, isEqual);
