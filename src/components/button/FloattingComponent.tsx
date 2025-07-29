import Block from '../../components/base/Block';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import FloatCircleBtn from './FloatCircleBtn';
import { BtnType } from '../../common/type';

type Props = {
  btn: BtnType[];
};

const FloattingComponent = ({ btn }: Props) => {
  return (
    <Block
      style={{
        position: 'absolute',
        bottom: 20,
        right: 10,
      }}>
      {btn.map((item, index) => {
        return (
          <FloatCircleBtn
            key={index}
            onPress={item.onPress}
            iconName={item.iconName}
            iconColor={item.iconColor}
            bgColor={item.bgColor}
          />
        );
      })}
    </Block>
  );
};

export default memo(FloattingComponent, isEqual);
