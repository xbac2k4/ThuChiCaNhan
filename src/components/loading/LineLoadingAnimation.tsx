import React, {memo, useEffect} from 'react';
import isEqual from 'react-fast-compare';
import {View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const LineLoadingAnimation = ({progressValue}: any) => {
  const progress = useSharedValue(progressValue / 100);

  useEffect(() => {
    progress.value = withTiming(progressValue / 100, {
      duration: 500,
      easing: Easing.linear,
    });
  }, [progressValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: progress.value * width - width,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.loadingLineContainer}>
        <Animated.View style={[styles.loadingLine, animatedStyle]}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{flex: 1}}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLineContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#0772c3',
    overflow: 'hidden',
    borderRadius: 2,
  },
  loadingLine: {
    width: '100%',
    height: '100%',
  },
});

export default memo(LineLoadingAnimation, isEqual);
