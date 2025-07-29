import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamillies, fontSizes} from './theme';
import {Platform} from 'react-native';

export const stylesCustom = StyleSheet.create({
  textFont: {
    fontFamily: fontFamillies.regular.fontFamily,
  },
  a: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.TRANSPARENT,
  },
  b: {
    color: colors.BLACK,
    fontSize: fontSizes.FONT_14,
    letterSpacing: 1.1,
  },
  require: {
    color: 'red',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.5,
    shadowRadius: Platform.OS == 'android' ? 8 : 4,
    elevation: 5,
  },
  floatButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  listEmpty: {
    color: colors.GRAY,
    fontSize: fontSizes.FONT_20,
    textAlign: 'center',
  },
});