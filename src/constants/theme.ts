import {
  Dimensions,
  Platform,
} from 'react-native';
import {moderateScale} from '../utils/Responsive';

const {width, height} = Dimensions.get('window');

const dimensions = {
  TINY: 2,
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 16,
  XL: 24,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};

const fontFamillies = {
  regular: {
    fontFamily: Platform.select({
      android: 'svn_gilroy_medium',
      ios: 'SVN-Gilroy',
    }),
  },
  bold: Platform.select({
    android: {
      fontFamily: 'svn_gilroy_bold',
    },
    ios: {
      fontFamily: 'SVN-Gilroy',
      fontWeight: '600',
    },
  }),
};

export const WEB_COLOR = {
  PRIMARY: '#0747a6',
  SECONDARY: '#2684ff',
  SUCCESS: '#82B366',
  DANGER: '#ff4d4f',
  ERROR: '#ff5500',
  WARNING: '#faad14',
  STATUS_ACTIVE: '#00875a',
  STATUS_EXPIRED: '#cd201f',
  STATUS_HOLD: '#d49f00',
  STATUS_DRAFT: '#8a8a8a',
  TEXT: '#000',
  STATUS_CONFIRM: '#b3cbed',
  REQUEST_DESCRIPTION: '#6b778c',
  REQUEST_PRIORITY_H: '#FF5630',
  REQUEST_PRIORITY_N: '#FFAB00',
  REQUEST_PRIORITY_L: '#0065FF',
  STATUS_NOT_ESTABLISHED: '#a8a9ad',
  BBGN_IT_HAS: '#36b37e',
};

export const STATUS_COLOR = {
  GRAY: '#5f6769',
  GRAY2: '#dedddd',
  REJECT2: '#f9eaea',
  REJECT: '#F13233',
  GREEN: '#024f16',
  GREEN2: '#e4f5e8',
  BLUE: '#007aff',
  BLUE2: '#deeefe',
  ORANGE: '#f6a300',
  ORANGE2: '#f8f2e7',
};

export const JIRA_COLOR = {
  STORY: '#2db47d',
  BUG: '#ff5522',
  TASK: '#1c80ff',
};

const fontSizes = {
  // global sizes
  FONT_10: moderateScale(10),
  FONT_12: moderateScale(12),
  FONT_14: moderateScale(14),
  FONT_16: moderateScale(16),
  FONT_18: moderateScale(18),
  FONT_20: moderateScale(20),
  FONT_22: moderateScale(22),
  FONT_24: moderateScale(24),
  FONT_26: moderateScale(26),
  FONT_28: moderateScale(28),
  FONT_30: moderateScale(30),
  FONT_32: moderateScale(32),
  TITLE: moderateScale(20),
  SUBTITLE: moderateScale(18),
  BASE: moderateScale(16),
  BODY: moderateScale(14),
  CAPTION: moderateScale(12),
  SMALL: moderateScale(10),
  BOLD: Platform.select({
    ios: '600',
    android: 'bold',
  }),
};

const colors = {
  BASE: '#71C4FF',
  BG: '#71C4FF',
  BG1: '#0966A7',
  //Primary color
  WAITING: '#CD9B1D',
  RED2: '#EE0000',
  PRIMARY: '#0f2743',
  PRIMARY_LIGHT: '#8fa1b6',
  PRIMARY_LIGHT2: '#3b4f6a',
  SECONDARY: '#1965b3',
  THIRDCOLOR: '#2c64c6',
  PRIBTNYELLOW: '#ffd140',
  TERTIARY: '#FFE358',
  GREEN_DARK: '#008a25',
  GREEN_LIGHT: '#5cf082',
  GREEN_TYPE: '#d5e8d4',
  DARK_GREEN_TYPE: '#82b366',
  ACCENT: '#F3534A',

  BUTTON_1: '#F3534A',
  BUTTON_2: '#E3E3E3',
  BUTTON_3: '#969696',
  BUTTON_4: '#2699FB',

  REPORT: '#1991D1',
  SCHEDULE: '#8E5E3B',
  INFO: '#EA8219',

  SEMI_LIGHT_GRAY: '#ededed',
  PLACEHOLDER: '#D0D0D0',
  LIGHT_GRAY: '#fafafa',
  GRAY: '#5f6769',
  GRAY2: '#D8D8D8',
  GRAY3: '#F0F0F0',
  GRAY4: '#F7F8FA',
  DARK_GRAY: '#323643',

  COLOR_INFO: '#5bc0de',
  COLOR_SUCCESS: '#5CC5A7',
  COLOR_WARNING: '#f0ad4e',
  COLOR_ERROR: '#d9534f',
  COLOR_GRAY: '#808080',
  BORDER: '#8c8c8c',
  IOS_BTN: '#007aff',

  SUCCESS: 'green',
  WARNING: '#f0ad4e',
  ERROR: '#d9534f',
  WHITE: '#ffffff',

  WHITE_BLUR: '#fff6',
  BLACK: '#000000',
  BLACK1: '#323643',
  TRANSPARENT: 'transparent',

  WORD: '#2699FB',
  BGITEM: '#F7F7FA',
  BGPP: '#2D2944',
  BORDERINPUT: '#BCE0FD',
  BGRINPUT: '#F1F9FF',
  BGRCAMERA: '#8AC8FC',
  BGSUCCESSFUL: '#2A2E43',
  BUTTON_BACK: '#FC5F8A',

  NOTI_UNREAD: '#E7F3FF',

  RANGE_NODE: '#F13233',
  RANGE_MID: '#FEEBEB',

  BG_GREEN: '#b3ffc7',
  BG_DRAFT: '#fcd0a3',
  BG_REJECT: '#fe9d97',

  BG_GREEN1: '#33FF00',
  BG_GREEN2: '#27C200',
  BG_GREEN3: '#269900',
  //
  BORDER_COLOR: '#E1E5E9',
};

const bgColors = {
  BG_WHITE: '#FFFFFF',
  BLUE_BASE: '#42A6ED',
  BG_BLUE: '#71C4FF',
  BG_BLUE1: '#0966A7',
}

export {
  dimensions,
  fontSizes,
  colors,
  fontFamillies,
  bgColors,
};
