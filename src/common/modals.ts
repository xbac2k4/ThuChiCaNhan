export type SpaceInStyleType = {
  m?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  mv?: number;
  mh?: number;
  p?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  pv?: number;
  ph?: number;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  circle?: number;
};

export type LayoutInStyleType = {
  flex?: number;
  wrap?: boolean;
  flexGrow?: number;
  row?: boolean;
  column?: boolean;
  direction?: boolean;
  center?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justify?: string;
  middle?: boolean;
  alignItemsStart?: boolean;
  alignItemsEnd?: boolean;
  alignItems?: string;
  alignSelfCenter?: boolean;
  absolute?: boolean;
  relative?: boolean;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  zIndex?: number;
  gap?: number;
};

export type BorderInStyleType = {
  borderRadius?: number;
  borderWidth?: number;
  borderBottomWidth?: number;
  borderTopWidth?: number;
  borderTRRadius?: number;
  borderTLRadius?: number;
  borderBLRadius?: number;
  borderBRRadius?: number;
  borderColor?: string | boolean;
  borderBottom?: boolean;
  borderTop?: boolean;
  borderAll?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderStyle?: 'normal' | 'dashed';
};

export type BackgroudInStyleType = {
  bg?: string | boolean;
  opacity?: number;
  shadow?: boolean;
};
