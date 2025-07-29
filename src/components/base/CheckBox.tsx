import { memo } from 'react';
import Block from './Block';
import isEqual from 'react-fast-compare';
import Text from './Text';
import IconMT from 'components/icon/IconMT';
import Icons from 'common/icons';
import { colors, fontSizes, STATUS_COLOR } from 'constants/theme';

type CheckType = {
  title: string;
  onCheck?: () => void;
  isCheck: boolean;
  checkboxPosition?: 'left' | 'right';
  disable?: boolean;
};

const CheckBox = ({
  title,
  onCheck,
  isCheck,
  checkboxPosition = 'right',
  disable
}: CheckType) => {
  return (
    <Block
      pv={5}
      row
      center
      middle
      justifyBetween
      style={{ opacity: disable ? 0.5 : 1 }}
      onPress={() => !disable && onCheck && onCheck()}>
      {checkboxPosition === 'left' && (
        <Block
          borderAll
          p={2}
          mr={5}
          borderRadius={5}
          style={{ backgroundColor: isCheck ? colors.SECONDARY : colors.WHITE }}>
          <IconMT name={Icons.check} color={colors.WHITE} size={15} />
        </Block>
      )}
      <Block flex={1}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: fontSizes.FONT_16 }}>
          {title}
        </Text>
      </Block>
      {checkboxPosition === 'right' ? (
        <Block
          borderAll
          p={2}
          borderRadius={5}
          style={{ backgroundColor: isCheck ? colors.SECONDARY : colors.WHITE }}>
          <IconMT name={Icons.check} color={colors.WHITE} size={15} />
        </Block>
      ) : null}
    </Block>
  );
};

export default memo(CheckBox, isEqual);

export const CircleCheckBox = ({ title, onCheck, isCheck }: CheckType) => {
  return (
    <Block pv={5} row middle justifyBetween onPress={onCheck}>
      <Block
        borderAll
        p={1}
        borderRadius={11}
        borderColor={isCheck ? STATUS_COLOR.BLUE : colors.GRAY2}>
        <Block
          p={8}
          m={1}
          borderRadius={8}
          style={{
            backgroundColor: isCheck ? STATUS_COLOR.BLUE : colors.WHITE,
          }}
        />
      </Block>
      <Block flex={1} pl={6}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: fontSizes.FONT_16,
            color: isCheck ? colors.BLACK : colors.GRAY,
          }}>
          {title}
        </Text>
      </Block>
    </Block>
  );
};
