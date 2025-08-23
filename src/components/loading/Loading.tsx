import Block from 'components/base/Block';
import Text from 'components/base/Text';
import images from 'constants/images';
import { colors, fontSizes } from 'constants/theme';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const Loading = () => {
  const isLoading = useSelector((state: any) => state.commonReducer.isLoading);
  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Block row center style={styles.content}>
            <LottieView
              source={images.loading}
              autoPlay
              speed={2}
              loop
              style={{ width: 70, height: 70 }}
            />
          </Block>
        </View>
      ) : null}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000004D',
    zIndex: 999,
  },
  content: {
    // backgroundColor: colors.DARK_GRAY,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
