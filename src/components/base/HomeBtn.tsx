import { memo } from 'react';
import Block from './Block';
import IconMT from '../../components/icon/IconMT';
import Text from './Text';
import { Image } from 'react-native-ui-lib';
import { colors, fontSizes } from '../../constants/theme';
import isEqual from 'react-fast-compare';

interface PropsItem {
  onPress: () => void;
  iconName?: string;
  title: string;
  color?: string;
  src?: number;
}

const HomeBtn: React.FC<PropsItem> = memo(
  ({ iconName, color, onPress, title, src }) => {
    return (
      <Block
        style={{ backgroundColor: color, borderRadius: 10 }}
        borderAll
        onPress={onPress}
        mt={10}
        mh={5}>
        <Block row pv={10} ph={20}>
          {iconName ? (
            <Block>
              <IconMT name={iconName} color={'#fff'} size={40} />
            </Block>
          ) : src ? (
            <Block>
              <Image source={src} style={{ width: 40, height: 40 }} />
            </Block>
          ) : null}
          <Block flex={1} />
        </Block>

        <Block flex={1} p={10}>
          <Text
            style={{
              fontSize: fontSizes.FONT_14,
              fontWeight: 'bold',
              color: colors.WHITE,
            }}>
            {title}
          </Text>
        </Block>
      </Block>
    );
  },
  isEqual,
);

export default HomeBtn;
