import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

type SizeType = number;

const scale = (size: SizeType) => size;
const verticalScale = (size: SizeType) => size;
const moderateScale = (size: SizeType, factor = 0.5) => size;

export {scale, verticalScale, moderateScale};
