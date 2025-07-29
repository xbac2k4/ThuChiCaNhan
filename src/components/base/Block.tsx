import {
  BackgroudInStyleType,
  BorderInStyleType,
  LayoutInStyleType,
  SpaceInStyleType,
} from '../../common/modals';
import {moderateScale, scale, verticalScale} from '../../utils/Responsive';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {colors} from '../../constants/theme';
import { ColorsDefault } from '../../assets/colors';

type BlockType = SpaceInStyleType &
  LayoutInStyleType &
  BorderInStyleType &
  BackgroudInStyleType & {
    shadowColor?: string;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    gradient?: boolean;
    onPress?: () => void;
  };

const Block = ({
  gradient,
  flex,
  m,
  mt,
  mr,
  mb,
  ml,
  mv,
  mh,
  p,
  pt,
  pr,
  pb,
  pl,
  pv,
  ph,
  width,
  height,
  wrap,
  flexGrow,
  row,
  column,
  direction,
  center,
  justifyStart,
  justifyEnd,
  justifyBetween,
  justifyAround,
  justifyEvenly,
  justify,
  middle,
  alignItemsStart,
  alignItemsEnd,
  alignItems,
  alignSelfCenter,
  borderRadius,
  borderWidth,
  borderBottomWidth,
  borderTopWidth,
  borderTRRadius,
  borderTLRadius,
  borderBRRadius,
  borderBLRadius,
  borderColor,
  borderBottom,
  borderTop,
  borderAll,
  borderLeft,
  borderRight,
  borderStyle,
  shadowColor,
  absolute,
  relative,
  top,
  left,
  bottom,
  right,
  zIndex,
  circle,
  bg,
  opacity,
  shadow,
  children,
  style,
  onPress,
  ...rest
}: BlockType) => {
  const styledComponent = [
    flex && {flex},
    width && {width: typeof width === 'number' ? scale(width) : width},
    height && {
      height: typeof height === 'number' ? verticalScale(height) : height,
    },

    m && {margin: moderateScale(m)},
    mt && {marginTop: verticalScale(mt)},
    mr && {marginRight: scale(mr)},
    mb && {marginBottom: verticalScale(mb)},
    ml && {marginLeft: scale(ml)},
    mh && {marginHorizontal: scale(mh)},
    mv && {marginVertical: verticalScale(mv)},
    p && {padding: moderateScale(p)},
    pt && {paddingTop: verticalScale(pt)},
    pr && {paddingRight: scale(pr)},
    pb && {paddingBottom: verticalScale(pb)},
    pl && {paddingLeft: scale(pl)},
    ph && {paddingHorizontal: scale(ph)},
    pv && {paddingVertical: verticalScale(pv)},
    circle && {
      width: circle,
      height: circle,
      borderRadius: circle / 2,
    },
    borderStyle && {borderStyle: borderStyle},
    row && {flexDirection: 'row'},
    column && {flexDirection: 'column'},
    direction && {flexDirection: direction},
    wrap && {flexWrap: 'wrap'},
    flexGrow && {flexGrow},
    center && {justifyContent: 'center'},
    justifyStart && {justifyContent: 'flex-start'},
    justifyEnd && {justifyContent: 'flex-end'},
    justifyAround && {justifyContent: 'space-around'},
    justifyBetween && {justifyContent: 'space-between'},
    justifyEvenly && {justifyContent: 'space-evenly'},
    justify && {justifyContent: justify},
    middle && {alignItems: 'center'},
    alignItemsStart && {alignItems: 'flex-start'},
    alignItemsEnd && {alignItems: 'flex-end'},
    alignItems && {alignItems},
    alignSelfCenter && {alignSelf: 'center'},

    borderTRRadius && {borderTopRightRadius: borderTRRadius},
    borderTLRadius && {borderTopLeftRadius: borderTLRadius},
    borderBRRadius && {borderBottomRightRadius: borderBRRadius},
    borderBLRadius && {borderBottomLeftRadius: borderBLRadius},

    bg ? {backgroundColor: bg} : {backgroundColor: colors.TRANSPARENT},
    borderRadius && {borderRadius},
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    opacity && {opacity},
    borderBottom && {
      borderBottomWidth: borderBottomWidth || 1,
      borderBottomColor: borderColor || ColorsDefault.gray,
    },
    borderAll && {
      borderWidth: borderWidth || 1,
      borderColor: borderColor || ColorsDefault.gray,
    },
    borderTop && {
      borderTopWidth: borderTopWidth || 1,
      borderTopColor: borderColor || ColorsDefault.gray,
    },
    borderLeft && {
      borderLeftWidth: borderWidth || 1,
      borderLeftColor: borderColor || ColorsDefault.gray,
    },
    borderRight && {
      borderRightWidth: borderWidth || 1,
      borderRightColor: borderColor || ColorsDefault.gray,
    },
    absolute && {position: 'absolute'},
    relative && {position: 'relative'},
    (top || top === 0) && {top},
    (left || left === 0) && {left},
    (bottom || bottom === 0) && {bottom},
    (right || right === 0) && {right},
    zIndex && {zIndex},
    shadow && {
      shadowColor: ColorsDefault.black || shadowColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    style && style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        {...rest}
        style={styledComponent as StyleProp<ViewStyle>}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View {...rest} style={styledComponent as StyleProp<ViewStyle>}>
      {children}
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  block: {
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
});
