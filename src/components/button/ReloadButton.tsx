import Block from '../../components/base/Block';
import IconMT from '../../components/icon/IconMT';
import { colors } from '../../constants/theme';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

type ReloadType = {
  onPress: () => void;
};

const ReloadButton = ({ onPress }: ReloadType) => {
  return (
    <Block
      style={{
        position: 'absolute',
        bottom: 20,
        right: 10,
      }}>
      <Block
        onPress={onPress}
        shadow
        borderAll
        style={{ backgroundColor: colors.SECONDARY }}
        borderRadius={30}>
        <Block flex={1} center middle p={10}>
          <IconMT name={'reload'} size={40} color={colors.WHITE} />
        </Block>
      </Block>
    </Block>
  );
};

export default memo(ReloadButton, isEqual);
