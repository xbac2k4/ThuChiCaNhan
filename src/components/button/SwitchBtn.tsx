import Block from '../../components/base/Block';
import Text from '../../components/base/Text';
import { colors, fontSizes } from '../../constants/theme';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';

type SwitchButtonType = {
  data: [string, string];
  isCurrentTab: boolean;
  setCurrentTab: (bool: boolean) => void;
};

export const HeaderSwitchButton = memo(
  ({ data, isCurrentTab, setCurrentTab }: SwitchButtonType) => {
    return (
      <Block pt={10} shadow row style={{ backgroundColor: colors.SECONDARY }}>
        <Block
          flex={1}
          borderBottomWidth={2}
          p={10}
          borderBottom
          onPress={() => setCurrentTab(true)}
          borderColor={isCurrentTab ? colors.WHITE : colors.WHITE_BLUR}>
          <Text
            style={{
              ...styles.headerText,
              color: isCurrentTab ? colors.WHITE : colors.WHITE_BLUR,
            }}>
            {data[0]}
          </Text>
        </Block>
        <Block
          flex={1}
          p={10}
          borderBottom
          onPress={() => setCurrentTab(false)}
          borderColor={!isCurrentTab ? colors.WHITE : colors.WHITE_BLUR}>
          <Text
            style={{
              ...styles.headerText,
              color: !isCurrentTab ? colors.WHITE : colors.WHITE_BLUR,
            }}>
            {data[1]}
          </Text>
        </Block>
      </Block>
    );
  },
  isEqual,
);

const styles = StyleSheet.create({
  headerText: {
    fontSize: fontSizes.FONT_16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
