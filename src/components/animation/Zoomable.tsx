import React, { memo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Image } from 'react-native';
import IconMT from 'components/icon/IconMT';
import Icons from 'common/icons';
import { colors } from 'constants/theme';

const AnimatedImage = Animated.createAnimatedComponent(Image);

type ZoomType = {
  source: string;
};

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.max(min, Math.min(value, max));
};

const Zoomable = ({ source }: ZoomType) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [isRotating, setIsRotating] = useState(false);
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const zoomSensitivity = 1.5;
  const dragSpeed = 1;

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const newScale = event.scale * zoomSensitivity;
      scale.value = clamp(newScale, 1, 5);
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(1);
        translationX.value = withTiming(0);
        translationY.value = withTiming(0);
        offsetX.value = 0;
        offsetY.value = 0;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (scale.value > 1) {
        const scaledWidth = (rotation.value % 180 === 0 ? screenWidth : screenHeight) * scale.value;
        const scaledHeight = (rotation.value % 180 === 0 ? screenHeight : screenWidth) * scale.value;

        const maxTranslateX = (scaledWidth - screenWidth) / 2;
        const maxTranslateY = (scaledHeight - screenHeight) / 2;

        const nextX = offsetX.value + event.translationX * dragSpeed;
        const nextY = offsetY.value + event.translationY * dragSpeed;

        translationX.value = clamp(nextX, -maxTranslateX, maxTranslateX);
        translationY.value = clamp(nextY, -maxTranslateY, maxTranslateY);
      }
    })
    .onEnd(() => {
      offsetX.value = translationX.value;
      offsetY.value = translationY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withTiming(1);
        translationX.value = withTiming(0);
        translationY.value = withTiming(0);
        offsetX.value = 0;
        offsetY.value = 0;
      } else {
        scale.value = withTiming(3);
      }
    });
  const composedGesture = Gesture.Simultaneous(doubleTapGesture, panGesture, pinchGesture);

  const handleRotationDone = () => {
    setIsRotating(false);
  };

  const handleRotateClick = () => {
    if (!isRotating) {
      setIsRotating(true);
      rotation.value = withTiming((rotation.value + 90), {}, () => {
        runOnJS(handleRotationDone)();
      });
      translationX.value = withTiming(0);
      translationY.value = withTiming(0);
      offsetX.value = 0;
      offsetY.value = 0;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const isRotated = rotation.value % 180 !== 0;
    const imageWidth = isRotated ? screenHeight : screenWidth;
    const imageHeight = isRotated ? screenWidth : screenHeight;

    const adjustedTranslationX = scale.value === 1 ? 0 : translationX.value;
    const adjustedTranslationY = scale.value === 1 ? 0 : translationY.value;

    return {
      width: imageWidth * scale.value,
      height: imageHeight * scale.value,
      transform: [
        { translateX: adjustedTranslationX },
        { translateY: adjustedTranslationY },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.rotateButton} onPress={handleRotateClick}>
        <IconMT name={Icons.screen_rotation} color={colors.WHITE} size={25} />
      </TouchableOpacity>

      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={styles.imageWrapper}>
            <AnimatedImage
              source={{ uri: source }}
              style={[animatedStyle]}
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default memo(Zoomable, isEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 10,
    zIndex: 10,
  },
});
