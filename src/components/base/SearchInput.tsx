import { colors, fontSizes } from 'constants/theme';
import Block from './Block';
import Icons from 'common/icons';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import IconMT from 'components/icon/IconMT';
import TextInput from './TextInput';

type SearchInputType = {
  onChange: (value: string) => void;
  value?: string | undefined;
  placeholder?: string;
};

const SearchInput = ({ onChange, value, placeholder }: SearchInputType) => {
  return (
    <Block
      p={5}
      row
      borderRadius={10}
      m={10}
      middle
      shadow
      borderAll
      style={{ backgroundColor: colors.WHITE }}>
      <Block flex={1} row>
        <Block flex={1}>
          <TextInput
            allowFontScaling={false}
            placeholder={placeholder ?? 'Tìm kiếm ...'}
            placeholderTextColor={colors.PLACEHOLDER}
            onChangeText={val => onChange(val)}
            autoCapitalize="none"
            value={value}
            style={{
              flex: 1,
              fontSize: fontSizes.FONT_16,
              minHeight: 20,
              color: colors.BLACK,
              paddingLeft: 5,
              paddingVertical: 5,
            }}
          />
        </Block>

        <Block p={10} center middle>
          <IconMT name={Icons.search} size={20} color={colors.PLACEHOLDER} />
        </Block>
      </Block>
    </Block>
  );
};

export default memo(SearchInput, isEqual);
