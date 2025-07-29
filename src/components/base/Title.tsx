import { ReactNode, memo } from 'react';
import Block from './Block';
import Text from './Text';
import isEqual from 'react-fast-compare';
import { colors, fontSizes } from '../../constants/theme';
import { StyleSheet } from 'react-native';

type TitleType = {
  title: string;
  screenTitle?: boolean;
  children?: ReactNode;
};

const Title = ({ title, screenTitle, children }: TitleType) => {
  return screenTitle ? (
    <Block
      style={{ backgroundColor: colors.COLOR_INFO }}
      p={10}
      center
      middle
      justifyBetween
      row>
      <Text
        style={{
          fontSize: fontSizes.FONT_16,
          fontWeight: 'bold',
          color: colors.WHITE,
        }}>
        {title}
      </Text>
      {children ? children : null}
    </Block>
  ) : (
    <Block flex={1} mh={20}>
      <Text style={styles.title}>{title}</Text>
    </Block>
  );
};

export default memo(Title, isEqual);

const styles = StyleSheet.create({
  title: {
    color: colors.PRIMARY,
    fontSize: fontSizes.FONT_18,
    fontWeight: '700',
  },
});
