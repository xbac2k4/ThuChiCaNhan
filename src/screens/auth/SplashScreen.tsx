import { Image } from 'react-native-ui-lib';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { getNecessaryData } from '../../services';
import { colors, dimensions, fontSizes } from '../../constants/theme';
import Block from '../../components/base/Block';
import Text from '../../components/base/Text';
import Spacer from '../../components/base/Spacer';
import { ActivityIndicator } from 'react-native';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    getNecessaryData();
  }, []);
  return (
    <LinearGradient
      colors={['#4c669f', colors.SECONDARY, colors.PRIMARY]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <Block flex={1} center middle>
        <Block p={dimensions.XL}>
          <Block middle style={{ width: '100%', marginBottom: 20 }}>
            <Block middle>
              <Text
                style={{
                  backgroundColor: colors.WHITE,
                  fontWeight: 'bold',
                  fontSize: fontSizes.FONT_24,
                  paddingHorizontal: 5,
                  color: colors.SECONDARY,
                }}>
                TT EBS
              </Text>
              <Spacer height={20} />
              <Text
                style={{
                  color: colors.WHITE,
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                THUẬN THÀNH
              </Text>
              <Spacer height={20} />
              {/* <Text
                style={{
                  color: colors.GRAY4,
                  fontSize: fontSizes.FONT_16,
                }}>
                Ứng dụng dành cho khách hàng
              </Text> */}
            </Block>
          </Block>
        </Block>
        <ActivityIndicator color={colors.WHITE} />
      </Block>
    </LinearGradient>
  );
};

export default SplashScreen;
