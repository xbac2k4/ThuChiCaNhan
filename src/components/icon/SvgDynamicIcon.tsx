import {memo} from 'react';
import isEqual from 'react-fast-compare';
import {IconMap, IconName} from './SvgIcon';
import {SvgProps} from 'react-native-svg';

type SvgDynamicProps = {
  name: IconName;
  size?: number;
  color?: string;
} & SvgProps;

const SvgDynamicIcon = ({
  name,
  size = 24,
  color = '#000',
  ...rest
}: SvgDynamicProps) => {
  const SvgIcon = IconMap[name];
  return <SvgIcon size={size} color={color} {...rest} />;
};

export default memo(SvgDynamicIcon, isEqual);
