import { Image } from 'react-native';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { getNecessaryData } from '../../services';
import { colors, dimensions, fontSizes } from '../../constants/theme';
import Block from '../../components/base/Block';
import Text from '../../components/base/Text';
import { ActivityIndicator } from 'react-native';
import images from 'constants/images';
import IconMT from 'components/icon/IconMT';
import Icons from 'common/icons';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    getNecessaryData();
  }, []);
  return (
    <LinearGradient
      colors={[colors.BG, colors.BG1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <Block flex={1} center middle>
        <Block p={dimensions.XL}>
          <Block middle style={{ width: '100%', marginBottom: 20 }}>
            <Block middle>
              <Image
                source={images.logo}
                width={100}
                height={100}
                resizeMode="cover" />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: fontSizes.FONT_32,
                  padding: 10,
                  color: colors.WHITE,
                  borderRadius: 10
                }}>Money care</Text>
            </Block>
          </Block>
        </Block>
        <ActivityIndicator color={colors.WHITE} />
        <Block row center middle pt={10} bottom={20} style={{ position: 'absolute' }}>
          <IconMT name={Icons.copyright} size={16} color={colors.GRAY2} />
          <Text
            style={{
              fontSize: fontSizes.FONT_16,
              fontWeight: '500',
              color: colors.WHITE,
            }}>
            <Text style={{ color: colors.GRAY2 }}>Copyright</Text>
          </Text>
        </Block>
      </Block>
    </LinearGradient>
  );
};

export default SplashScreen;
