import {FieldInfoType} from '../../common/type';
import Block from '../../components/base/Block';
import Text from '../../components/base/Text';
import CardInfoItem from '../../components/cards/CardInfoItem';
import {colors, fontSizes} from '../../constants/theme';
import {ReactNode, memo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet} from 'react-native';

type InfoComponentType = {
  renderData: FieldInfoType[];
  children: ReactNode;
  title: string;
};

const InfoComponent = ({renderData, children, title}: InfoComponentType) => {
  return (
    <Block pt={10}>
      <Block ph={10} pb={10} row>
        <Text style={{...styles.title}}>{title}</Text>
      </Block>
      <Block
        pv={5}
        style={{backgroundColor: colors.WHITE}}
        borderAll
        borderRadius={5}>
        {renderData?.map((render: any, index: number) => {
          if (render?.isShow) {
            return (
              <Block key={`${render?.content}${index}`}>
                <CardInfoItem title={render?.name} content={render?.content} />
              </Block>
            );
          } else {
            return null;
          }
        })}
        {children}
      </Block>
    </Block>
  );
};

export default memo(InfoComponent, isEqual);

const styles = StyleSheet.create({
  title: {fontSize: fontSizes.FONT_16, fontWeight: '700'},
  featureBtn: {
    flexDirection: 'row',
  },
});
