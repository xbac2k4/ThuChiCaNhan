import { ReactNode, memo, useState } from 'react';
import Block from './Block';
import { colors, fontSizes } from 'constants/theme';
import Icons from 'common/icons';
import Text from './Text';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import IconMT from 'components/icon/IconMT';

type ShowCard = {
  title: string;
  children: ReactNode;
};

const ShowCard = ({ title, children }: ShowCard) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Block
        onPress={() => setShow(!show)}
        pv={5}
        row
        borderColor={colors.PLACEHOLDER}>
        <Block center>
          <IconMT
            name={show ? Icons.chevron_up : Icons.chevron_down}
            color={colors.BUTTON_4}
            size={30}
          />
        </Block>
        <Block center ph={20}>
          <Text style={styles.title}>{title}</Text>
        </Block>
      </Block>

      {show ? children : null}
    </>
  );
};

export default memo(ShowCard, isEqual);

const styles = StyleSheet.create({
  title: {
    color: colors.BUTTON_4,
    fontSize: fontSizes.FONT_16,
    fontWeight: '700',
  },
});
